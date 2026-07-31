"""Provider-agnostic LLM client for Agastya Studios (Rishi concierge).

This module replaces the previous Emergent-managed integration. It talks
directly to a standard LLM provider (OpenAI or Anthropic) over HTTPS using
httpx, so the backend can run entirely on your own infrastructure with just
MongoDB + an API key of your choice.

Configuration (env vars):
    LLM_PROVIDER        "openai" (default) or "anthropic"
    OPENAI_API_KEY      required when LLM_PROVIDER=openai
    OPENAI_MODEL        default "gpt-4o-mini"
    OPENAI_BASE_URL     default "https://api.openai.com/v1"
    ANTHROPIC_API_KEY   required when LLM_PROVIDER=anthropic
    ANTHROPIC_MODEL     default "claude-3-5-sonnet-latest"
    LLM_MAX_TOKENS      default 400

If no API key is configured, the chatbot degrades gracefully (see server.py)
instead of crashing — so the rest of the site keeps working.
"""

import os
from typing import List, Dict

import httpx


class LLMConfigError(RuntimeError):
    """Raised when no provider/API key is configured."""


class LLMBudgetError(RuntimeError):
    """Raised when the provider rejects the call for billing/quota reasons."""


class LLMProviderError(RuntimeError):
    """Raised for any other provider-side failure."""


def _provider() -> str:
    return os.environ.get("LLM_PROVIDER", "openai").strip().lower()


def is_configured() -> bool:
    """True when an API key exists for the selected provider."""
    provider = _provider()
    if provider == "anthropic":
        return bool(os.environ.get("ANTHROPIC_API_KEY"))
    return bool(os.environ.get("OPENAI_API_KEY"))


def _max_tokens() -> int:
    try:
        return int(os.environ.get("LLM_MAX_TOKENS", "400"))
    except ValueError:
        return 400


async def generate_reply(system_prompt: str, history: List[Dict], user_message: str) -> str:
    """Generate an assistant reply.

    Args:
        system_prompt: The persona / guardrails for Rishi.
        history: Prior turns as [{"role": "user"|"assistant", "content": str}, ...].
        user_message: The newest user message.

    Returns:
        The assistant's reply text.

    Raises:
        LLMConfigError, LLMBudgetError, LLMProviderError
    """
    if not is_configured():
        raise LLMConfigError("No LLM API key configured")

    provider = _provider()
    if provider == "anthropic":
        return await _anthropic(system_prompt, history, user_message)
    return await _openai(system_prompt, history, user_message)


def _trimmed_history(history: List[Dict], limit: int = 10) -> List[Dict]:
    msgs = []
    for m in history[-limit:]:
        role = m.get("role")
        content = m.get("content")
        if role in ("user", "assistant") and content:
            msgs.append({"role": role, "content": content})
    return msgs


async def _openai(system_prompt: str, history: List[Dict], user_message: str) -> str:
    api_key = os.environ["OPENAI_API_KEY"]
    base_url = os.environ.get("OPENAI_BASE_URL", "https://api.openai.com/v1").rstrip("/")
    model = os.environ.get("OPENAI_MODEL", "gpt-4o-mini")

    messages = [{"role": "system", "content": system_prompt}]
    messages.extend(_trimmed_history(history))
    messages.append({"role": "user", "content": user_message})

    payload = {"model": model, "messages": messages, "max_tokens": _max_tokens()}
    headers = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}

    async with httpx.AsyncClient(timeout=30.0) as client:
        resp = await client.post(f"{base_url}/chat/completions", json=payload, headers=headers)

    _raise_for_billing(resp)
    if resp.status_code >= 400:
        raise LLMProviderError(f"OpenAI error {resp.status_code}: {resp.text[:300]}")

    data = resp.json()
    return data["choices"][0]["message"]["content"].strip()


async def _anthropic(system_prompt: str, history: List[Dict], user_message: str) -> str:
    api_key = os.environ["ANTHROPIC_API_KEY"]
    model = os.environ.get("ANTHROPIC_MODEL", "claude-3-5-sonnet-latest")

    messages = _trimmed_history(history)
    messages.append({"role": "user", "content": user_message})

    payload = {
        "model": model,
        "system": system_prompt,
        "messages": messages,
        "max_tokens": _max_tokens(),
    }
    headers = {
        "x-api-key": api_key,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json",
    }

    async with httpx.AsyncClient(timeout=30.0) as client:
        resp = await client.post("https://api.anthropic.com/v1/messages", json=payload, headers=headers)

    _raise_for_billing(resp)
    if resp.status_code >= 400:
        raise LLMProviderError(f"Anthropic error {resp.status_code}: {resp.text[:300]}")

    data = resp.json()
    parts = data.get("content", [])
    text = "".join(p.get("text", "") for p in parts if p.get("type") == "text")
    return text.strip()


def _raise_for_billing(resp: httpx.Response) -> None:
    """Map billing / quota style failures to LLMBudgetError."""
    if resp.status_code in (402, 429):
        raise LLMBudgetError(f"Provider billing/quota issue ({resp.status_code})")
    if resp.status_code >= 400:
        body = resp.text.lower()
        if any(w in body for w in ("insufficient_quota", "billing", "credit", "budget", "quota")):
            raise LLMBudgetError("Provider billing/quota issue")

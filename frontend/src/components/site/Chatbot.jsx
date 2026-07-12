import React, { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Loader2, Leaf } from "lucide-react";
import { api } from "@/lib/api";
import { SITE } from "@/constants/testIds/site";

function genSession() {
  const key = "agastya_chat_session";
  let s = localStorage.getItem(key);
  if (!s) {
    s = `sess_${Math.random().toString(36).slice(2)}_${Date.now()}`;
    localStorage.setItem(key, s);
  }
  return s;
}

const INITIAL = [
  {
    role: "assistant",
    content:
      "Namaste. I'm Rishi, Agastya's chat concierge. Ask me about our AI agents, web work, pricing — or say hi. 🌲",
  },
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef(null);
  const sessionRef = useRef(genSession());

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, open, busy]);

  const send = async () => {
    const text = input.trim();
    if (!text || busy) return;
    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
    setBusy(true);
    try {
      const { data } = await api.post("/chat", {
        session_id: sessionRef.current,
        message: text,
      });
      const reply = data?.reply || "Hmm, the forest went quiet. Try again in a moment.";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch (err) {
      const detail = err?.response?.data?.detail;
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            typeof detail === "string"
              ? detail
              : "The chat is resting. Please try again in a moment, or email devexpertaug@gmail.com.",
        },
      ]);
    } finally {
      setBusy(false);
    }
  };

  const onKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* Toggle */}
      <button
        data-testid={SITE.chatToggle}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        className={`fixed z-[120] bottom-5 right-5 md:bottom-8 md:right-8 flex items-center justify-center w-14 h-14 rounded-full shadow-[0_10px_40px_-10px_rgba(212,165,116,0.5)] transition-all duration-500 ${
          open
            ? "bg-[#0a1810] border border-[rgba(212,165,116,0.4)] text-[var(--dawn-500)] rotate-90"
            : "bg-[var(--dawn-500)] text-[var(--forest-950)] hover:scale-110"
        }`}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* Panel */}
      <div
        data-testid={SITE.chatPanel}
        className={`fixed z-[119] bottom-24 right-4 md:right-8 w-[calc(100%-2rem)] sm:w-[380px] max-h-[70vh] h-[560px] rounded-2xl bg-[#0a1810] border border-[rgba(168,192,144,0.2)] shadow-[0_30px_100px_-30px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden transition-all duration-400 origin-bottom-right ${
          open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <header className="flex items-center gap-3 p-4 border-b border-[rgba(168,192,144,0.12)] bg-gradient-to-r from-[var(--forest-700)]/40 to-transparent">
          <div className="w-10 h-10 rounded-full bg-[var(--dawn-500)]/20 border border-[var(--dawn-500)]/40 flex items-center justify-center text-[var(--dawn-500)]">
            <Leaf size={18} />
          </div>
          <div className="flex-1">
            <div className="text-[var(--bone-100)] text-sm font-serif-italic text-lg leading-tight">
              Rishi
            </div>
            <div className="text-[10px] uppercase tracking-[0.24em] text-[var(--mist)]">
              Agastya concierge · online
            </div>
          </div>
          <button
            data-testid={SITE.chatClose}
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            className="text-[var(--bone-100)]/60 hover:text-[var(--dawn-500)] transition-colors"
          >
            <X size={18} />
          </button>
        </header>

        <div
          ref={listRef}
          data-testid={SITE.chatMessages}
          className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 no-scrollbar"
        >
          {messages.map((m, i) => (
            <div
              key={i}
              className={`bubble-in max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                m.role === "user"
                  ? "self-end bg-[var(--dawn-500)] text-[var(--forest-950)] rounded-br-md"
                  : "self-start bg-[rgba(255,255,255,0.04)] text-[var(--bone-100)] border border-[rgba(168,192,144,0.12)] rounded-bl-md"
              }`}
            >
              {m.content}
            </div>
          ))}
          {busy && (
            <div className="self-start bg-[rgba(255,255,255,0.04)] text-[var(--bone-100)] border border-[rgba(168,192,144,0.12)] rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
              <span className="typing-dot w-1.5 h-1.5 rounded-full bg-[var(--dawn-500)]" />
              <span className="typing-dot w-1.5 h-1.5 rounded-full bg-[var(--dawn-500)]" />
              <span className="typing-dot w-1.5 h-1.5 rounded-full bg-[var(--dawn-500)]" />
            </div>
          )}
        </div>

        <div className="border-t border-[rgba(168,192,144,0.12)] p-3 flex items-end gap-2 bg-[rgba(255,255,255,0.02)]">
          <textarea
            data-testid={SITE.chatInput}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            placeholder="Ask about agents, pricing, our work…"
            rows={1}
            className="field-input resize-none max-h-32 !py-2.5 text-sm"
            disabled={busy}
          />
          <button
            data-testid={SITE.chatSend}
            onClick={send}
            disabled={busy || !input.trim()}
            className="w-10 h-10 flex-shrink-0 rounded-full bg-[var(--moss-400)] text-[var(--forest-950)] flex items-center justify-center hover:bg-[var(--dawn-500)] disabled:opacity-50 disabled:hover:bg-[var(--moss-400)] transition-all hover:scale-105"
            aria-label="Send"
          >
            {busy ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          </button>
        </div>
      </div>
    </>
  );
}

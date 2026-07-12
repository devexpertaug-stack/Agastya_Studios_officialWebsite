import axios from "axios";

// When REACT_APP_BACKEND_URL is unset (e.g. a frontend-only Netlify deploy),
// fall back to a relative "/api" base. Dynamic calls (admin, chat, contact,
// settings) then simply no-op/catch instead of hitting "undefined/api".
const BACKEND = process.env.REACT_APP_BACKEND_URL || "";
export const API_BASE = `${BACKEND}/api`;

export const api = axios.create({ baseURL: API_BASE });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("agastya_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export function formatApiErrorDetail(detail) {
  if (detail == null) return "Something went wrong. Please try again.";
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail))
    return detail
      .map((e) => (e && typeof e.msg === "string" ? e.msg : JSON.stringify(e)))
      .filter(Boolean)
      .join(" ");
  if (detail && typeof detail.msg === "string") return detail.msg;
  return String(detail);
}

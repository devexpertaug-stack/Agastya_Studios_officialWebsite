import React, { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";

import { AuthProvider } from "@/context/AuthContext";
import HomePage from "@/pages/HomePage";
import ServiceDetail from "@/pages/ServiceDetail";
import ProjectDetail from "@/pages/ProjectDetail";
import LoginPage from "@/pages/LoginPage";
import AdminPage from "@/pages/AdminPage";
import Chatbot from "@/components/site/Chatbot";
import Cursor from "@/components/site/Cursor";

// Scroll to hash after route change
function HashScroll() {
  const { hash, pathname } = useLocation();
  useEffect(() => {
    if (hash) {
      // Wait a tick for DOM
      const id = hash.replace("#", "");
      const t = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
      return () => clearTimeout(t);
    } else {
      window.scrollTo({ top: 0, left: 0 });
    }
  }, [hash, pathname]);
  return null;
}

export default function App() {
  return (
    <div className="App">
      <Toaster
        position="bottom-left"
        theme="dark"
        toastOptions={{
          style: {
            background: "#0a1810",
            border: "1px solid rgba(168,192,144,0.2)",
            color: "#f0ead6",
          },
        }}
      />
      <BrowserRouter>
        <AuthProvider>
          <HashScroll />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/work/:id" element={<ProjectDetail />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
          <Chatbot />
          <Cursor />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

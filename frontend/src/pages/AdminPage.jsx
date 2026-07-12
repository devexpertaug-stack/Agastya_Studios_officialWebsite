import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, LogOut, Image as ImageIcon, Save, Edit2, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { api, formatApiErrorDetail } from "@/lib/api";
import { SITE } from "@/constants/testIds/site";
import { AgastyaLogo } from "@/components/site/Nav";

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

const SECTORS = [
  "E-commerce & D2C",
  "Voice AI",
  "Conversational & Support",
  "Sales & Lead Gen",
  "Marketing & Content",
  "Visual & Multimodal AI",
  "Operations & Back Office",
  "HR & Recruiting",
  "Web Development",
  "Graphic Design",
];

export default function AdminPage() {
  const { user, initialised, logout } = useAuth();
  const nav = useNavigate();
  const [tab, setTab] = useState("projects");

  useEffect(() => {
    if (initialised && !user) nav("/login");
  }, [initialised, user, nav]);

  if (!initialised) {
    return (
      <div className="min-h-screen bg-[#06110b] flex items-center justify-center text-[var(--bone-100)]/60">
        <Loader2 size={20} className="animate-spin" />
      </div>
    );
  }
  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#06110b] text-[var(--bone-100)]">
      <nav
        data-testid={SITE.adminNav}
        className="border-b border-[rgba(168,192,144,0.12)] bg-[#0a1810]/60 backdrop-blur-md sticky top-0 z-10"
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <AgastyaLogo />
            <span className="text-xl font-serif-italic">Agastya</span>
            <span className="text-[10px] uppercase tracking-[0.32em] text-[var(--mist)] mt-1">Admin</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-xs uppercase tracking-[0.22em] text-[var(--mist)]">
              {user.email}
            </span>
            <button
              data-testid={SITE.adminLogout}
              onClick={() => {
                logout();
                nav("/login");
              }}
              className="btn-ghost text-sm inline-flex items-center gap-2"
            >
              <LogOut size={14} /> Sign out
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center gap-3 border-b border-[rgba(168,192,144,0.12)] mb-10">
          <TabBtn
            testId={SITE.adminProjectsTab}
            active={tab === "projects"}
            onClick={() => setTab("projects")}
          >
            Projects
          </TabBtn>
          <TabBtn
            testId={SITE.adminSettingsTab}
            active={tab === "settings"}
            onClick={() => setTab("settings")}
          >
            About &amp; Contact
          </TabBtn>
        </div>

        {tab === "projects" ? <ProjectsTab /> : <SettingsTab />}
      </div>
    </div>
  );
}

function TabBtn({ children, active, onClick, testId }) {
  return (
    <button
      data-testid={testId}
      onClick={onClick}
      className={`px-5 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
        active
          ? "border-[var(--dawn-500)] text-[var(--dawn-500)]"
          : "border-transparent text-[var(--bone-100)]/60 hover:text-[var(--bone-100)]"
      }`}
    >
      {children}
    </button>
  );
}

function ProjectsTab() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // full project OR blank template

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/projects");
      setProjects(data || []);
    } catch (e) {
      toast.error("Could not load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const blank = () =>
    setEditing({
      title: "",
      sector: SECTORS[0],
      summary: "",
      outcome: "",
      client_name: "",
      image_data_url: "",
      _isNew: true,
    });

  const remove = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      await api.delete(`/projects/${id}`);
      toast.success("Project removed");
      load();
    } catch (e) {
      toast.error(formatApiErrorDetail(e?.response?.data?.detail));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif-italic tracking-[-0.02em]">
            Recent work
          </h1>
          <p className="text-sm text-[var(--bone-100)]/60 mt-2">
            Add, edit and remove projects that appear on the homepage.
          </p>
        </div>
        <button
          data-testid={SITE.adminAddProject}
          onClick={blank}
          className="btn-forest inline-flex items-center gap-2"
        >
          <Plus size={16} /> Add project
        </button>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-[var(--bone-100)]/60">
          <Loader2 size={16} className="animate-spin" /> Loading…
        </div>
      ) : projects.length === 0 && !editing ? (
        <div className="rounded-2xl border border-dashed border-[rgba(168,192,144,0.2)] p-16 text-center text-[var(--bone-100)]/60">
          No projects yet. Click <strong>Add project</strong> above to plant the first one.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <ProjectRow key={p.id} p={p} onEdit={() => setEditing(p)} onDelete={() => remove(p.id)} />
          ))}
        </div>
      )}

      {editing && (
        <ProjectEditor
          initial={editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            load();
          }}
        />
      )}
    </div>
  );
}

function ProjectRow({ p, onEdit, onDelete }) {
  return (
    <div className="card-forest rounded-2xl overflow-hidden flex flex-col">
      <div className="aspect-[16/10] bg-[#0a1810] flex items-center justify-center">
        {p.image_data_url ? (
          <img src={p.image_data_url} alt={p.title} className="w-full h-full object-cover" />
        ) : (
          <ImageIcon size={24} className="text-[var(--mist)]" />
        )}
      </div>
      <div className="p-6 flex-1 flex flex-col gap-2">
        <div className="text-xs uppercase tracking-[0.22em] text-[var(--dawn-500)]">
          {p.sector}
        </div>
        <h3 className="text-xl font-serif-italic">{p.title}</h3>
        {p.client_name && (
          <div className="text-xs text-[var(--mist)]">{p.client_name}</div>
        )}
        <p className="text-sm text-[var(--bone-100)]/70 leading-relaxed">
          {p.summary}
        </p>
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={onEdit}
            className="text-xs inline-flex items-center gap-1.5 text-[var(--bone-100)]/80 hover:text-[var(--dawn-500)] transition-colors"
          >
            <Edit2 size={13} /> Edit
          </button>
          <button
            onClick={onDelete}
            className="text-xs inline-flex items-center gap-1.5 text-[var(--bone-100)]/60 hover:text-red-400 transition-colors"
          >
            <Trash2 size={13} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function ProjectEditor({ initial, onClose, onSaved }) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);

  const change = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 1_500_000) {
      toast.error("Image too big. Please upload under 1.5MB (or resize).");
      return;
    }
    const dataUrl = await fileToDataUrl(file);
    change("image_data_url", dataUrl);
  };

  const save = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.summary.trim()) {
      toast.error("Title and summary are required.");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        title: form.title,
        sector: form.sector,
        summary: form.summary,
        outcome: form.outcome || null,
        client_name: form.client_name || null,
        image_data_url: form.image_data_url || null,
      };
      if (form._isNew) {
        await api.post("/projects", payload);
      } else {
        await api.put(`/projects/${form.id}`, payload);
      }
      toast.success("Saved");
      onSaved();
    } catch (err) {
      toast.error(formatApiErrorDetail(err?.response?.data?.detail));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-[#06110b]/85 backdrop-blur-md flex items-start sm:items-center justify-center overflow-y-auto p-4">
      <form
        onSubmit={save}
        className="relative w-full max-w-2xl bg-[#0a1810] border border-[rgba(168,192,144,0.2)] rounded-2xl p-6 md:p-8 flex flex-col gap-5"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--bone-100)]/60 hover:text-[var(--dawn-500)]"
        >
          <X size={20} />
        </button>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--mist)] mb-2">
            {form._isNew ? "New project" : "Edit project"}
          </p>
          <h2 className="text-3xl font-serif-italic">Tell the story.</h2>
        </div>

        <label className="flex flex-col gap-2">
          <span className="text-[11px] uppercase tracking-[0.24em] text-[var(--mist)]">Title</span>
          <input value={form.title} onChange={(e) => change("title", e.target.value)} className="field-input" required />
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <label className="flex flex-col gap-2">
            <span className="text-[11px] uppercase tracking-[0.24em] text-[var(--mist)]">Sector</span>
            <select value={form.sector} onChange={(e) => change("sector", e.target.value)} className="field-input">
              {SECTORS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-[11px] uppercase tracking-[0.24em] text-[var(--mist)]">Client</span>
            <input value={form.client_name || ""} onChange={(e) => change("client_name", e.target.value)} className="field-input" />
          </label>
        </div>

        <label className="flex flex-col gap-2">
          <span className="text-[11px] uppercase tracking-[0.24em] text-[var(--mist)]">Outcome (one line)</span>
          <input value={form.outcome || ""} onChange={(e) => change("outcome", e.target.value)} className="field-input" placeholder="e.g. +38% recovered revenue" />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[11px] uppercase tracking-[0.24em] text-[var(--mist)]">Summary</span>
          <textarea
            value={form.summary}
            onChange={(e) => change("summary", e.target.value)}
            rows={4}
            className="field-input resize-none"
            required
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[11px] uppercase tracking-[0.24em] text-[var(--mist)]">Cover image (≤1.5MB)</span>
          <input type="file" accept="image/*" onChange={onFile} className="text-sm text-[var(--bone-100)]/70 file:mr-3 file:btn-ghost file:text-xs file:cursor-pointer" />
        </label>

        {form.image_data_url && (
          <div className="rounded-xl overflow-hidden border border-[rgba(168,192,144,0.15)]">
            <img src={form.image_data_url} alt="Preview" className="w-full h-48 object-cover" />
          </div>
        )}

        <div className="flex items-center gap-3 mt-2">
          <button type="submit" disabled={saving} className="btn-forest inline-flex items-center gap-2 disabled:opacity-70">
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            Save
          </button>
          <button type="button" onClick={onClose} className="btn-ghost text-sm">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function SettingsTab() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api
      .get("/settings")
      .then((r) => setSettings(r.data))
      .catch(() => toast.error("Could not load settings"))
      .finally(() => setLoading(false));
  }, []);

  const change = (k, v) => setSettings((s) => ({ ...s, [k]: v }));

  const onPhoto = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 1_500_000) {
      toast.error("Photo too big. Please upload under 1.5MB.");
      return;
    }
    const dataUrl = await fileToDataUrl(file);
    change("founder_photo_url", dataUrl);
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data } = await api.put("/settings", {
        founder_name: settings.founder_name,
        founder_role: settings.founder_role,
        founder_bio: settings.founder_bio,
        founder_photo_url: settings.founder_photo_url || "",
        contact_email: settings.contact_email,
        contact_whatsapp: settings.contact_whatsapp,
      });
      setSettings(data);
      toast.success("Saved. Refresh the homepage to see it.");
    } catch (err) {
      toast.error(formatApiErrorDetail(err?.response?.data?.detail));
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) {
    return (
      <div className="flex items-center gap-2 text-[var(--bone-100)]/60">
        <Loader2 size={16} className="animate-spin" /> Loading…
      </div>
    );
  }

  return (
    <form onSubmit={save} className="max-w-3xl flex flex-col gap-6">
      <div>
        <h1 className="text-4xl md:text-5xl font-serif-italic tracking-[-0.02em]">
          About &amp; Contact
        </h1>
        <p className="text-sm text-[var(--bone-100)]/60 mt-2">
          What visitors see on the homepage &amp; footer.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
        <div className="md:col-span-1">
          <label className="flex flex-col gap-2">
            <span className="text-[11px] uppercase tracking-[0.24em] text-[var(--mist)]">Photo</span>
            <input type="file" accept="image/*" onChange={onPhoto} className="text-xs text-[var(--bone-100)]/70" />
          </label>
          {settings.founder_photo_url && (
            <div className="mt-4 rounded-xl overflow-hidden border border-[rgba(168,192,144,0.15)] aspect-[4/5]">
              <img src={settings.founder_photo_url} alt="Founder" className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        <div className="md:col-span-2 flex flex-col gap-5">
          <label className="flex flex-col gap-2">
            <span className="text-[11px] uppercase tracking-[0.24em] text-[var(--mist)]">Full name</span>
            <input value={settings.founder_name || ""} onChange={(e) => change("founder_name", e.target.value)} className="field-input" />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-[11px] uppercase tracking-[0.24em] text-[var(--mist)]">Role / tagline</span>
            <input value={settings.founder_role || ""} onChange={(e) => change("founder_role", e.target.value)} className="field-input" />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-[11px] uppercase tracking-[0.24em] text-[var(--mist)]">Bio</span>
            <textarea value={settings.founder_bio || ""} onChange={(e) => change("founder_bio", e.target.value)} rows={5} className="field-input resize-none" />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <label className="flex flex-col gap-2">
          <span className="text-[11px] uppercase tracking-[0.24em] text-[var(--mist)]">Contact email</span>
          <input type="email" value={settings.contact_email || ""} onChange={(e) => change("contact_email", e.target.value)} className="field-input" />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-[11px] uppercase tracking-[0.24em] text-[var(--mist)]">WhatsApp</span>
          <input value={settings.contact_whatsapp || ""} onChange={(e) => change("contact_whatsapp", e.target.value)} className="field-input" placeholder="+91…" />
        </label>
      </div>

      <div>
        <button
          data-testid={SITE.adminSaveSettings}
          type="submit"
          disabled={saving}
          className="btn-forest inline-flex items-center gap-2 disabled:opacity-70"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Save changes
        </button>
      </div>
    </form>
  );
}

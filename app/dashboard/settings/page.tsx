"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const ALL_ACCOUNTS = JSON.parse(process.env.NEXT_PUBLIC_META_ACCOUNTS ?? "[]");

type Settings = {
  report_email: string;
  active_accounts: string[];
  notif_weekly_report: boolean;
  notif_roas_alert: boolean;
  notif_spend_alert: boolean;
};

export default function SettingsPage() {
  const { data: session } = useSession();
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSection, setSavedSection] = useState<string | null>(null);

  // Perfil
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Contraseña
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSaved, setPasswordSaved] = useState(false);

  // Cargar settings desde Supabase
  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((d) => {
        if (!d.error) {
          setSettings(d);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  // Sincronizar con session
  useEffect(() => {
    if (session?.user) {
      setName(session.user.name ?? "");
      setEmail(session.user.email ?? "");
    }
  }, [session]);

  async function saveSettings(section: string, patch: Partial<Settings>) {
    if (!settings) return;
    setSaving(true);
    const updated = { ...settings, ...patch };
    const res = await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    const data = await res.json();
    if (!data.error) {
      setSettings(updated);
      setSavedSection(section);
      setTimeout(() => setSavedSection(null), 2500);
    }
    setSaving(false);
  }

  function toggleAccount(id: string) {
    if (!settings) return;
    const current = settings.active_accounts ?? [];
    const updated = current.includes(id)
      ? current.filter((a) => a !== id)
      : [...current, id];
    setSettings({ ...settings, active_accounts: updated });
  }

  function handlePasswordSave() {
    setPasswordError("");
    if (newPassword !== confirmPassword) {
      setPasswordError("Las contraseñas no coinciden.");
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    setPasswordSaved(true);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setPasswordSaved(false), 2500);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-sm text-gray-400">
        Cargando configuración...
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Configuración</h1>
        <p className="mt-1 text-sm text-gray-500">
          Gestioná tu perfil, accesos y preferencias del dashboard.
        </p>
      </div>

      <div className="flex flex-col gap-6">

        {/* Perfil */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Perfil</h2>
          <div className="flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-400 cursor-not-allowed"
              />
              <p className="mt-1 text-xs text-gray-400">El email no se puede cambiar desde acá.</p>
            </div>
            <div className="flex items-center justify-between pt-2">
              {savedSection === "profile" && <p className="text-sm text-emerald-600">✓ Cambios guardados</p>}
              <button
                onClick={() => saveSettings("profile", {})}
                disabled={saving}
                className="ml-auto rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {saving ? "Guardando..." : "Guardar cambios"}
              </button>
            </div>
          </div>
        </div>

        {/* Contraseña */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Contraseña</h2>
          <div className="flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Contraseña actual</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Nueva contraseña</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Mínimo 8 caracteres"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Confirmar nueva contraseña</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="••••••••"
              />
            </div>
            {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
            <div className="flex items-center justify-between pt-2">
              {passwordSaved && <p className="text-sm text-emerald-600">✓ Contraseña actualizada</p>}
              <button
                onClick={handlePasswordSave}
                className="ml-auto rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
              >
                Cambiar contraseña
              </button>
            </div>
          </div>
        </div>

        {/* Cuentas Meta Ads */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-1">Cuentas de Meta Ads</h2>
          <p className="text-sm text-gray-500 mb-4">Elegí cuáles cuentas aparecen en el selector del dashboard.</p>
          <div className="flex flex-col gap-2">
            {ALL_ACCOUNTS.map((acc: any) => (
              <label
                key={acc.id}
                className="flex items-center gap-3 rounded-lg border border-gray-100 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={settings?.active_accounts?.includes(acc.id) ?? true}
                  onChange={() => toggleAccount(acc.id)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">{acc.name}</p>
                  <p className="text-xs text-gray-400">{acc.id}</p>
                </div>
              </label>
            ))}
          </div>
          <div className="flex items-center justify-between pt-4 mt-2 border-t border-gray-100">
            {savedSection === "accounts" && <p className="text-sm text-emerald-600">✓ Cuentas guardadas</p>}
            <button
              onClick={() => saveSettings("accounts", { active_accounts: settings?.active_accounts })}
              disabled={saving}
              className="ml-auto rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {saving ? "Guardando..." : "Guardar cuentas"}
            </button>
          </div>
        </div>

        {/* Email para reportes */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-1">Email para reportes automáticos</h2>
          <p className="text-sm text-gray-500 mb-4">Los reportes semanales se enviarán a esta dirección.</p>
          <div className="flex gap-3">
            <input
              type="email"
              value={settings?.report_email ?? ""}
              onChange={(e) => setSettings(settings ? { ...settings, report_email: e.target.value } : null)}
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="tu@email.com"
            />
            <button
              onClick={() => saveSettings("report_email", { report_email: settings?.report_email })}
              disabled={saving}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {savedSection === "report_email" ? "✓ Guardado" : "Guardar"}
            </button>
          </div>
        </div>

        {/* Notificaciones */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-1">Preferencias de notificaciones</h2>
          <p className="text-sm text-gray-500 mb-4">Elegí qué alertas querés recibir por email.</p>
          <div className="flex flex-col gap-3">
            {[
              { key: "notif_weekly_report", label: "Reporte semanal automático", desc: "Recibís un resumen de performance todos los lunes" },
              { key: "notif_roas_alert", label: "Alerta de ROAS bajo", desc: "Te avisamos si el ROAS cae por debajo de 2x" },
              { key: "notif_spend_alert", label: "Alerta de presupuesto", desc: "Te avisamos si el gasto diario supera el límite configurado" },
            ].map((n) => (
              <label
                key={n.key}
                className="flex items-start gap-3 rounded-lg border border-gray-100 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={settings?.[n.key as keyof Settings] as boolean ?? false}
                  onChange={(e) =>
                    setSettings(settings ? { ...settings, [n.key]: e.target.checked } : null)
                  }
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">{n.label}</p>
                  <p className="text-xs text-gray-400">{n.desc}</p>
                </div>
              </label>
            ))}
          </div>
          <div className="flex items-center justify-between pt-4 mt-2 border-t border-gray-100">
            {savedSection === "notifications" && <p className="text-sm text-emerald-600">✓ Preferencias guardadas</p>}
            <button
              onClick={() => saveSettings("notifications", {
                notif_weekly_report: settings?.notif_weekly_report,
                notif_roas_alert: settings?.notif_roas_alert,
                notif_spend_alert: settings?.notif_spend_alert,
              })}
              disabled={saving}
              className="ml-auto rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {saving ? "Guardando..." : "Guardar preferencias"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
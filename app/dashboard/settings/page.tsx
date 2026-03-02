"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

const ALL_ACCOUNTS = JSON.parse(process.env.NEXT_PUBLIC_META_ACCOUNTS ?? "[]");

type NotificationPrefs = {
  weeklyReport: boolean;
  roasAlert: boolean;
  spendAlert: boolean;
};

export default function SettingsPage() {
  const { data: session } = useSession();

  // Perfil
  const [name, setName] = useState(session?.user?.name ?? "");
  const [email, setEmail] = useState(session?.user?.email ?? "");
  const [profileSaved, setProfileSaved] = useState(false);

  // Contraseña
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSaved, setPasswordSaved] = useState(false);

  // Cuentas Meta Ads activas
  const [activeAccounts, setActiveAccounts] = useState<string[]>(
    ALL_ACCOUNTS.map((a: any) => a.id)
  );

  // Email para reportes
  const [reportEmail, setReportEmail] = useState(session?.user?.email ?? "");
  const [reportEmailSaved, setReportEmailSaved] = useState(false);

  // Notificaciones
  const [notifications, setNotifications] = useState<NotificationPrefs>({
    weeklyReport: true,
    roasAlert: false,
    spendAlert: false,
  });
  const [notifSaved, setNotifSaved] = useState(false);

  function toggleAccount(id: string) {
    setActiveAccounts((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  }

  function handleProfileSave() {
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
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

  function handleReportEmailSave() {
    setReportEmailSaved(true);
    setTimeout(() => setReportEmailSaved(false), 2500);
  }

  function handleNotifSave() {
    setNotifSaved(true);
    setTimeout(() => setNotifSaved(false), 2500);
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
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div className="flex items-center justify-between pt-2">
              {profileSaved && <p className="text-sm text-emerald-600">✓ Cambios guardados</p>}
              <button
                onClick={handleProfileSave}
                className="ml-auto rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
              >
                Guardar cambios
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
            {passwordError && (
              <p className="text-sm text-red-500">{passwordError}</p>
            )}
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
            {ALL_ACCOUNTS.length === 0 ? (
              <p className="text-sm text-gray-400">No hay cuentas configuradas.</p>
            ) : (
              ALL_ACCOUNTS.map((acc: any) => (
                <label
                  key={acc.id}
                  className="flex items-center gap-3 rounded-lg border border-gray-100 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={activeAccounts.includes(acc.id)}
                    onChange={() => toggleAccount(acc.id)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{acc.name}</p>
                    <p className="text-xs text-gray-400">{acc.id}</p>
                  </div>
                </label>
              ))
            )}
          </div>
        </div>

        {/* Email para reportes */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-1">Email para reportes automáticos</h2>
          <p className="text-sm text-gray-500 mb-4">Los reportes semanales se enviarán a esta dirección.</p>
          <div className="flex gap-3">
            <input
              type="email"
              value={reportEmail}
              onChange={(e) => setReportEmail(e.target.value)}
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="tu@email.com"
            />
            <button
              onClick={handleReportEmailSave}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
              {reportEmailSaved ? "✓ Guardado" : "Guardar"}
            </button>
          </div>
        </div>

        {/* Notificaciones */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-1">Preferencias de notificaciones</h2>
          <p className="text-sm text-gray-500 mb-4">Elegí qué alertas querés recibir por email.</p>
          <div className="flex flex-col gap-3">
            {[
              { key: "weeklyReport", label: "Reporte semanal automático", desc: "Recibís un resumen de performance todos los lunes" },
              { key: "roasAlert", label: "Alerta de ROAS bajo", desc: "Te avisamos si el ROAS cae por debajo de 2x" },
              { key: "spendAlert", label: "Alerta de presupuesto", desc: "Te avisamos si el gasto diario supera el límite configurado" },
            ].map((n) => (
              <label
                key={n.key}
                className="flex items-start gap-3 rounded-lg border border-gray-100 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={notifications[n.key as keyof NotificationPrefs]}
                  onChange={(e) =>
                    setNotifications((prev) => ({ ...prev, [n.key]: e.target.checked }))
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
            {notifSaved && <p className="text-sm text-emerald-600">✓ Preferencias guardadas</p>}
            <button
              onClick={handleNotifSave}
              className="ml-auto rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
              Guardar preferencias
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";

const ALL_ACCOUNTS = JSON.parse(process.env.NEXT_PUBLIC_META_ACCOUNTS ?? "[]");

type ClientAccount = {
  meta_account_id: string;
  meta_account_name: string;
};

type Client = {
  id: string;
  name: string;
  email: string;
  created_at: string;
  client_accounts: ClientAccount[];
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("es-UY", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  // Form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  function loadClients() {
    setLoading(true);
    fetch("/api/clients")
      .then((r) => r.json())
      .then((d) => setClients(d.clients ?? []))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadClients();
  }, []);

  function toggleAccount(id: string) {
    setSelectedAccounts((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  }

  async function handleCreate() {
    setFormError("");
    if (!name || !email || !password) {
      setFormError("Completá todos los campos.");
      return;
    }
    if (selectedAccounts.length === 0) {
      setFormError("Seleccioná al menos una cuenta de Meta Ads.");
      return;
    }

    setSaving(true);
    const accounts = ALL_ACCOUNTS.filter((a: any) => selectedAccounts.includes(a.id));
    const res = await fetch("/api/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, accounts }),
    });
    const data = await res.json();

    if (data.error) {
      setFormError(data.error);
      setSaving(false);
      return;
    }

    setShowModal(false);
    setName("");
    setEmail("");
    setPassword("");
    setSelectedAccounts([]);
    loadClients();
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Seguro que querés eliminar este cliente?")) return;
    setDeleting(id);
    await fetch(`/api/clients/${id}`, { method: "DELETE" });
    loadClients();
    setDeleting(null);
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gestioná el acceso de tus clientes al dashboard.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          + Nuevo cliente
        </button>
      </div>

      {/* Lista de clientes */}
      {loading ? (
        <div className="text-center py-20 text-sm text-gray-400">Cargando clientes...</div>
      ) : clients.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-16 text-center">
          <p className="text-4xl mb-4">👥</p>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Sin clientes todavía</h2>
          <p className="text-sm text-gray-500 mb-6">
            Creá un cliente para darle acceso a su dashboard personalizado.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            + Nuevo cliente
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {clients.map((client) => (
            <div
              key={client.id}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">{client.name}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{client.email}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Creado el {formatDate(client.created_at)}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(client.id)}
                  disabled={deleting === client.id}
                  className="text-xs text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
                >
                  {deleting === client.id ? "Eliminando..." : "Eliminar"}
                </button>
              </div>

              {/* Cuentas asignadas */}
              <div className="mt-4 flex flex-wrap gap-2">
                {client.client_accounts.length === 0 ? (
                  <span className="text-xs text-gray-400">Sin cuentas asignadas</span>
                ) : (
                  client.client_accounts.map((acc) => (
                    <span
                      key={acc.meta_account_id}
                      className="inline-flex items-center rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-medium text-blue-700"
                    >
                      {acc.meta_account_name}
                    </span>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal nuevo cliente */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-xl">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Nuevo cliente</h2>

            <div className="flex flex-col gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Nombre del cliente"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="cliente@email.com"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Contraseña inicial</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Mínimo 8 caracteres"
                />
                <p className="mt-1 text-xs text-gray-400">El cliente puede cambiarla después desde Settings.</p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Cuentas de Meta Ads asignadas
                </label>
                <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
                  {ALL_ACCOUNTS.map((acc: any) => (
                    <label
                      key={acc.id}
                      className="flex items-center gap-3 rounded-lg border border-gray-100 px-3 py-2 cursor-pointer hover:bg-gray-50"
                    >
                      <input
                        type="checkbox"
                        checked={selectedAccounts.includes(acc.id)}
                        onChange={() => toggleAccount(acc.id)}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{acc.name}</p>
                        <p className="text-xs text-gray-400">{acc.id}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {formError && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{formError}</p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setFormError("");
                  }}
                  className="flex-1 rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCreate}
                  disabled={saving}
                  className="flex-1 rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {saving ? "Creando..." : "Crear cliente"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
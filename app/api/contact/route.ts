import { Resend } from "resend";

export const runtime = "nodejs"; // importante para que funcione bien con SDKs

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  website?: string; // honeypot anti-spam
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Payload;

    // Honeypot: si viene lleno, probablemente es bot
    if (body.website && body.website.trim().length > 0) {
      return Response.json({ ok: true }, { status: 200 });
    }

    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    const company = (body.company ?? "").trim();
    const message = (body.message ?? "").trim();

    if (name.length < 2) {
      return Response.json({ ok: false, error: "Nombre inválido" }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return Response.json({ ok: false, error: "Email inválido" }, { status: 400 });
    }
    if (message.length < 10) {
      return Response.json(
        { ok: false, error: "Contame un poco más (mínimo 10 caracteres)" },
        { status: 400 }
      );
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL;

    if (!RESEND_API_KEY || !to || !from) {
      return Response.json(
        { ok: false, error: "Faltan variables de entorno del servidor" },
        { status: 500 }
      );
    }

    const resend = new Resend(RESEND_API_KEY);

    const subject = `Nuevo lead — Landaeta Studio: ${name}${company ? ` (${company})` : ""}`;

    const html = `
      <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto; line-height: 1.5;">
        <h2>Nuevo mensaje desde la web</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${company ? `<p><strong>Empresa:</strong> ${escapeHtml(company)}</p>` : ""}
        <p><strong>Mensaje:</strong></p>
        <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
      </div>
    `;

    await resend.emails.send({
      from,
      to,
      subject,
      replyTo: email,
      html,
    });

    return Response.json({ ok: true }, { status: 200 });
  } catch (err) {
    return Response.json({ ok: false, error: "Error inesperado" }, { status: 500 });
  }
}

// Muy básico para evitar HTML injection en el email
function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

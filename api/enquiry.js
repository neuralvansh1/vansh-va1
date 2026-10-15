import { createHash } from "node:crypto";

const EMAIL = "neuralvansh@gmail.com";
const PHONE = "918698049031";
const SERVICES = new Set([
  "Content & AI-assisted video editing",
  "Website or landing page",
  "Practical AI or a workflow",
  "Still figuring it out",
]);
const rateWindow = new Map();

function reply(res, status, body) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");
  return res.status(status).json(body);
}

export function validateEnquiry(body, now = Date.now()) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;
  const clean = (value) => (typeof value === "string" ? value.trim() : "");
  const data = {
    name: clean(body.name),
    email: clean(body.email),
    phone: clean(body.phone),
    service: clean(body.service),
    message: clean(body.message),
  };
  if (data.name.length < 2 || data.name.length > 80 || /[\r\n]/.test(data.name))
    return null;
  if (data.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    return null;
  if (
    data.phone &&
    (data.phone.length > 30 || !/^[+\d\s().-]{6,30}$/.test(data.phone))
  )
    return null;
  if (
    !SERVICES.has(data.service) ||
    data.message.length < 20 ||
    data.message.length > 3000 ||
    body.consent !== true
  )
    return null;
  if (
    !Number.isFinite(body.startedAt) ||
    now - body.startedAt < 1200 ||
    now - body.startedAt > 86400000
  )
    return null;
  return data;
}

async function deliverEmail(data) {
  const text = `New Neural Vansh website enquiry\n\nName: ${data.name}\nEmail: ${data.email}\nWhatsApp: ${data.phone || "Not provided"}\nInterested in: ${data.service}\n\n${data.message}\n\nThe sender consented to being contacted about this enquiry.`;
  if (process.env.RESEND_API_KEY && process.env.ENQUIRY_FROM_EMAIL) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      signal: AbortSignal.timeout(15000),
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.ENQUIRY_FROM_EMAIL,
        to: [EMAIL],
        reply_to: data.email,
        subject: `Neural Vansh enquiry: ${data.service}`,
        text,
      }),
    });
    if (!response.ok) throw new Error("Email provider rejected the enquiry");
    return;
  }
  const response = await fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
    method: "POST",
    signal: AbortSignal.timeout(15000),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Origin: "https://www.neuralvansh.online",
      Referer: "https://www.neuralvansh.online/contact",
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      phone: data.phone || "Not provided",
      service: data.service,
      message: data.message,
      consent: "Agreed to be contacted about this enquiry",
      _subject: `Neural Vansh enquiry: ${data.service}`,
      _template: "table",
      _captcha: "false",
      _url: "https://www.neuralvansh.online/contact",
    }),
  });
  const result = await response.json();
  if (
    !response.ok ||
    ![true, "true"].includes(result.success) ||
    /activat|confirm.*email/i.test(result.message || "")
  )
    throw new Error("Email service is not ready or did not accept the enquiry");
}

async function notifyWhatsApp(data) {
  const {
    WHATSAPP_NOTIFY_TOKEN,
    WHATSAPP_PHONE_ID,
    WHATSAPP_TEMPLATE,
    WHATSAPP_API_VERSION,
  } = process.env;
  if (
    !WHATSAPP_NOTIFY_TOKEN ||
    !WHATSAPP_PHONE_ID ||
    !WHATSAPP_TEMPLATE ||
    !/^v\d+\.\d+$/.test(WHATSAPP_API_VERSION || "")
  )
    return false;
  const response = await fetch(
    `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${WHATSAPP_PHONE_ID}/messages`,
    {
      method: "POST",
      signal: AbortSignal.timeout(10000),
      headers: {
        Authorization: `Bearer ${WHATSAPP_NOTIFY_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: PHONE,
        type: "template",
        template: {
          name: WHATSAPP_TEMPLATE,
          language: { code: process.env.WHATSAPP_TEMPLATE_LANGUAGE || "en" },
          components: [
            {
              type: "body",
              parameters: [
                data.name,
                data.email,
                data.service,
                `${data.phone ? `${data.phone}: ` : ""}${data.message}`.slice(
                  0,
                  900,
                ),
              ].map((text) => ({ type: "text", text })),
            },
          ],
        },
      }),
    },
  );
  if (!response.ok) return false;
  const result = await response.json();
  return Array.isArray(result.messages) && result.messages.length > 0;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return reply(res, 405, { accepted: false });
  }
  const origin = req.headers.origin;
  const host = req.headers.host;
  const allowedOrigins = new Set([
    "https://www.neuralvansh.online",
    "https://neuralvansh.online",
    host && `https://${host}`,
  ]);
  if (process.env.NODE_ENV !== "production") {
    allowedOrigins.add("http://localhost:5173");
    allowedOrigins.add("http://127.0.0.1:5173");
    allowedOrigins.add("http://127.0.0.1:4173");
  }
  if (!origin || !allowedOrigins.has(origin))
    return reply(res, 403, { accepted: false });
  if (
    !/^application\/json(?:;|$)/i.test(req.headers["content-type"] || "") ||
    Number(req.headers["content-length"] || 0) > 12000
  )
    return reply(res, 400, { accepted: false });
  let body;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    if (JSON.stringify(body || "").length > 12000) throw new Error("Too large");
  } catch {
    return reply(res, 400, { accepted: false });
  }
  if (typeof body?.website === "string" && body.website.trim())
    return reply(res, 200, { accepted: true, whatsappNotified: false });
  const data = validateEnquiry(body);
  if (!data) return reply(res, 400, { accepted: false });
  const now = Date.now();
  for (const [key, timestamps] of rateWindow) {
    const fresh = timestamps.filter((time) => now - time < 600000);
    if (fresh.length) rateWindow.set(key, fresh);
    else rateWindow.delete(key);
  }
  const address = String(
    req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown",
  )
    .split(",")[0]
    .trim();
  const client = createHash("sha256").update(address).digest("hex");
  const attempts = rateWindow.get(client) || [];
  if (attempts.length >= 4) return reply(res, 429, { accepted: false });
  rateWindow.set(client, [...attempts, now]);
  try {
    await deliverEmail(data);
  } catch {
    return reply(res, 503, { accepted: false });
  }
  let whatsappNotified = false;
  try {
    whatsappNotified = await notifyWhatsApp(data);
  } catch {
    /* Email delivery remains valid if the optional notification fails. */
  }
  return reply(res, 200, { accepted: true, whatsappNotified });
}

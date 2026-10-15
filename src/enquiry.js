const ENDPOINT = "https://formsubmit.co/ajax/neuralvansh@gmail.com";
const SERVICES = new Set([
  "Content & AI-assisted video editing",
  "Website or landing page",
  "Practical AI or a workflow",
  "Still figuring it out",
]);

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

export async function sendEnquiry(body, fetcher = fetch) {
  if (typeof body?.website === "string" && body.website.trim())
    return { accepted: true, whatsappNotified: false };
  const data = validateEnquiry(body);
  if (!data) throw new Error("Please check the enquiry fields.");
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetcher(ENDPOINT, {
      method: "POST",
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        consent: "Agreed to be contacted about this enquiry",
        _subject: `Neural Vansh enquiry: ${data.service}`,
        _template: "table",
        _captcha: "false",
        _honey: "",
        _url: "https://www.neuralvansh.online/contact",
      }),
    });
    const result = await response.json();
    if (
      !response.ok ||
      ![true, "true"].includes(result.success) ||
      /activat|confirm.*email/i.test(result.message || "")
    )
      throw new Error("Email provider did not accept the enquiry.");
    return { accepted: true, whatsappNotified: false };
  } finally {
    clearTimeout(timeout);
  }
}

import assert from "node:assert/strict";
import handler, { validateEnquiry } from "../api/enquiry.js";

const originalFetch = global.fetch;
const envKeys = [
  "NODE_ENV",
  "RESEND_API_KEY",
  "ENQUIRY_FROM_EMAIL",
  "WHATSAPP_NOTIFY_TOKEN",
  "WHATSAPP_PHONE_ID",
  "WHATSAPP_TEMPLATE",
  "WHATSAPP_API_VERSION",
];
const saved = Object.fromEntries(envKeys.map((key) => [key, process.env[key]]));
envKeys.forEach((key) => delete process.env[key]);
process.env.NODE_ENV = "test";
let count = 0;
const payload = {
  name: "Website Test",
  email: "test@example.com",
  phone: "+91 9000000000",
  service: "Website or landing page",
  message: "This is a local test of the enquiry endpoint.",
  consent: true,
  startedAt: Date.now() - 3000,
  website: "",
};
async function request(overrides = {}) {
  const req = {
    method: "POST",
    headers: {
      origin: "https://www.neuralvansh.online",
      host: "www.neuralvansh.online",
      "content-type": "application/json",
      "x-forwarded-for": `127.0.0.${++count}`,
    },
    body: { ...payload },
    ...overrides,
  };
  const res = {
    headers: {},
    setHeader(key, value) {
      this.headers[key] = value;
    },
    status(value) {
      this.statusCode = value;
      return this;
    },
    json(value) {
      this.body = value;
      return this;
    },
  };
  await handler(req, res);
  return res;
}
try {
  assert.ok(validateEnquiry(payload));
  for (const invalid of [
    { consent: false },
    { email: "bad" },
    { name: "x" },
    { phone: "not-a-number" },
    { service: "arbitrary recipient" },
    { message: "short" },
    { startedAt: Date.now() },
  ])
    assert.equal(validateEnquiry({ ...payload, ...invalid }), null);
  global.fetch = () => {
    throw new Error("Unexpected provider call");
  };
  assert.equal((await request({ method: "GET" })).statusCode, 405);
  assert.equal(
    (await request({ headers: { origin: "https://unrelated.example" } }))
      .statusCode,
    403,
  );
  assert.equal((await request({ body: "{invalid" })).statusCode, 400);
  assert.equal(
    (await request({ body: { ...payload, consent: false } })).statusCode,
    400,
  );
  assert.equal(
    (await request({ body: { ...payload, website: "bot-filled-field" } }))
      .statusCode,
    200,
  );
  global.fetch = async () => ({
    ok: true,
    json: async () => ({
      success: "false",
      message: "This form needs Activation.",
    }),
  });
  assert.equal((await request()).statusCode, 503);
  let calls = [];
  global.fetch = async (url, options) => {
    calls.push({ url, options });
    return {
      ok: true,
      json: async () => ({
        success: "true",
        message: "Form submitted successfully",
      }),
    };
  };
  const accepted = await request();
  assert.equal(accepted.statusCode, 200);
  assert.deepEqual(accepted.body, { accepted: true, whatsappNotified: false });
  assert.equal(
    calls[0].url,
    "https://formsubmit.co/ajax/neuralvansh@gmail.com",
  );
  assert.equal(
    calls[0].options.headers.Referer,
    "https://www.neuralvansh.online/contact",
  );
  process.env.WHATSAPP_NOTIFY_TOKEN = "test-token";
  process.env.WHATSAPP_PHONE_ID = "test-sender";
  process.env.WHATSAPP_TEMPLATE = "new_enquiry";
  process.env.WHATSAPP_API_VERSION = "v26.0";
  calls = [];
  global.fetch = async (url, options) => {
    calls.push({ url, options });
    return {
      ok: true,
      json: async () =>
        url.includes("graph.facebook.com")
          ? { messages: [{ id: "test" }] }
          : { success: "true" },
    };
  };
  assert.equal((await request()).body.whatsappNotified, true);
  assert.equal(JSON.parse(calls[1].options.body).to, "918698049031");
  global.fetch = async (url) => ({
    ok: !url.includes("graph.facebook.com"),
    json: async () => ({ success: "true" }),
  });
  assert.deepEqual((await request()).body, {
    accepted: true,
    whatsappNotified: false,
  });
  console.log(
    "PASS: validation, origin checks, honeypot, provider activation errors, email acceptance and optional WhatsApp delivery. All providers mocked; no messages sent.",
  );
} finally {
  global.fetch = originalFetch;
  for (const key of envKeys) {
    if (saved[key] === undefined) delete process.env[key];
    else process.env[key] = saved[key];
  }
}

import test from "node:test";
import assert from "node:assert/strict";
import { validateEnquiry, sendEnquiry } from "../src/enquiry.js";

const payload = () => ({
  name: "Website Test",
  email: "test@example.com",
  phone: "+91 9000000000",
  service: "Website or landing page",
  message: "A local test of the website enquiry delivery path.",
  consent: true,
  startedAt: Date.now() - 3000,
  website: "",
});

test("invalid enquiries never reach the provider", async () => {
  for (const invalid of [
    { consent: false },
    { email: "bad" },
    { name: "x" },
    { phone: "not-a-number" },
    { service: "arbitrary destination" },
    { message: "short" },
    { startedAt: Date.now() },
  ]) {
    assert.equal(validateEnquiry({ ...payload(), ...invalid }), null);
    await assert.rejects(
      sendEnquiry({ ...payload(), ...invalid }, () => {
        assert.fail("Invalid data sent to provider");
      }),
    );
  }
});

test("honeypot avoids sending automated submissions", async () => {
  const result = await sendEnquiry(
    { ...payload(), website: "bot-filled-field" },
    () => {
      assert.fail("Honeypot submission sent");
    },
  );
  assert.equal(result.accepted, true);
});

test("activation and provider failures never produce a success state", async () => {
  for (const response of [
    { ok: true, success: "false", message: "This form needs Activation." },
    { ok: false, success: "true" },
  ]) {
    await assert.rejects(
      sendEnquiry(payload(), async () => ({
        ok: response.ok,
        json: async () => response,
      })),
    );
  }
  await assert.rejects(
    sendEnquiry(payload(), async () => {
      throw new Error("Network unavailable");
    }),
  );
});

test("recipient is fixed and direct WhatsApp is never reported as an automatic notification", async () => {
  let captured;
  const result = await sendEnquiry(
    { ...payload(), recipient: "somewhere-else@example.com" },
    async (url, options) => {
      captured = { url, options, body: JSON.parse(options.body) };
      return {
        ok: true,
        json: async () => ({
          success: "true",
          message: "The form was submitted successfully.",
        }),
      };
    },
  );
  assert.equal(
    captured.url,
    "https://formsubmit.co/ajax/neuralvansh@gmail.com",
  );
  assert.equal(captured.body.recipient, undefined);
  assert.equal(captured.body.email, "test@example.com");
  assert.equal(
    captured.body.consent,
    "Agreed to be contacted about this enquiry",
  );
  assert.deepEqual(result, { accepted: true, whatsappNotified: false });
});

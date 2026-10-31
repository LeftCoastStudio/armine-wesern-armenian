// Netlify serverless function — proxies TTS requests to ElevenLabs.
// Set ELEVENLABS_API_KEY in Netlify → Site configuration → Environment variables.
// Optional: ELEVENLABS_VOICE_ID to use a voice from your library instead of the default.
//
//   POST /.netlify/functions/tts   body: { "text": "Բարեւ" }   → { "audio": "<base64 mp3>", "model": "eleven_v3", "spoken": "Փարեվ" }
//   GET  /.netlify/functions/tts?text=Բարեւ                    → plays the mp3 directly (handy for testing in a browser tab)
//   add  raw=1 (GET) or "raw": true (POST) to send the text to the voice exactly as written
//
// The voice model learned Eastern Armenian, so Armenian text is respelled before it is
// sent (see ../lib/pronounce.mjs): the learner sees "Բարեւ", the voice is handed "Փարեվ"
// and says "parev". A single letter is spoken by its Western name (Բ → "pen").

import { westernArmenianForSpeech } from "../lib/pronounce.mjs";

const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || "21m00Tcm4TlvDq8ikWAM"; // "Rachel" — any voice_id from your ElevenLabs library works
const MODELS = ["eleven_v3", "eleven_multilingual_v2"]; // v3 speaks Armenian; v2 is a last-resort fallback

// Letter names in classical spelling; after respelling the voice says the Western name.
const LETTER_NAMES = {
  "Ա": "այբ", "Բ": "բեն", "Գ": "գիմ", "Դ": "դա", "Ե": "եչ", "Զ": "զա", "Է": "է", "Ը": "ըթ", "Թ": "թօ", "Ժ": "ժէ",
  "Ի": "ինի", "Լ": "լիւն", "Խ": "խէ", "Ծ": "ծա", "Կ": "կեն", "Հ": "հօ", "Ձ": "ձա", "Ղ": "ղատ", "Ճ": "ճէ", "Մ": "մեն",
  "Յ": "յի", "Ն": "նու", "Շ": "շա", "Ո": "ո", "Չ": "չա", "Պ": "պէ", "Ջ": "ջէ", "Ռ": "ռա", "Ս": "սէ", "Վ": "վեւ",
  "Տ": "տիւն", "Ր": "րէ", "Ց": "ցօ", "Ւ": "հիւն", "Փ": "փիւր", "Ք": "քէ", "Օ": "օ", "Ֆ": "ֆէ", "ԵՒ": "եւ", "և": "եւ",
};

// What the voice is handed for a given display text.
export function speechText(text, raw = false) {
  const t = String(text || "").trim();
  if (raw || !t) return t;
  const key = t.length <= 2 ? t.toUpperCase() : t;
  if (LETTER_NAMES[key]) return westernArmenianForSpeech(LETTER_NAMES[key]);
  return westernArmenianForSpeech(t);
}

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};
const json = (statusCode, body) => ({
  statusCode,
  headers: { ...CORS, "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

async function synthesize(apiKey, text) {
  let lastError = null;
  for (const model of MODELS) {
    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
      method: "POST",
      headers: { "xi-api-key": apiKey, "Content-Type": "application/json", Accept: "audio/mpeg" },
      body: JSON.stringify({
        text,
        model_id: model,
        // NOTE: no language_code — only Turbo/Flash v2.5 accept it; other models reject the request.
        voice_settings: { stability: 0.5, similarity_boost: 0.75 },
      }),
    });
    if (res.ok) {
      return { model, audio: Buffer.from(await res.arrayBuffer()) };
    }
    lastError = { status: res.status, model, details: await res.text() };
    console.error("ElevenLabs error", lastError);
  }
  throw Object.assign(new Error("All models failed"), lastError);
}

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: CORS, body: "" };

  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) return json(500, { error: "ELEVENLABS_API_KEY is not set in Netlify environment variables" });

  let text = "";
  let raw = false;
  if (event.httpMethod === "GET") {
    const q = event.queryStringParameters || {};
    text = q.text || "";
    raw = q.raw === "1" || q.raw === "true";
  } else if (event.httpMethod === "POST") {
    try {
      const body = JSON.parse(event.body || "{}");
      text = body.text || "";
      raw = body.raw === true;
    } catch { return json(400, { error: "Invalid JSON body" }); }
  } else {
    return json(405, { error: "Method not allowed" });
  }

  text = String(text).trim();
  if (!text) return json(400, { error: "Missing text. Try /.netlify/functions/tts?text=Բարեւ" });
  if (text.length > 300) return json(400, { error: "Text too long" });
  const spoken = speechText(text, raw);

  try {
    const { model, audio } = await synthesize(apiKey, spoken);
    if (event.httpMethod === "GET") {
      return {
        statusCode: 200,
        headers: { ...CORS, "Content-Type": "audio/mpeg", "Cache-Control": "public, max-age=86400", "X-TTS-Model": model },
        body: audio.toString("base64"),
        isBase64Encoded: true,
      };
    }
    return {
      statusCode: 200,
      headers: { ...CORS, "Content-Type": "application/json", "Cache-Control": "public, max-age=86400" },
      body: JSON.stringify({ audio: audio.toString("base64"), model, spoken }),
    };
  } catch (err) {
    return json(err.status || 502, {
      error: `ElevenLabs request failed (${err.status || "network"})`,
      model: err.model,
      details: err.details || String(err),
    });
  }
}

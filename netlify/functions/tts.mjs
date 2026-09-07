// Netlify serverless function — proxies TTS requests to ElevenLabs.
// Set ELEVENLABS_API_KEY in Netlify → Site configuration → Environment variables.
//
//   POST /.netlify/functions/tts   body: { "text": "Բարեւ" }   → { "audio": "<base64 mp3>", "model": "eleven_v3" }
//   GET  /.netlify/functions/tts?text=Բարեւ                    → plays the mp3 directly (handy for testing in a browser tab)

const VOICE_ID = "21m00Tcm4TlvDq8ikWAM"; // "Rachel" — swap for any voice_id from your ElevenLabs library
const MODELS = ["eleven_v3", "eleven_multilingual_v2"]; // v3 speaks Armenian; v2 is a last-resort fallback

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
  if (event.httpMethod === "GET") {
    text = (event.queryStringParameters && event.queryStringParameters.text) || "";
  } else if (event.httpMethod === "POST") {
    try { text = (JSON.parse(event.body || "{}").text || ""); }
    catch { return json(400, { error: "Invalid JSON body" }); }
  } else {
    return json(405, { error: "Method not allowed" });
  }

  text = String(text).trim();
  if (!text) return json(400, { error: "Missing text. Try /.netlify/functions/tts?text=Բարեւ" });
  if (text.length > 300) return json(400, { error: "Text too long" });

  try {
    const { model, audio } = await synthesize(apiKey, text);
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
      body: JSON.stringify({ audio: audio.toString("base64"), model }),
    };
  } catch (err) {
    return json(err.status || 502, {
      error: `ElevenLabs request failed (${err.status || "network"})`,
      model: err.model,
      details: err.details || String(err),
    });
  }
}

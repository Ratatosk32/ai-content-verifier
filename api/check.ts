import type { VercelRequest, VercelResponse } from '@vercel/node';
import { InferenceClient } from "@huggingface/inference";

// ---- Validate HF token ----
const HF_TOKEN = process.env.HF_TOKEN;
if (!HF_TOKEN || typeof HF_TOKEN !== "string") {
  console.error("HF_TOKEN is missing or invalid!");
}

// ---- Initialize HF client ----
const client = new InferenceClient(HF_TOKEN);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // ---- CORS Headers ----
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow any site
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  // ---- Preflight request ----
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // ---- POST Request ----
  if (req.method === "POST") {
    try {
      const { text } = req.body;
      if (!text) return res.status(400).json({ error: "No text provided" });

      const inputText = text.substring(0, 1000);

      const response = await client.textClassification({
        model: "openai-community/roberta-base-openai-detector",
        inputs: inputText,
      });

      return res.status(200).json(response);
    } catch (err: any) {
      console.error("API error:", err);
      return res.status(500).json({ error: "Server Error", details: err.message });
    }
  }

  return res.status(200).json({ status: "API is active" });
}

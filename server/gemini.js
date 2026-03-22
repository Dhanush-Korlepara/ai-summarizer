import OpenAI from "openai";
import dotenv from "dotenv";
import { buildPrompt } from "./prompt.js";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

export const summarizeText = async (text) => {
  try {
    const prompt = buildPrompt(text);

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile", // ✅ WORKING MODEL
      messages: [
        { role: "user", content: prompt }
      ]
    });

    let output = response.choices[0].message.content;

    console.log("Raw Output:\n", output);

    // Clean markdown if exists
    output = output
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(output);

  } catch (error) {
    console.error("Error:", error.message);
    throw new Error("Failed to summarize text");
  }
};
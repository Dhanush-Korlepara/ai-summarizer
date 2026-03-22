import express from "express";
import cors from "cors";
import { summarizeText } from "./gemini.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "*"
}));
app.use(express.json());

app.post("/summarize", async (req, res) => {
  const text = req.body.text?.trim();

  if (!text) {
    return res.status(400).json({
      error: "Text is required"
    });
  }

  try {
    const result = await summarizeText(text);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Failed to summarize"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { askOpenAI } from "./openai.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/ask", async (req, res) => {
  const { prompt } = req.body;
  const answer = await askOpenAI(prompt);
  res.json({ response: answer });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

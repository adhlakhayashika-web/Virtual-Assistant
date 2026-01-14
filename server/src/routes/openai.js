// openai.js
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Example function to send prompt
export const askOpenAI = async (prompt) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // or "gpt-4-turbo"
      messages: [{ role: "user", content: prompt }],
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error("❌ OpenAI Error:", error);
    return "Something went wrong while contacting OpenAI.";
  }
};

// small wrapper around OpenAI
const { Configuration, OpenAIApi } = require('openai');
const conf = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(conf);

async function chatCompletion(messages, maxTokens=400) {
  // messages: [{role:'user'/'assistant'/'system', content:'...'}]
  const res = await openai.createChatCompletion({
    model: "gpt-4o-mini", // pick whichever is available to you
    messages,
    max_tokens: maxTokens
  });
  return res.data.choices[0].message;
}

module.exports = { chatCompletion };

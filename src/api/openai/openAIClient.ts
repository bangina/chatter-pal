import OpenAI from "openai";

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const openAIClient = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
  maxRetries: 1,
  timeout: 10000,
});

export default openAIClient;

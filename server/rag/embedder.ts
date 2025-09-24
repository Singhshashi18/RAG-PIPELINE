         import { OpenAIEmbeddings } from "@langchain/openai";
export const embedder = new OpenAIEmbeddings({ apiKey: process.env.OPENAI_API_KEY });
  

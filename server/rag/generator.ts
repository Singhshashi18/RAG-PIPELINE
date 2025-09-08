import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";

const model = new ChatOpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateAnswer = async (query: string, context: string) => {
  const prompt = `Context: ${context}\n\nQuestion: ${query}`;
  const response = await model.invoke([new HumanMessage(prompt)]);
  return response.content;
};

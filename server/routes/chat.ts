 import express from "express";
import { retriever } from "../rag/retriever";
import { generateAnswer } from "../rag/generator";

const router = express.Router(); 
 
router.post("/chat", async (req, res) => {
  const { message } = req.body;
  const docs = await retriever.similaritySearch(message, 3);
  const context = docs.map(doc => doc.pageContent).join("\n");
  const reply = await generateAnswer(message, context);
  res.json({ reply });
});

export default router;


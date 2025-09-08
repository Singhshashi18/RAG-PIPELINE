import { MemoryVectorStore } from "@langchain/core/vectorstores/memory";
import { embedder } from "./embedder";
import { loadDocs } from "./loader"; 

export const retriever = await MemoryVectorStore.fromDocuments(loadDocs(), embedder);

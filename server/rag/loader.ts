import { Document } from "@langchain/core/documents";
export const loadDocs = (): Document[] => {
  return [
    new Document({ pageContent: "Delhi is the capital of India." }),
    new Document({ pageContent: "React is a JavaScript library for building UIs." }),
  ];
};

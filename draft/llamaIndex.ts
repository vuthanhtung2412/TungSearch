// Exec with the following command `npx tsx draft/llamaIndex.ts`
import {
  HuggingFaceEmbedding,
  storageContextFromDefaults,
  Settings,
  VectorStoreIndex,
  Document,
  VectorIndexRetriever,
} from "llamaindex";


Settings.embedModel = new HuggingFaceEmbedding({
  modelType: "Alibaba-NLP/gte-large-en-v1.5",
  quantized: false,
});

(async () => {
  const embeddings = await Settings.embedModel.getTextEmbedding("Tung dep trai")
  const dim = embeddings.length
  console.log(embeddings.slice(0, 5))
  console.log(dim)

  const storageContext = await storageContextFromDefaults({
    persistDir: "./storage",
  });

  const document = new Document({ text: "Love is the meaning of life" });
  const index = await VectorStoreIndex.fromDocuments([document], {
    storageContext
  });

  const retriever = new VectorIndexRetriever({
    index,
    similarityTopK : 10
  })

  const query = "what is the meaning of life ?"
  const res = await retriever.retrieve(query)
  console.log(JSON.stringify(res, null, 2))

})();

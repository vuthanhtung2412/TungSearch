// Exec with the following command `npx tsx draft/llamaIndex.ts`
import { 
  HuggingFaceEmbedding, 
} from "llamaindex";

// Model metadata and onnx file is store at node_modules/@xenova/transformers/.cache
const embedModel = new HuggingFaceEmbedding({
  modelType: "Alibaba-NLP/gte-large-en-v1.5",
  quantized: false,
});

(async() => {
  const embeddings = await embedModel.getTextEmbedding("Tung dep trai")
  console.log(embeddings.length)
  console.log(embeddings.slice(0,5))
})();
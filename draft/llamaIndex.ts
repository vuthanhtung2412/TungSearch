// Exec with the following command `npx tsx draft/llamaIndex.ts`
import { 
  HuggingFaceEmbedding,
  SimpleDirectoryReader,
  SimpleNodeParser,
  WeaviateVectorStore, 
} from "llamaindex";
import weaviateV2, { EmbeddedOptions} from 'weaviate-ts-embedded';
import weaviateV3 from 'weaviate-client'

// Model metadata and onnx file is store at node_modules/@xenova/transformers/.cache
const embedModel = new HuggingFaceEmbedding({
  modelType: "Alibaba-NLP/gte-large-en-v1.5",
  quantized: false,
});

(async() => {
  const embeddings = await embedModel.getTextEmbedding("Tung dep trai")
  const dim = embeddings.length
  console.log(embeddings.slice(0,5))
  console.log(dim)

  // Load dir 
  const dirReader = new SimpleDirectoryReader()
  const blogs = await dirReader.loadData('./draft/data/')
  const parser = new SimpleNodeParser({
    chunkSize : 1024,
    chunkOverlap : 20
  })
  const nodes = parser.getNodesFromDocuments(blogs)

  // Start embedded server 
  const clientV2 = weaviateV2.client(
    new EmbeddedOptions({
      env: {
        ENABLE_MODULES: "text2vec-huggingface",
      },
    })
  );
  await clientV2.embedded.start();

  const liveCheck = await clientV2.misc
  .liveChecker()
  .do();

  console.log("Send heartbeats Weaviate : " + liveCheck)

  // Map to v3 because WeaviateVectorStore only accept v3 client
  let clientV3
  // Create v3 server 
  try {
    clientV3 = await weaviateV3.connectToLocal({
      port : 6666,
    })
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  console.log(clientV3)

})();

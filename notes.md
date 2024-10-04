# My Notes 

List of supported vector DB by LlamaIndex : https://docs.llamaindex.ai/en/stable/module_guides/storing/vector_stores/

The API in TypeScript and Python of LlamaIndex are pretty similar. We can read Python docs in case TS doc is dogshit.

`stella en 400M v5` model's ONNX file needs to be downloaded from [this commit](https://huggingface.co/dunzhang/stella_en_400M_v5/tree/refs%2Fpr%2F3)

Milvus lite doesn't work with Typescript

No hugging face integration for TS SDK v2 [link](https://weaviate.io/developers/weaviate/model-providers/transformers/embeddings#weaviate-configuration)

LlamaIndex only works with weaviate v3 client => embedded weaviate is not possible
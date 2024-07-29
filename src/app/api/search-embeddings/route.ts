import { createClient } from '@/utils/supabase/server';
import { env, pipeline } from '@xenova/transformers';
import { NextResponse } from 'next/server';

const model_name = 'pubmedbert-base-embeddings';
// Specify a custom location for models (defaults to '/models/').
env.remoteHost = 'https://test-onnx-model.s3.ap-southeast-1.amazonaws.com';
// Disable the loading of remote models from the Hugging Face Hub:
env.allowRemoteModels = true;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);

  const query = searchParams.get('query') ?? '';

  const extractor = await pipeline('feature-extraction', model_name);

  const { data: query_embedding } = await extractor(query, {
    pooling: 'mean',
    normalize: true,
  });

  const embeddings = Array.from(query_embedding);

  const supabase = createClient();
  console.log(embeddings);

  const { data, error } = await supabase.rpc('semantic_search', {
    match_count: 20,
    match_threshold: 0.7,
    query_embedding: embeddings,
    vocab_id: 'SNOMED',
  });

  return NextResponse.json({
    data,
    error,
  });
}

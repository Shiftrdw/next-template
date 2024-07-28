import { createClient } from '@/utils/supabase/server';
import { env, pipeline } from '@xenova/transformers';
import { NextResponse } from 'next/server';

const model_name = '../../../../models/pubmed-bert';
// Specify a custom location for models (defaults to '/models/').
env.localModelPath = '../../../../models';

// Disable the loading of remote models from the Hugging Face Hub:
env.allowRemoteModels = false;

export async function GET() {
  const query = 'healthy';

  const extractor = await pipeline('feature-extraction', 'pubmed-bert', {
    revision: 'default',
  });

  const { data: query_embedding } = await extractor(query, {
    pooling: 'mean',
    normalize: true,
  });

  const embeddings = Array.from(query_embedding);

  const supabase = createClient();

  const { data, error } = await supabase.rpc('semantic_search', {
    match_count: 20,
    match_threshold: 0.6,
    query_embedding: embeddings,
    vocab_id: 'SNOMED',
  });

  return NextResponse.json({
    data,
    error,
  });
}

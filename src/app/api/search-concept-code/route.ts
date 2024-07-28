import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from(`concept_code_search`)
    .select()
    .textSearch('fts', 'J18:*')
    .eq('vocabulary_id', 'CPT4')
    .limit(15);

  return NextResponse.json({
    data,
    error,
  });
}

import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from(`concept_search`)
    .select()
    .textSearch('fts', `'streptococcal+pneumonia'`)
    .eq('vocabulary_id', 'SNOMED')
    .limit(15);

  return NextResponse.json({
    data,
    error,
  });
}

import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from(`concept_search`)
    .select()
    .textSearch('fts', `'paracetamol:*'`)
    .limit(150);

  return NextResponse.json({
    data,
    error,
  });
}

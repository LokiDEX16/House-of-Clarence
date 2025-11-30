import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/**
 * GET /api/products
 * Fetch all products with optional filtering and sorting
 *
 * Query parameters:
 * - category: Filter by category
 * - sort: Sort by (price, rating, newest)
 * - limit: Number of products to return (default: 50)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const sort = searchParams.get('sort') || 'newest';
    const limit = parseInt(searchParams.get('limit') || '50');

    let query = supabase.from('products').select('*');

    // Apply category filter if provided
    if (category) {
      query = query.eq('category', category);
    }

    // Apply sorting
    if (sort === 'price') {
      query = query.order('price', { ascending: true });
    } else if (sort === 'rating') {
      query = query.order('rating', { ascending: false });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    // Apply limit
    query = query.limit(limit);

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

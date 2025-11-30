import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      user_id,
      customization_comments,
      reference_images,
      cart_items,
      total_amount,
      shipping_address,
      phone,
    } = body;

    // Validate required fields
    if (!user_id || !cart_items || cart_items.length === 0) {
      return NextResponse.json(
        { message: 'Missing required fields: user_id, cart_items' },
        { status: 400 }
      );
    }

    // Insert checkout details into database
    const { data, error } = await supabase.from('checkout_details').insert({
      user_id,
      customization_comments: customization_comments || '',
      reference_images: reference_images || [],
      cart_items: cart_items,
      total_amount,
      shipping_address: shipping_address || '',
      phone: phone || '',
      status: 'pending',
    });

    if (error) {
      console.error('Checkout error:', error);
      return NextResponse.json(
        { message: `Failed to save checkout details: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: 'Checkout submitted successfully',
        data,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Checkout API error:', error);
    return NextResponse.json(
      { message: `Internal server error: ${error.message}` },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { getProducts } from '@/lib/data';

export async function GET() {
  try {
    const products = getProducts();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { message: 'Erreur lors de la récupération des produits' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { getOrders, addOrder, Order } from '@/lib/data';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ message: 'Token manquant' }, { status: 401 });
    }

    const user = verifyToken(token);
    if (!user || !user.isAdmin) {
      return NextResponse.json({ message: 'Accès refusé' }, { status: 403 });
    }

    const orders = getOrders();
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { message: 'Erreur lors de la récupération des commandes' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();
    
    const order: Order = {
      ...orderData,
      id: Date.now().toString(),
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
    };

    addOrder(order);

    return NextResponse.json({ message: 'Commande créée avec succès', order });
  } catch (error) {
    return NextResponse.json(
      { message: 'Erreur lors de la création de la commande' },
      { status: 500 }
    );
  }
}
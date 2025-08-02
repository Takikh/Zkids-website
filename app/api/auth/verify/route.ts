import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ message: 'Token manquant' }, { status: 401 });
    }

    const user = verifyToken(token);
    if (!user) {
      return NextResponse.json({ message: 'Token invalide' }, { status: 401 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { message: 'Erreur de vérification' },
      { status: 500 }
    );
  }
}
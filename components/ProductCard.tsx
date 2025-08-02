'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/data';
import { useTranslation } from '@/hooks/useTranslation';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { t } = useTranslation();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
        <div className="relative overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.featured && (
            <div className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold">
              ⭐ Vedette
            </div>
          )}
          {product.stock < 5 && product.stock > 0 && (
            <div className="absolute top-3 right-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Stock Faible
            </div>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold">{t('product.outOfStock')}</span>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-blue-600">
                {product.price.toLocaleString()} DA
              </span>
              <p className="text-xs text-gray-500 mt-1">
                {product.stock > 0 ? `${product.stock} ${t('product.inStock')}` : t('product.outOfStock')}
              </p>
            </div>
            
            {product.stock > 0 && onAddToCart && (
              <Button
                onClick={handleAddToCart}
                size="sm"
                className="bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white rounded-full"
              >
                <ShoppingCart className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
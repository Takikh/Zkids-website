'use client';

import { useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { useTranslation } from '@/hooks/useTranslation';
import { useCart } from '@/hooks/useCart';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function CartPage() {
  const { t } = useTranslation();
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCart();

  const handleQuantityChange = (productId: string, size: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId, size);
      toast.success('Produit retiré du panier');
    } else {
      updateQuantity(productId, size, newQuantity);
    }
  };

  const handleRemoveItem = (productId: string, size: string, productName: string) => {
    removeItem(productId, size);
    toast.success(`${productName} retiré du panier`);
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {t('cart.empty')}
            </h1>
            <p className="text-gray-600 mb-8">
              Découvrez notre collection et ajoutez vos articles préférés!
            </p>
            <Link href="/">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white px-8 py-4 rounded-full">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Continuer les achats
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Toaster position="top-right" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            {t('cart.title')}
          </h1>
          <p className="text-gray-600">
            {items.length} article{items.length > 1 ? 's' : ''} dans votre panier
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.size}`}
                className="bg-white rounded-2xl shadow-sm border p-6"
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <div className="relative w-32 h-32 rounded-xl overflow-hidden bg-gray-100">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {item.product.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          Taille: {item.size}
                        </p>
                        <p className="text-blue-600 font-bold text-lg">
                          {item.product.price.toLocaleString()} DA
                        </p>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveItem(item.product.id, item.size, item.product.name)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.product.id, item.size, item.quantity - 1)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-12 text-center font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.product.id, item.size, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          {(item.product.price * item.quantity).toLocaleString()} DA
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Résumé de la commande
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Sous-total</span>
                  <span>{getTotalPrice().toLocaleString()} DA</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Livraison</span>
                  <span>Gratuite</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>{t('cart.total')}</span>
                    <span>{getTotalPrice().toLocaleString()} DA</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Link href="/checkout" className="block">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white py-6 text-lg font-semibold rounded-2xl">
                    {t('cart.checkout')}
                  </Button>
                </Link>
                
                <Link href="/">
                  <Button variant="outline" className="w-full py-3 rounded-xl">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Continuer les achats
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
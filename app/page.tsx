'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { useTranslation } from '@/hooks/useTranslation';
import { useCart } from '@/hooks/useCart';
import { getFeaturedProducts, Product } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  const { t } = useTranslation();
  const { addItem } = useCart();
  const [featuredProducts] = useState<Product[]>(getFeaturedProducts());

  const handleAddToCart = (product: Product) => {
    // Add with default size for quick add from homepage
    const defaultSize = product.sizes[0];
    addItem(product, defaultSize);
    toast.success(`${product.name} ajouté au panier!`);
  };

  const testimonials = [
    {
      name: 'Amina B.',
      text: 'Excellent service et vêtements de qualité pour mes enfants!',
      rating: 5
    },
    {
      name: 'Mohammed K.',
      text: 'Livraison rapide et prix abordables. Je recommande!',
      rating: 5
    },
    {
      name: 'Fatima L.',
      text: 'Mes filles adorent leurs nouvelles robes de Z-Kids.',
      rating: 5
    }
  ];

  const categories = [
    {
      name: t('nav.boys'),
      href: '/category/boys',
      image: 'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg',
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: t('nav.girls'),
      href: '/category/girls',
      image: 'https://images.pexels.com/photos/1620653/pexels-photo-1620653.jpeg',
      color: 'from-pink-500 to-pink-600'
    },
    {
      name: t('nav.accessories'),
      href: '/category/accessories',
      image: 'https://images.pexels.com/photos/1078090/pexels-photo-1078090.jpeg',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  return (
    <Layout>
      <Toaster position="top-right" />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-pink-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent">
                  {t('home.heroTitle')}
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-lg">
                {t('home.heroSubtitle')}
              </p>
              <Link href="/category/boys">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  {t('home.heroButton')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="relative z-10">
                <Image
                  src="https://images.pexels.com/photos/1620653/pexels-photo-1620653.jpeg"
                  alt="Z-Kids Fashion"
                  width={500}
                  height={600}
                  className="rounded-3xl shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-yellow-400 to-pink-400 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('home.featuredTitle')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez notre sélection de vêtements tendance pour enfants
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('home.categoriesTitle')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link key={index} href={category.href}>
                <div className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative h-64">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-70 transition-opacity duration-300`}></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-white text-center">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('home.testimonialsTitle')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-500 to-pink-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Visitez notre boutique à Medea
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 mb-8">
            <div className="flex items-center text-white">
              <MapPin className="w-5 h-5 mr-2" />
              <span>Berrouaghia, Centre Ville, Bazar Belhadj</span>
            </div>
            <div className="flex items-center text-white">
              <Phone className="w-5 h-5 mr-2" />
              <span>+213540083489</span>
            </div>
            <div className="flex items-center text-white">
              <Mail className="w-5 h-5 mr-2" />
              <span>khelfat.takieddine@gmail.com</span>
            </div>
          </div>
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="px-8 py-4 rounded-full text-lg font-semibold">
              {t('nav.contact')}
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
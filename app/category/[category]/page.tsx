'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { useTranslation } from '@/hooks/useTranslation';
import { useCart } from '@/hooks/useCart';
import { getProductsByCategory, Product } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function CategoryPage() {
  const params = useParams();
  const { t } = useTranslation();
  const { addItem } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<string>('name');
  const [filterBy, setFilterBy] = useState<string>('all');

  useEffect(() => {
    if (params.category) {
      const categoryProducts = getProductsByCategory(params.category as string);
      setProducts(categoryProducts);
      setFilteredProducts(categoryProducts);
    }
  }, [params.category]);

  useEffect(() => {
    let filtered = [...products];

    // Apply filters
    if (filterBy === 'featured') {
      filtered = filtered.filter(p => p.featured);
    } else if (filterBy === 'inStock') {
      filtered = filtered.filter(p => p.stock > 0);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [products, sortBy, filterBy]);

  const handleAddToCart = (product: Product) => {
    const defaultSize = product.sizes[0];
    addItem(product, defaultSize);
    toast.success(`${product.name} ajouté au panier!`);
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'boys':
        return t('nav.boys');
      case 'girls':
        return t('nav.girls');
      case 'accessories':
        return t('nav.accessories');
      default:
        return category;
    }
  };

  const getCategoryDescription = (category: string) => {
    switch (category) {
      case 'boys':
        return 'Découvrez notre collection de vêtements pour garçons - confortables, durables et stylés.';
      case 'girls':
        return 'Une sélection adorable de vêtements pour filles - élégants, colorés et parfaits pour toutes les occasions.';
      case 'accessories':
        return 'Complétez les tenues avec nos accessoires pour enfants - sacs, casquettes et plus encore.';
      default:
        return '';
    }
  };

  return (
    <Layout>
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {getCategoryTitle(params.category as string)}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {getCategoryDescription(params.category as string)}
          </p>
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrer par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les produits</SelectItem>
                <SelectItem value="featured">Produits vedettes</SelectItem>
                <SelectItem value="inStock">En stock</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Trier par:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nom</SelectItem>
                <SelectItem value="price-low">Prix croissant</SelectItem>
                <SelectItem value="price-high">Prix décroissant</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Filter className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucun produit trouvé
            </h3>
            <p className="text-gray-600 mb-6">
              Essayez de modifier vos filtres ou explorez d'autres catégories.
            </p>
            <Button
              onClick={() => {
                setFilterBy('all');
                setSortBy('name');
              }}
              variant="outline"
            >
              Réinitialiser les filtres
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
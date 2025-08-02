// Simulated database - In production, this would be MongoDB/PostgreSQL
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'boys' | 'girls' | 'accessories';
  images: string[];
  sizes: string[];
  stock: number;
  featured: boolean;
}

export interface Order {
  id: string;
  userId?: string;
  items: {
    productId: string;
    quantity: number;
    size: string;
    price: number;
  }[];
  total: number;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  isAdmin: boolean;
}

// Sample data
export const products: Product[] = [
  {
    id: '1',
    name: 'T-shirt Coloré Garçon',
    price: 2500,
    description: 'T-shirt coloré et confortable pour garçons, parfait pour l\'été.',
    category: 'boys',
    images: ['https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg'],
    sizes: ['XS', 'S', 'M', 'L'],
    stock: 15,
    featured: true
  },
  {
    id: '2',
    name: 'Robe Fleurie Fille',
    price: 3200,
    description: 'Belle robe fleurie pour petites filles, idéale pour les occasions spéciales.',
    category: 'girls',
    images: ['https://images.pexels.com/photos/1620653/pexels-photo-1620653.jpeg'],
    sizes: ['XS', 'S', 'M', 'L'],
    stock: 12,
    featured: true
  },
  {
    id: '3',
    name: 'Casquette Enfant',
    price: 1800,
    description: 'Casquette stylée pour protéger du soleil.',
    category: 'accessories',
    images: ['https://images.pexels.com/photos/1078090/pexels-photo-1078090.jpeg'],
    sizes: ['One Size'],
    stock: 25,
    featured: false
  },
  {
    id: '4',
    name: 'Jean Garçon',
    price: 4200,
    description: 'Jean confortable et résistant pour garçons actifs.',
    category: 'boys',
    images: ['https://images.pexels.com/photos/1302883/pexels-photo-1302883.jpeg'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: 8,
    featured: true
  },
  {
    id: '5',
    name: 'Legging Fille',
    price: 2800,
    description: 'Legging coloré et extensible pour petites filles.',
    category: 'girls',
    images: ['https://images.pexels.com/photos/1620843/pexels-photo-1620843.jpeg'],
    sizes: ['XS', 'S', 'M', 'L'],
    stock: 20,
    featured: false
  },
  {
    id: '6',
    name: 'Sac à Dos Enfant',
    price: 3500,
    description: 'Sac à dos ludique et pratique pour l\'école.',
    category: 'accessories',
    images: ['https://images.pexels.com/photos/1556654/pexels-photo-1556654.jpeg'],
    sizes: ['One Size'],
    stock: 10,
    featured: true
  }
];

export const users: User[] = [
  {
    id: '1',
    email: 'admin@zkids.com',
    name: 'Admin Z-Kids',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewlpGJm6PJKMQz8y', // 'admin123'
    isAdmin: true
  }
];

export let orders: Order[] = [];

// Utility functions
export const getProducts = (): Product[] => products;
export const getProduct = (id: string): Product | undefined => products.find(p => p.id === id);
export const getFeaturedProducts = (): Product[] => products.filter(p => p.featured);
export const getProductsByCategory = (category: string): Product[] => 
  products.filter(p => p.category === category);

export const getOrders = (): Order[] => orders;
export const addOrder = (order: Order): void => {
  orders.push(order);
};

export const getUsers = (): User[] => users;
export const getUserByEmail = (email: string): User | undefined => 
  users.find(u => u.email === email);
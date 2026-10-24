export interface Product {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  brand: string;
  price: number;
  oldPrice?: number;
  discountPercent?: number;
  unit: string;
  rating: number;
  reviewCount: number;
  image: string;
  inStock: boolean;
  isPopular?: boolean;
  description: string;
  specifications: Record<string, string>;
  weightKg?: number;
}

export interface Category {
  id: string;
  slug: string;
  title: string;
  itemCount: number;
  iconName: string;
  image: string;
  subcategories: string[];
}

export interface Master {
  id: string;
  name: string;
  specialty: string;
  specialtySlug: string;
  rating: number;
  reviewCount: number;
  experienceYears: number;
  completedJobs: number;
  hourlyOrStartingRate: string;
  location: string;
  phone: string;
  verified: boolean;
  avatar: string;
  bio: string;
  skills: string[];
  recentWorks: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info' | 'warning';
}

export type MasterSpecialty =
  | 'all'
  | 'santexnik'
  | 'elektrik'
  | 'rengsaz'
  | 'kafel'
  | 'alcipan'
  | 'briqada';

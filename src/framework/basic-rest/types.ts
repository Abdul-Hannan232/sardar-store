import { QueryKey } from '@tanstack/react-query';

export type CollectionsQueryOptionsType = {
  text?: string;
  collection?: string;
  status?: string;
  limit?: number;
};

export type CategoriesQueryOptionsType = {
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
};
export type ProductsQueryOptionsType = {
  type: string;
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
};
export type QueryOptionsType = {
  text?: string;
  category?: string;
  categoryId?:number;
  status?: string;
  limit?: number;
  id?:string;
};

export type QueryParamsType = {
  queryKey: QueryKey; 
  pageParam?: string;
};
export type Attachment = {
  id: string | number;
  thumbnail: string;
  original: string;
};
export type Category = {
  id: number | string;
  name: string;
  slug: string;
  details?: string;
  image?: Attachment;
  icon?: string;
  children?: [Category];
  products?: Product[];
  productCount?: number;
  [key: string]: unknown;
};
export type Collection = {
  id: number | string;
  name: string;
  slug: string;
  details?: string;
  image?: Attachment;
  icon?: string;
  products?: Product[];
  productCount?: number;
};
export type Brand = {
  id: number | string;
  name: string;
  slug: string;
  image?: Attachment;
  [key: string]: unknown;
};
export type Dietary = {
  id: number | string;
  name: string;
  slug: string;
  [key: string]: unknown;
};
export type Tag =string[]
// export type Tag = {
//   id: string | number;
//   name: string;
//   slug: string;
// };
export type Product = {
  id: number | string;
  name: string;
  slug?: string;
  price: number;
  promo_price_pkr:number;
  price_usd?:number;
  promo_price_usd?:number;
  quantity: number;
  sold?: number;
  unit?: string;
  sale_price?: number;
  min_price?: number;
  max_price?: number;
  image: string;
  // image: Attachment;
  sku?: string;
  // gallery?: Attachment[];
  gallery?: string;
  category?: Category;
  tag?: Tag[];
  meta?: any[];
  // brand?: Brand;
  brand?: string;
  description?: string;
  // variations?: object;
  variations?: string | object;
  [key: string]: unknown;
};
// export type OrderItem = {
//   id: number | string;
//   name?: string;
//   price: number;
//   quantity: number;
// };
// export type Order = {
//   id: string | number;
//   name: string;
//   slug: string;
//   products: OrderItem[];
//   total: number;
//   tracking_number: string;
//   customer: {
//     id: number;
//     email: string;
//   };
//   shipping_fee: number;
//   payment_gateway: string;
// };

export type ShopsQueryOptionsType = {
  text?: string;
  shop?: Shop;
  status?: string;
  limit?: number;
};

export type Shop = {
  id: string | number;
  owner_id: string | number;
  owner_name: string;
  address: string;
  phone: string;
  website: string;
  ratings: string;
  name: string;
  slug: string;
  description: string;
  cover_image: Attachment;
  logo: Attachment;
  socialShare: any;
  created_at: string;
  updated_at: string;
};


 export interface CheckoutCardProps {
  userData: {
    address: string | null;
    phone: string | null;
    id: number | null;
  };
}

export interface OrderItem {
  id?:number;
  productId: number;
  quantity: number;
  price? : number;
  productDetails?: any;
  selectedVariation?:any;
}

export interface Order {
  id? :number;
  userId: number;
  items: OrderItem[];
  totalPrice: number;
  user?:User;
  paymentMethod?: number;
  createdAt?: string;

}


export interface ContactFormValues {
  address: string | null;
  phone: string | null;
  id: number | null
}

export interface DeliveryInstructionsProps {
  initialData?: ContactFormValues;
  onUpdate: (values: ContactFormValues) => void;
}



export interface User {
  id: number;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  createdAt?: string;
  email: string;
  image?: string | null;
  name: string;
  phone?:string | null;
}

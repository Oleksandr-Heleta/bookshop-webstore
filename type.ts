export interface Billboard {
  id: string;
  label: string;
  imageUrl: string;
}

export interface Category {
  id: string;
  name: string;
  billboard: Billboard;
  value: string;
  description: string | null;
  descriptionSeo: string | null;
  titleSeo: string | null;
}

export interface Product {
  id: string;
  name: string;
  author: string | undefined;
  images: Image[];
  price: number;
  quantity: number;
  categories: ProdCategory[];
  ageGroups: ProdAgeGroup[];
  suggestionProducts: Product[];
  publishing: Publishing;
  seria: Seria;
  description: string;
  titleSheet: string;
  sheets: number;
  size: string;
  isSale: boolean;
  sale: number;
  isNew: boolean;
  isFeatured: boolean;
  isArchived: boolean;
  isLowQuantity: boolean;
  isbn: string | undefined;
  titleSeo: string | undefined;
  descriptionSeo: string | undefined;
}

export interface Image {
  id: string;
  url: string;
}

export interface AgeGroup {
  id: string;
  name: string;
  value: string;
  description: string | null;
  descriptionSeo: string | null;
  titleSeo: string | null;
}

export interface Publishing {
  id: string;
  name: string;
  value: string;
  description: string | null;
  descriptionSeo: string | null;
  titleSeo: string | null;
}

export interface Seria {
  id: string;
  name: string;
  value: string;
  description: string | null;
  descriptionSeo: string | null;
  titleSeo: string | null;
}

export interface ProdAgeGroup {
  id: string;
  ageGroupName: string;
  ageGroupId: string;
  productId: string;
}

export interface ProdCategory {
  id: string;
  categoryId: string;
  categoryName: string;
  productId: string;
}

export interface Order {
  id: string;
  orderItems: OrderItem[];
  total: number;
  name: string;
  totalPrice: number;
  orderStatus: string;
  orderState: string;
  isPaid: boolean;
  phone: string;
  address: string;
}

export interface OrderItem {
  product: Product;
  productId: string;
  quantity: number;
}

export interface Info {
  id: string;
  name: string;
  sale: number;
  mainbillboards: Billboard[];
}

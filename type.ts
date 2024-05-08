export interface Billboard {
    id: string;
    label: string;
    imageUrl: string;
  };
  
  export interface Category {
    id: string;
    name: string;
    billboard: Billboard;
  };

  export interface Product {
    id: string;
    name: string;
    images: Image[];
    price: number;
    quantity: number;
    categories: ProdCategory[];
    ageGroups: ProdAgeGroup[];
    publishing: Publishing;
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
  };

  export interface Image {
    id: string;
    url: string;
  }

  export interface AgeGroup {
    id: string
  name: string
  value: string
  };
  
  export interface Publishing {
    id: string;
    name: string;
    value: string;
  };

export interface ProdAgeGroup {
  id: string;
  ageGroupName: string;
  ageGroupId: string;
  productId: string;
};


export interface ProdCategory {
  id: string;
  categoryId: string;
  categoryName: string;
  productId: string;
};
 
export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  name: string;
  totalPrice:  number;
  orderStatus: string;
  orderState:  string; 
  isPaid: boolean;
  phone: string;
  address: string; 
};

export interface OrderItem {
 product: Product;
  productId: string;
  quantity: number;
};
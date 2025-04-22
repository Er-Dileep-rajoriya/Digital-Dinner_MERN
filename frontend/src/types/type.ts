export interface MenuItemType {
  _id: string;
  title: string;
  category: string;
  description: string;
  price: number;
  imageUrl: string;
}

export interface userType {
  id: string;
  name: string;
  email: string;
}

export interface CartItemType {
  _id: string;
  title: string;
  category: string;
  description: string;
  price: number;
  imageUrl?: string;
  quantity : number;
}


export interface OrderItem {
  title: string;
  quantity: number;
  price: number;
}

export interface OrderType {
  id : string;
  items : OrderItem[];
  totalAmount : number;
  phoneNumber : string;
  userId : string;
}

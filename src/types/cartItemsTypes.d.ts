interface CartItem {
  itemId: string;
  size: string;
  quantity: number;
}

export interface cartItemsTypes {
  email: string;
  cartItems: CartItem[];
  id: string;
}

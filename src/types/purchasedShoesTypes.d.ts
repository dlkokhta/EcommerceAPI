interface cartItems {
  itemId: string;
  size: string;
  quantity: string;
}
export interface purchasedShoesTypes {
  email: string;
  cartItems: cartItems[];
  totalAmount: string;
  id: string;
}

interface cartItems {
  itemId: string;
  size: string;
  quantity: string;
}
export interface purchasedShoesTypes {
  email: string;
  cartItems: cartItems[];
  id: string;
}

interface Size {
  size: string;
  quantity: string;
}

export interface addItemsTypes {
  brand: string;
  model: string;
  isShoesNew: boolean;
  gender: string;
  color: string;
  description: string;
  price: number;
  sizes: Size[];
  availability: boolean;
  image: string[];
  id: string;
}

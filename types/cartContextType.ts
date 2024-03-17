import { Dispatch, SetStateAction } from "react";

export type tCartContext ={
    cartItems: tCartItem[],
  setCartItems: Dispatch<SetStateAction<tCartItem[]>>,
  handleAddToCart: (e: any) => void,
  handleIncrement: (e: any) => void,
  handleDecrement: (e: any) => void,
}

export type tCartItem = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
    qty: number;
}
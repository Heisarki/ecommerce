import { Dispatch, SetStateAction } from "react";

export type tCartContext ={
    cartItems: tCartItem[],
    setCartItems: Dispatch<SetStateAction<tCartItem[]>>,
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
    quantity: number;
}
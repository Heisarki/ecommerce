import { Dispatch, SetStateAction } from "react";

export type tCartContext ={
    cartItems: tCartItem[],
  setCartItems: Dispatch<SetStateAction<tCartItem[]>>,
  handleIncrement: (e: any) => void,
  handleDecrement: (e: any) => void,
  handleConfirm: () => void,
  handleCancel: () => void,
  openRemoveItemDialog: boolean,
  currentItemToRemove: tCartItem,
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
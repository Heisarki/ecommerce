import { tCartItem } from "@/types/cartContextType";

export function getCartItemCount(cartItems: tCartItem[]) {
    return cartItems.reduce((acc: number, itemEle: tCartItem) => (acc + Number(itemEle.qty)), 0) || 0
}
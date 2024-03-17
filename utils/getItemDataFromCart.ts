import { tCartItem } from "@/types/cartContextType";

export function getItemDataFromCart(items: any, cartItems: tCartItem[]) {
    let modifiedItems = items.map((itemEle: any) => (
        {
            ...itemEle,
            qty: 0,
        }
    ))
    cartItems.forEach((itemEle: tCartItem) => {
        const id = itemEle.id
        modifiedItems = modifiedItems.map((itemEleSub: tCartItem) => {
            if (String(id) === String(itemEleSub.id))
                return { ...itemEleSub, qty: itemEle.qty }
            return {...itemEleSub}
        })
    })
    return modifiedItems
}
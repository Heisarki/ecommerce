"use client";
import { tMenuListContext, tProduct } from "@/types";
import { tCartContext, tCartItem } from "@/types/cartContextType";
import {
    createContext,
    useContext,
    Dispatch,
    SetStateAction,
    useState,
    ReactNode,
    useEffect,
} from "react";
import { useMenuListContext } from "./menuListContext";

const CartContext = createContext({} as tCartContext);

export const CartContextProvider = ({
    children
}: {
    children: ReactNode
}) => {
    const [cartItems, setCartItems] = useState([] as tCartItem[])
    const { productList, setProductList }: tMenuListContext = useMenuListContext()

    function handleAddToCart(e: any) {
        // const id = e.target.getAttribute("data-id")
        // const itemToAddToCart: tCartItem | any = productList.find((itemEle: tProduct) => String(itemEle.id) === String(id))
        // if (itemToAddToCart) {
        //     setCartItems([
        //         ...cartItems,
        //         {
        //             ...itemToAddToCart,
        //             qty: 1
        //         }
        //     ])
        //     setProductList(productList.map((itemEle: tProduct) => {
        //         if (String(itemEle.id) === String(id))
        //             return { ...itemEle, qty: 1 }
        //         return { ...itemEle }
        //     }))
        // }
    }
    function handleIncrement(e: any) {
        // const id = e.target.getAttribute("data-id")

        // setCartItems(cartItems.map((itemEle: tCartItem) => {
        //     if (String(itemEle.id) === String(id))
        //         return { ...itemEle, qty: itemEle.qty + 1 }
        //     return { ...itemEle }
        // }))
        // setProductList(productList.map((itemEle: tProduct) => {
        //     if (String(itemEle.id) === String(id))
        //         return { ...itemEle, qty: itemEle.qty + 1 }
        //     return { ...itemEle }
        // }))
    }
    function handleDecrement(e: any) {
        // const id = e.target.getAttribute("data-id")
        // const itemToAddToCart: tCartItem | any = productList.find((itemEle: tProduct) => String(itemEle.id) === String(id))
        // if (itemToAddToCart) {
        //     if (itemToAddToCart.qty === 1) {
        //         setCartItems(cartItems.filter((itemEle: tCartItem) => String(itemEle.id) !== String(id)))
        //     } else {
        //         setCartItems(cartItems.map((itemEle: tCartItem) => {
        //             if (String(itemEle.id) === String(id))
        //                 return { ...itemEle, qty: itemEle.qty - 1 }
        //             return { ...itemEle }
        //         }))
        //     }
        //     setProductList(productList.map((itemEle: tProduct) => {
        //         if (String(itemEle.id) === String(id))
        //             return { ...itemEle, qty: itemEle.qty - 1 }
        //         return { ...itemEle }
        //     }))
        // }
    }

    useEffect(() => {
        console.log(cartItems)
    }, [cartItems])

    const value = {
        cartItems, setCartItems,
        handleAddToCart,
        handleIncrement,
        handleDecrement,
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCartContext = () => useContext(CartContext);
"use client";
import { tCartContext, tCartItem } from "@/types/cartContextType";
import {
    createContext,
    useContext,
    Dispatch,
    SetStateAction,
    useState,
    ReactNode,
} from "react";

const CartContext = createContext({} as tCartContext);

export const CartContextProvider = ({
    children
}: {
    children: ReactNode
}) => {
    const [cartItems, setCartItems] = useState([] as tCartItem[])
    const value = {
        cartItems, setCartItems
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCartContext = () => useContext(CartContext);
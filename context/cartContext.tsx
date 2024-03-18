"use client";
import { tProduct } from "@/types";
import { tCartContext, tCartItem } from "@/types/cartContextType";
import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";
import ConfirmationDialog from "@/components/cart/ConfirmationDialog";

const CartContext = createContext({} as tCartContext);

export const CartContextProvider = ({
    children
}: {
    children: ReactNode
}) => {
    const [cartItems, setCartItems] = useState([] as tCartItem[])
    const [openRemoveItemDialog, setOpenRemoveItemDialog] = useState(false)
    const [currentItemToRemove, setCurrentItemToRemove] = useState({} as tCartItem)

    function handleIncrement(e: any) {
        const id = e.target.getAttribute("data-id")
        setCartItems(cartItems.map((itemEle: tCartItem) => {
            if (String(itemEle.id) === String(id))
                return { ...itemEle, qty: itemEle.qty + 1 }
            return { ...itemEle }
        }))
    }
    function handleDecrement(e: any) {
        const id = e.target.getAttribute("data-id")
        const itemToDecrement: tCartItem | any = cartItems.find((itemEle: tProduct) => String(itemEle.id) === String(id))
        if (itemToDecrement) {
            if (itemToDecrement.qty === 1) {
                setOpenRemoveItemDialog(true)
                setCurrentItemToRemove(itemToDecrement)
            } else {
                setCartItems(cartItems.map((itemEle: tCartItem) => {
                    if (String(itemEle.id) === String(id))
                        return { ...itemEle, qty: itemEle.qty - 1 }
                    return { ...itemEle }
                }))
            }
        }
    }

    function handleConfirm() {
        setOpenRemoveItemDialog(false)
        setCartItems(cartItems.filter((itemEle: tCartItem) => String(itemEle.id) !== String(currentItemToRemove.id)))
    }
    function handleCancel() {
        setOpenRemoveItemDialog(false)
    }

    useEffect(() => {
        console.log(cartItems)
    }, [cartItems])

    const value = {
        cartItems, setCartItems,
        handleIncrement,
        handleDecrement,
        handleConfirm,
        handleCancel,
        openRemoveItemDialog,
        currentItemToRemove,
    }

    return (
        <CartContext.Provider value={value}>
            <ConfirmationDialog />
            {children}
        </CartContext.Provider>
    );
};

export const useCartContext = () => useContext(CartContext);
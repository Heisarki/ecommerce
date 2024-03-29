"use client";
import { tProduct } from "@/types";
import { tCartContext, tCartItem, tPriceDetails } from "@/types/cartContextType";
import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";
import ConfirmationDialog from "@/components/cart/ConfirmationDialog";
import { initialPriceDetails } from "./cartInitialData";
import { toast } from "sonner";

const CartContext = createContext({} as tCartContext);

export const CartContextProvider = ({
    children
}: {
    children: ReactNode
}) => {
    const [cartItems, setCartItems] = useState([] as tCartItem[])
    const [openRemoveItemDialog, setOpenRemoveItemDialog] = useState(false)
    const [currentItemToRemove, setCurrentItemToRemove] = useState({} as tCartItem)
    const [priceDetails, setPriceDetails] = useState(initialPriceDetails as tPriceDetails)

    function handleIncrement(id: string | number) {
        setCartItems(cartItems.map((itemEle: tCartItem) => {
            if (String(itemEle.id) === String(id))
                return { ...itemEle, qty: itemEle.qty + 1 }
            return { ...itemEle }
        }))
    }
    function handleDecrement(id: string | number) {
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
        toast(`${currentItemToRemove.title} is removed from cart`)
    }
    function handleCancel() {
        setOpenRemoveItemDialog(false)
    }

    useEffect(() => {
        console.log(cartItems)
        const calculatedSubTotal = cartItems.reduce((acc: number, itemEle: tCartItem) => (acc + (itemEle.price * itemEle.qty)), 0)
        const calculatedGST = (calculatedSubTotal / 100) * 18
        setPriceDetails({
            subTotal: calculatedSubTotal,
            deliveryCharges: cartItems.length * 40,
            gst: calculatedGST,
            total: calculatedGST + calculatedSubTotal + cartItems.length * 40,
        })
    }, [cartItems])

    const value = {
        cartItems, setCartItems,
        handleIncrement,
        handleDecrement,
        handleConfirm,
        handleCancel,
        openRemoveItemDialog,
        currentItemToRemove,
        priceDetails,
    }

    return (
        <CartContext.Provider value={value}>
            <ConfirmationDialog />
            {children}
        </CartContext.Provider>
    );
};

export const useCartContext = () => useContext(CartContext);
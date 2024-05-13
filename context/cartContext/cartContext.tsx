"use client";
import { tAddressContext, tAddressInputData, tLoginInCreateAccountContext, tProduct } from "@/types";
import { tCartContext, tCartItem, tPriceDetails } from "@/types/cartContextType";
import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";
import ConfirmationDialog from "@/components/cart/ConfirmationDialog";
import { initialPriceDetails } from "./initialCartContextData";
import { toast } from "sonner";
import { useAddressContext } from "../addressContext/addressContext";
import { useLoginInCreateAccountContext } from "../loginCreateAccountContext/LoginCreateAccountContext";
import { saveData } from "@/api/crud";
import { COLLECTION_NAME } from "@/constants/common";
import { generateOrderNumber } from "@/utils";

const CartContext = createContext({} as tCartContext);

export const CartContextProvider = ({
    children
}: {
    children: ReactNode
}) => {
    const { isLoggedIn, handleOpenLoginDialog, userDetails }: tLoginInCreateAccountContext = useLoginInCreateAccountContext();
    const { addressList, setAddressList }: tAddressContext = useAddressContext();
    const [cartItems, setCartItems] = useState([] as tCartItem[])
    const [openRemoveItemDialog, setOpenRemoveItemDialog] = useState(false)
    const [currentItemToRemove, setCurrentItemToRemove] = useState({} as tCartItem)
    const [priceDetails, setPriceDetails] = useState(initialPriceDetails as tPriceDetails)
    const [deliveryAddress, setDeliveryAddress] = useState({} as tAddressInputData)
    const [openSelectDeliveryRadioGroup, setOpenSelectDeliveryRadioGroup] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState(addressList[1]?.id)

    const value = {
        cartItems, setCartItems,
        handleIncrement,
        handleDecrement,
        handleConfirm,
        handleCancel,
        openRemoveItemDialog,
        currentItemToRemove,
        priceDetails,
        deliveryAddress,
        handleOpenChangeDeliveryAddressClick,
        openSelectDeliveryRadioGroup, setOpenSelectDeliveryRadioGroup,
        selectedAddress,
        handleOnSelectDeliveryAddress,
        handleProceedToPayClick,
    }

    useEffect(() => {
        console.log("FROM CART", addressList)
        if (addressList.length > 0) {
            setSelectedAddress(addressList[0].id)
            const selectedAddress = addressList.find((addressEle: tAddressInputData) => addressEle.selectedDeliveryAddressFlag)
            if (!selectedAddress)
                setDeliveryAddress(addressList[0])
            else
                setDeliveryAddress(selectedAddress)
        }
    }, [addressList])

    function handleOpenChangeDeliveryAddressClick() {
        setOpenSelectDeliveryRadioGroup(true)
    }

    function handleOnSelectDeliveryAddress(e: any) {
        const id = e.target.value
        setSelectedAddress(id)
        toast("Delivery address updated!")
        setTimeout(() => {
            setOpenSelectDeliveryRadioGroup(false)
            const selectedAddress = addressList.find((addressEle: tAddressInputData) => (addressEle.id === id))
            console.log(selectedAddress, id)
            if (selectedAddress)
                setDeliveryAddress(selectedAddress)
        }, 800)
    }

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

    async function handleProceedToPayClick() {
        if (!isLoggedIn) {
            handleOpenLoginDialog();
            return
        }
        console.log(cartItems)
        const orderNumber = String(generateOrderNumber());
        const response = await saveData(
            userDetails.id,
            COLLECTION_NAME.ORDERS,
            {
                [orderNumber]: {
                    orderId: orderNumber,
                    cartItems: cartItems,
                    billing: priceDetails,
                    deliveryAddress: deliveryAddress,
                    orderDate: Date.now(),
                }
            }
        )
        if (response) {
            toast.success("Ordered placed successfully!")
            setCartItems([])
        } else {
            toast.error("Order not placed! Try again")
        }
    }

    useEffect(() => {
        console.log(cartItems)
        const calculatedSubTotal = cartItems.reduce((acc: number, itemEle: tCartItem) => (acc + (itemEle.price * itemEle.qty)), 0)
        const calculatedGST = (calculatedSubTotal / 100) * 18
        setPriceDetails({
            ...priceDetails,
            subTotal: calculatedSubTotal,
            gst: calculatedGST,
            total: calculatedGST + calculatedSubTotal + 40,
        })
    }, [cartItems])

    return (
        <CartContext.Provider value={value}>
            <ConfirmationDialog />
            {children}
        </CartContext.Provider>
    );
};

export const useCartContext = () => useContext(CartContext);
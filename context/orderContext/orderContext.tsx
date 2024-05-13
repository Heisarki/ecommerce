"use client";
import { getUserData } from "@/api/crud";
import { tLoginInCreateAccountContext, tOrderContext } from "@/types";
import {
    createContext,
    useContext,
    Dispatch,
    SetStateAction,
    useState,
    ReactNode,
    useEffect,
} from "react";
import { useLoginInCreateAccountContext } from "../loginCreateAccountContext/LoginCreateAccountContext";
import { COLLECTION_NAME } from "@/constants/common";
import { toast } from "sonner";

const OrderContext = createContext({} as tOrderContext);

export const OrderContextProvider = ({
    children
}: {
    children: ReactNode
}) => {
    const [orderList, setOrderList] = useState([])
    const { userDetails }: tLoginInCreateAccountContext = useLoginInCreateAccountContext();

    const value = {
        orderList,
        getOrderList,
    }
    async function getOrderList() {
        try {
            const response: any = await getUserData(
                userDetails.id,
                COLLECTION_NAME.ORDERS
            )
            if (response) {
                setOrderList(response)
                console.log("ORDERS DATA", response)
            }
        } catch (err: any) {
            toast.error(err)
            console.log(err)
        }

    }

    return (
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrderContext = () => useContext(OrderContext);
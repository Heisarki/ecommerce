"use client";
import { tAddressContext, tAddressInputData, tDisplayAddressForm, tLoginInCreateAccountContext } from "@/types";
import {
    createContext,
    useContext,
    Dispatch,
    SetStateAction,
    useState,
    ReactNode,
    useEffect,
} from "react";
import { initialAddressInputData, initialDisplayAddressFormData } from "./initialAddressContextData";
import { getAddressList, saveAddress, updateAddress } from "@/api/addressApi";
import { toast } from "sonner";
import { v4 } from 'uuid'
import { useLoginInCreateAccountContext } from "../loginCreateAccount/LoginCreateAccount";

const AddressContext = createContext({} as tAddressContext);

export const AddressContextProvider = ({
    children
}: {
    children: ReactNode
}) => {
    const { userDetails }: tLoginInCreateAccountContext = useLoginInCreateAccountContext();
    const [addressInputData, setAddressInputData] = useState(initialAddressInputData as tAddressInputData)
    const [addressList, setAddressList] = useState([] as tAddressInputData[])
    const [displayAddressForm, setdisplayAddressForm] = useState(initialDisplayAddressFormData as tDisplayAddressForm)

    const value = {
        addressInputData,
        handleAddressInputChange,
        handleAddressTypeInputChange,
        handleCancelSaveAddress,
        handleSaveAddress,
        addressList,
        displayAddressForm,
        handleAddNewAddressClick,
        handleEditAddressClick,
        handleSaveEditedAddressClick,
        handleCancelEditedAddressClick,
    }

    async function getAddressListFunc() {
        const response = await getAddressList(userDetails.id)
        setAddressList(response)
    }
    useEffect(() => {
        if (userDetails.id)
            getAddressListFunc();
    }, [userDetails.id])

    function handleAddressInputChange(e: any) {
        console.log(e.target.name)
        setAddressInputData({
            ...addressInputData,
            [e.target.name]: e.target.value
        })
    }

    function handleAddressTypeInputChange(e: any) {
        setAddressInputData({
            ...addressInputData,
            addressType: e.target.value
        })
    }

    function handleCancelSaveAddress() {
        setdisplayAddressForm(initialDisplayAddressFormData)
    }

    function handleAddNewAddressClick() {
        setdisplayAddressForm({
            ...displayAddressForm,
            new: true,
        })
    }

    function handleEditAddressClick(address: tAddressInputData) {
        console.log(address)
        setAddressInputData(address)
        setAddressList(addressList.map((addressEle: tAddressInputData) => {
            if (addressEle.id === address.id)
                return { ...addressEle, editAddressFlag: true }
            return { ...addressEle }
        }))
    }

    async function handleSaveEditedAddressClick() {
        const response = updateAddress(addressInputData.id, userDetails.id, addressInputData)
        if (!response) {
            toast("Something went wrong!")
            return
        }
        const tempAddressList = addressList.map((addressEle: tAddressInputData) => {
            if (addressEle.id === addressInputData.id)
                return { ...addressInputData, editAddressFlag: false }
            return { ...addressEle, editAddressFlag: false }
        })
        setAddressList(tempAddressList)
        setAddressInputData(initialAddressInputData)
    }
    function handleCancelEditedAddressClick() {
        setAddressList(addressList.map((addressEle: tAddressInputData) => (
            { ...addressEle, editAddressFlag: false }
        )))
    }

    async function handleSaveAddress() {
        const addressId = v4();
        console.log(addressId)
        const address = {
            [addressId]: {
                ...addressInputData,
                id: addressId
            }
        }
        const response = await saveAddress(userDetails.id, address);
        if (!response) {
            toast("Something went wrong!")
            return
        }
        setAddressList([
            ...addressList,
            {
                ...addressInputData,
                id: addressId,
            }

        ])
        setAddressInputData(initialAddressInputData)
        toast("Address saved successfully!")
        setdisplayAddressForm(initialDisplayAddressFormData)
    }

    useEffect(() => {
        console.log(addressInputData)
    }, [addressInputData])

    return (
        <AddressContext.Provider value={value}>
            {children}
        </AddressContext.Provider>
    );
};

export const useAddressContext = () => useContext(AddressContext);
"use client";
import { tAddressContext, tAddressInputData, tDisplayAddressForm, tLoginInCreateAccountContext } from "@/types";
import {
    createContext,
    useContext,
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
    const { userDetails, isLoggedIn }: tLoginInCreateAccountContext = useLoginInCreateAccountContext();
    const [addressInputData, setAddressInputData] = useState(initialAddressInputData as tAddressInputData)
    const [addressList, setAddressList] = useState([] as tAddressInputData[])
    const [displayAddressForm, setdisplayAddressForm] = useState(initialDisplayAddressFormData as tDisplayAddressForm)

    const value = {
        addressInputData,
        handleAddressInputChange,
        handleAddressTypeInputChange,
        handleCancelSaveNewAddressClick,
        handleSaveNewAddressClick,
        addressList, setAddressList,
        displayAddressForm,
        handleAddNewAddressClick,
        handleEditAddressClick,
        handleSaveEditedAddressClick,
        handleCancelEditedAddressClick,
        getAllAddressList,
    }

    /**
     * Clear AddressContext data when user log out
     */
    useEffect(() => {
        if (!isLoggedIn) {
            setAddressList([])
            setAddressInputData(initialAddressInputData)
            setdisplayAddressForm(initialDisplayAddressFormData)
        }
    }, [isLoggedIn])

    /**
     * Get all the address at initial load
     */
    useEffect(() => {
        if (userDetails?.id)
            getAllAddressList();
    }, [userDetails])

    /**
     * Get saved address at initial load
     */
    async function getAllAddressList() {
        setAddressList([])
        const response = await getAddressList(userDetails.id)
        console.log(response)
        const sortedAddress = response.slice().sort((a, b) => b.createdAt - a.createdAt)
        setAddressList(sortedAddress)
    }

    /**
     * Handle on input change of the Form
     */
    function handleAddressInputChange(e: any) {
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

    /**
     * Handling Addding New address
     */
    function handleAddNewAddressClick() {
        setdisplayAddressForm({
            ...displayAddressForm,
            new: true,
        })
    }
    async function handleSaveNewAddressClick() {
        const addressId = v4();
        const timestamp = Date.now()
        console.log(addressId)
        const address = {
            [addressId]: {
                ...addressInputData,
                id: addressId,
                createdAt: timestamp,
                updatedAt: timestamp,
            }
        }
        const response = await saveAddress(userDetails.id, address);
        if (!response) {
            toast("Something went wrong!")
            return
        }
        const tempAddressList: any = [
            ...addressList,
            {
                ...addressInputData,
                id: addressId,
                createdAt: timestamp,
                updatedAt: timestamp,
            }

        ]
        setAddressList(tempAddressList.slice().sort((a: any, b: any) => b.createdAt - a.createdAt))
        setAddressInputData(initialAddressInputData)
        toast("Address saved successfully!")
        setdisplayAddressForm(initialDisplayAddressFormData)
    }
    function handleCancelSaveNewAddressClick() {
        setdisplayAddressForm(initialDisplayAddressFormData)
    }


    /**
     * Handling Edit Address
     */
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
        const timestamp = Date.now()
        const addresssTobeUpdated = {
            ...addressInputData,
            updatedAt: timestamp,
        }
        const response = updateAddress(addresssTobeUpdated.id, userDetails.id, addresssTobeUpdated)
        if (!response) {
            toast("Something went wrong!")
            return
        }
        toast("Address updated successfully!")
        const tempAddressList: any = addressList.map((addressEle: tAddressInputData) => {
            if (addressEle.id === addresssTobeUpdated.id)
                return { ...addresssTobeUpdated, editAddressFlag: false }
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

    /**
     * Handing Deleting Saved address
     */

    return (
        <AddressContext.Provider value={value}>
            {children}
        </AddressContext.Provider>
    );
};

export const useAddressContext = () => useContext(AddressContext);
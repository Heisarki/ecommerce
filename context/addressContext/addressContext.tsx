"use client";
import { tAddressContext, tAddressInputData, tDisplayAddressForm, tLoginInCreateAccountContext } from "@/types";
import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";
import { initialAddressInputFormData, initialDisplayAddressFormData } from "./initialAddressContextData";
import { toast } from "sonner";
import { v4 } from 'uuid'
import { useLoginInCreateAccountContext } from "../loginCreateAccountContext/LoginCreateAccountContext";
import { useForm } from "react-hook-form";
import { getUserData, saveData, updateData } from "@/api/crud";
import { COLLECTION_NAME } from "@/constants/common";

const AddressContext = createContext({} as tAddressContext);

export const AddressContextProvider = ({
    children
}: {
    children: ReactNode
}) => {
    const { userDetails, isLoggedIn }: tLoginInCreateAccountContext = useLoginInCreateAccountContext();
    // const [addressInputData, setAddressInputData] = useState(initialAddressInputData as tAddressInputData)
    const {
        register: addressInputFormData,
        handleSubmit: handleSubmitAddressFormData,
        formState: { errors: addressInputFormErrorsData },
        setValue: setAddressInputData,
        watch: watchAddressInputData,
        reset: resetAddressInputData,
    } = useForm<tAddressInputData>({
        defaultValues: initialAddressInputFormData
    })
    const [addressList, setAddressList] = useState([] as tAddressInputData[])
    const [displayAddressForm, setdisplayAddressForm] = useState(initialDisplayAddressFormData as tDisplayAddressForm)

    const value = {
        addressInputFormData,
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

        handleSubmitAddressFormData,
        addressInputFormErrorsData,
    }

    /**
     * Clear AddressContext data when user log out
     */
    useEffect(() => {
        if (!isLoggedIn) {
            setAddressList([])
            resetAddressInputData();
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
        const response = await getUserData(userDetails.id, COLLECTION_NAME.ADDRESS)
        console.log(response)
        const sortedAddress = response.slice().sort((a, b) => b.createdAt - a.createdAt)
        setAddressList(sortedAddress)
    }

    /**
     * Handle on input change of the Form
     */
    function handleAddressTypeInputChange(e: any) {
        // setAddressInputData({
        //     ...addressInputData,
        //     addressType: e.target.value
        // })
    }

    /**
     * Handling Addding New address
     */
    function handleAddNewAddressClick() {
        // close all edited address
        setAddressList(addressList.map((addressEle: tAddressInputData) => {
            return { ...addressEle, editAddressFlag: false }
        }))
        // reset input form
        resetAddressInputData();
        setdisplayAddressForm({
            ...displayAddressForm,
            new: true,
        })
    }
    async function handleSaveNewAddressClick(data: tAddressInputData) {
        const addressId = v4();
        const timestamp = Date.now()
        console.log(addressId)
        const address = {
            [addressId]: {
                ...data,
                id: addressId,
                createdAt: timestamp,
                updatedAt: timestamp,
            }
        }
        const response = await saveData(userDetails.id, COLLECTION_NAME.ADDRESS, address);
        if (!response) {
            toast("Something went wrong!")
            return
        }
        const tempAddressList: any = [
            ...addressList,
            {
                ...data,
                id: addressId,
                createdAt: timestamp,
                updatedAt: timestamp,
            }

        ]
        setAddressList(tempAddressList.slice().sort((a: any, b: any) => b.createdAt - a.createdAt))
        resetAddressInputData();
        toast("Address saved successfully!")
        setdisplayAddressForm(initialDisplayAddressFormData)
    }
    function handleCancelSaveNewAddressClick() {
        setdisplayAddressForm(initialDisplayAddressFormData)
    }


    /**
     * Handling Edit Address
     */
    function handleEditAddressClick(address: any) {
        // close new address form
        setdisplayAddressForm({
            ...displayAddressForm,
            new: false,
        })
        // set the current address data for editing
        Object.keys(address).forEach((key: any) => {
            setAddressInputData(key, address[key]);
        });
        // Change the edited state of the selected address to be edited to open the edit address form
        setAddressList(addressList.map((addressEle: tAddressInputData) => {
            if (addressEle.id === address.id)
                return { ...addressEle, editAddressFlag: true }
            return { ...addressEle }
        }))
    }
    async function handleSaveEditedAddressClick(data: tAddressInputData) {
        const timestamp = Date.now()
        const addresssTobeUpdated = {
            ...data,
            updatedAt: timestamp,
        }
        const response = updateData(
            userDetails.id,
            COLLECTION_NAME.ADDRESS,
            {
                [data.id]: addresssTobeUpdated
            }
        )
        if (!response) {
            toast("Something went wrong!")
            return
        }
        toast("Address updated successfully!")
        const tempAddressList: any = addressList.map((addressEle: tAddressInputData) => {
            if (addressEle.id === data.id)
                return { ...data, editAddressFlag: false }
            return { ...addressEle, editAddressFlag: false }
        })
        setAddressList(tempAddressList)
        resetAddressInputData();
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
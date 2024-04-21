import { Dispatch } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

export type tAddressContext = {
    addressInputFormData: UseFormRegister<tAddressInputData>;
    handleAddressTypeInputChange: (e: any) => void;
    handleSaveNewAddressClick: (data: any) => void;
    handleCancelSaveNewAddressClick: () => void;
    addressList: tAddressInputData[];
    setAddressList: any,
    displayAddressForm: tDisplayAddressForm;
    handleAddNewAddressClick: () => void;
    handleEditAddressClick: (address: any) => void;
    handleSaveEditedAddressClick: (data: any) => void;
    handleCancelEditedAddressClick: () => void;
    getAllAddressList: () => void;

    handleSubmitAddressFormData: any,
    addressInputFormErrorsData: FieldErrors<tAddressInputData>,
}

export type tAddressInputData = {
    id: string;
    name: string;
    phoneNumber: string;
    pinCode: string;
    areaAndStreet: string;
    cityDistrictTown: string;
    state: string;
    landmark: string;
    altPhoneNumber: string;
    addressType: string;
    editAddressFlag: boolean;
    createdAt: string,
    updatedAt: string;
    selectedDeliveryAddressFlag: boolean;
}

export type tDisplayAddressForm = {
    new: boolean;
    edit: boolean;
}
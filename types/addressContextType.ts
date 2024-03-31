import { Dispatch } from "react";

export type tAddressContext = {
    addressInputData: tAddressInputData;
    handleAddressInputChange: (e: any) => void;
    handleAddressTypeInputChange: (e: any) => void;
    handleSaveNewAddressClick: () => void;
    handleCancelSaveNewAddressClick: () => void;
    addressList: tAddressInputData[];
    setAddressList: any,
    displayAddressForm: tDisplayAddressForm;
    handleAddNewAddressClick: () => void;
    handleEditAddressClick: (address: tAddressInputData) => void;
    handleSaveEditedAddressClick: () => void;
    handleCancelEditedAddressClick: () => void;
    getAllAddressList: () => void;
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
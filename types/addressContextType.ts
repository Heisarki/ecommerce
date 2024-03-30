export type tAddressContext = {
    addressInputData: tAddressInputData;
    // handleAddressInputNameChange: (e: any) => void;
    // handleAddressInputPhoneNoChange: (e: any) => void;
    handleAddressInputChange: (e: any) => void;
    handleAddressTypeInputChange: (e: any) => void;
    handleSaveAddress: () => void;
    handleCancelSaveAddress: () => void;
    addressList: tAddressInputData[];
    displayAddressForm: tDisplayAddressForm;
    handleAddNewAddressClick: () => void;
    handleEditAddressClick: (address: tAddressInputData) => void;
    handleSaveEditedAddressClick: () => void;
    handleCancelEditedAddressClick: () => void;
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
}

export type tDisplayAddressForm = {
    new: boolean;
    edit: boolean;
}
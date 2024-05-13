"use client"
import React, { useEffect } from 'react'
import AddressInput from '../shared/AddressInput'
import { Card } from '../ui/Card'
import AddressItem from './AddressItem'
import { Button } from '../ui/Button'
import { useAddressContext } from '@/context/addressContext/addressContext'
import { tAddressInputData, tLoginInCreateAccountContext } from '@/types'
import { useLoginInCreateAccountContext } from '@/context/loginCreateAccountContext/LoginCreateAccountContext'

export default function Address() {
    const {
        getAllAddressList,
        addressList,
        handleAddNewAddressClick, handleEditAddressClick,
        displayAddressForm,
        addressInputFormData,
        handleAddressTypeInputChange,
        handleCancelSaveNewAddressClick, handleSaveNewAddressClick,
        handleSaveEditedAddressClick, handleCancelEditedAddressClick,
        addressInputFormErrorsData,
    } = useAddressContext();
    const { userDetails }: tLoginInCreateAccountContext = useLoginInCreateAccountContext();
    useEffect(() => {
        if (userDetails?.id)
            getAllAddressList();
    }, [userDetails])
    return (
        <div className='flex flex-col gap-[1rem]'>
            <Button
                variant={"ghost"}
                className='w-max'
                onClick={handleAddNewAddressClick}
            >
                Add New Address
            </Button>
            {
                displayAddressForm.new &&
                <Card className='md:p-[2rem] p-[1rem]'>
                    <AddressInput
                        formData={addressInputFormData}
                        // onInputChange={handleAddressInputChange}
                        onRadioChange={handleAddressTypeInputChange}
                        onSaveClick={handleSaveNewAddressClick}
                        onCancelClick={handleCancelSaveNewAddressClick}
                        errors={addressInputFormErrorsData}
                    />
                </Card>
            }
            {
                addressList.map((addressEle: tAddressInputData) => (
                    <Card className='md:p-[2rem] p-[1rem]' key={addressEle.id}>
                        {
                            addressEle.editAddressFlag
                                ? <AddressInput
                                    formData={addressInputFormData}
                                    // onInputChange={handleAddressInputChange}
                                    onRadioChange={handleAddressTypeInputChange}
                                    onSaveClick={handleSaveEditedAddressClick}
                                    onCancelClick={handleCancelEditedAddressClick}
                                    errors={addressInputFormErrorsData}
                                />
                                : <AddressItem address={addressEle} handleEditClick={() => handleEditAddressClick(addressEle)} />
                        }
                    </Card>
                ))
            }
        </div>
    )
}

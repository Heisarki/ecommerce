"use client"
import React from 'react'
import AddressInput from '../shared/AddressInput'
import { Card } from '../ui/Card'
import AddressItem from './AddressItem'
import { Button } from '../ui/Button'
import { useAddressContext } from '@/context/addressContext/addressContext'
import { tAddressInputData } from '@/types'

export default function Address() {
    const {
        addressList,
        handleAddNewAddressClick, handleEditAddressClick,
        displayAddressForm,
        addressInputData,
        handleAddressInputChange, handleAddressTypeInputChange,
        handleCancelSaveAddress, handleSaveAddress,
        handleSaveEditedAddressClick, handleCancelEditedAddressClick,
    } = useAddressContext();
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
                        formData={addressInputData}
                        onInputChange={handleAddressInputChange}
                        onRadioChange={handleAddressTypeInputChange}
                        onSaveClick={handleSaveAddress}
                        onCancelClick={handleCancelSaveAddress}
                    />
                </Card>
            }
            {
                addressList.map((addressEle: tAddressInputData) => (
                    <Card className='md:p-[2rem] p-[1rem]' key={addressEle.id}>
                        {
                            addressEle.editAddressFlag
                                ? <AddressInput
                                    formData={addressInputData}
                                    onInputChange={handleAddressInputChange}
                                    onRadioChange={handleAddressTypeInputChange}
                                    onSaveClick={handleSaveEditedAddressClick}
                                    onCancelClick={handleCancelEditedAddressClick}
                                />
                                : <AddressItem address={addressEle} handleEditClick={() => handleEditAddressClick(addressEle)} />
                        }
                    </Card>
                ))
            }
        </div>
    )
}

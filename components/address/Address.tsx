"use client"
import React, { useEffect } from 'react'
import AddressInput from '../shared/AddressInput'
import { Card } from '../ui/Card'
import AddressItem from './AddressItem'
import { Button } from '../ui/Button'
import { useAddressContext } from '@/context/addressContext/addressContext'
import { tAddressInputData, tLoginInCreateAccountContext } from '@/types'
import { useLoginInCreateAccountContext } from '@/context/loginCreateAccount/LoginCreateAccount'

export default function Address() {
    const {
        getAllAddressList,
        addressList,
        handleAddNewAddressClick, handleEditAddressClick,
        displayAddressForm,
        addressInputData,
        handleAddressInputChange, handleAddressTypeInputChange,
        handleCancelSaveNewAddressClick, handleSaveNewAddressClick,
        handleSaveEditedAddressClick, handleCancelEditedAddressClick,
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
                        formData={addressInputData}
                        onInputChange={handleAddressInputChange}
                        onRadioChange={handleAddressTypeInputChange}
                        onSaveClick={handleSaveNewAddressClick}
                        onCancelClick={handleCancelSaveNewAddressClick}
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

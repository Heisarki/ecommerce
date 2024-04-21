"use client"
import React, { useEffect, useState } from 'react'
import { tAddressContext, tAddressInputData, tCartContext } from '@/types'
import { Button } from '../ui/Button'
import { useCartContext } from '@/context/cartContext/cartContext'
import { useAddressContext } from '@/context/addressContext/addressContext'
import { RadioGroup, RadioGroupItem } from '../ui/RadioGroup'
import ClickRipple from '../ui/ClickRipple'

export default function DeliveryAddress() {
    const {
        selectedAddress,
        handleOnSelectDeliveryAddress,
        openSelectDeliveryRadioGroup, setOpenSelectDeliveryRadioGroup,
        deliveryAddress,
        handleOpenChangeDeliveryAddressClick,
    }: tCartContext = useCartContext();
    const {
        addressList
    }: tAddressContext = useAddressContext();
    useEffect(() => {
        setOpenSelectDeliveryRadioGroup(false)
    }, [])

    if (JSON.stringify(deliveryAddress) === "{}")
        return (
            <></>
        )
    return (
        <>
            {
                openSelectDeliveryRadioGroup
                    ? <div className='flex flex-col gap-[1rem] max-h-[50dvh] overflow-auto mr-[-0.8rem] relative'>
                        <h1 className='sticky top-0 bg-card pb-[0.5rem] z-20'>Select delivery address</h1>
                        <RadioGroup
                            name='deliveryAddress'
                            value={selectedAddress}
                            className='flex gap-[1rem] flex-col'
                            onClick={handleOnSelectDeliveryAddress}
                        >
                            {
                                addressList.map((addressEle: tAddressInputData) => (
                                    <div className='flex flex-row gap-[0.5rem] border px-[1rem] p-[0.5rem] rounded-xl bg-secondary mr-[0.5rem] relative overflow-hidden' key={addressEle.id}>
                                        {/* <ClickRipple /> */}
                                        <RadioGroupItem className='mt-[0.5rem]' value={addressEle.id} id={addressEle.id} />
                                        <label className='absolute top-0 left-0 bottom-0 right-0 cursor-pointer' htmlFor={addressEle.id}></label>
                                        <div className='flex flex-col gap-[0.5rem]'>
                                            <div className='flex gap-[1rem] justify-between items-center'>
                                                <h1 className='capitalize bg-secondary border border-destructive max-w-max px-[0.8rem] py-[0.4rem] rounded-md text-xs font-semibold'>{addressEle?.addressType}</h1>
                                            </div>
                                            <div className='flex gap-[1rem] text-sm'>
                                                <h1 className='font-bold text-sm'>{addressEle?.name}</h1>
                                                <h1>{addressEle?.phoneNumber}</h1>
                                            </div>
                                            <div>
                                                <p className='font-light text-sm'>{addressEle?.areaAndStreet + " " + addressEle?.cityDistrictTown + ", " + addressEle?.state} - <span className='font-semibold'>{addressEle?.pinCode}</span></p>
                                            </div>
                                        </div >
                                    </div >
                                ))
                            }
                        </RadioGroup >
                    </div >
                    : <div className='flex flex-col gap-[0.5rem]'>
                        <div className='flex gap-[1rem] justify-between items-center'>
                            <h1 className='capitalize bg-secondary max-w-max px-[0.8rem] py-[0.4rem] rounded-md text-xs font-semibold'>{deliveryAddress?.addressType}</h1>
                            <Button variant={"secondary"} onClick={handleOpenChangeDeliveryAddressClick}>
                                Change
                            </Button>

                        </div>
                        <div className='flex gap-[1rem] text-sm'>
                            <h1 className='font-bold text-sm'>{deliveryAddress?.name}</h1>
                            <h1>{deliveryAddress?.phoneNumber}</h1>
                        </div>
                        <div>
                            <p className='font-light text-sm'>{deliveryAddress?.areaAndStreet + " " + deliveryAddress?.cityDistrictTown + ", " + deliveryAddress?.state} - <span className='font-semibold'>{deliveryAddress?.pinCode}</span></p>
                        </div>
                    </div >
            }
        </>

    )
}

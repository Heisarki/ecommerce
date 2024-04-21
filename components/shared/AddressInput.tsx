"use client"
import React from 'react'
import { Button } from '../ui/Button'
import Input from '../ui/Input'
import { RadioGroup, RadioGroupItem } from '../ui/RadioGroup'
import { tAddressContext, tAddressInputData } from '@/types'
import { useAddressContext } from '@/context/addressContext/addressContext'

export default function AddressInput({
    formData,
    onInputChange,
    onSaveClick,
    onCancelClick,
    onRadioChange,
}: {
    formData: tAddressInputData,
    onInputChange: (e: any) => void,
    onSaveClick: () => void,
    onCancelClick: () => void,
    onRadioChange: (e: any) => void,
}) {
    return (
        <div className='w-full flex justify-center'>
            <div className='max-w-[40rem] w-full flex flex-col gap-[1rem]'>
                <div className='w-full '>
                    <div className='flex gap-[1rem] md:flex-row flex-col'>
                        <div className='w-full flex flex-col gap-[0.5rem]'>
                            <label>Name</label>
                            <Input
                                name="name"
                                placeholder='John Doe'
                                value={formData.name}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className='w-full flex flex-col gap-[0.5rem]'>
                            <label>10-digit mobile number</label>
                            <Input
                                name="phoneNumber"
                                placeholder='1234567890'
                                value={formData.phoneNumber}
                                onChange={onInputChange}
                            />
                        </div>
                    </div>
                </div>
                <div className='w-full md:flex-row flex-col'>
                    <div className='w-full flex flex-col gap-[0.5rem]'>
                        <label>Pincode</label>
                        <Input
                            name="pinCode"
                            placeholder='123456'
                            value={formData.pinCode}
                            onChange={onInputChange}
                        />
                    </div>
                </div>
                <div className='w-full md:flex-row flex-col'>
                    <div className='w-full flex flex-col gap-[0.5rem]'>
                        <label>Address (Area and Street)</label>
                        <textarea
                            name="areaAndStreet"
                            className='rounded-md p-[0.5rem] text-xs'
                            placeholder='Salvadore Villa, Kuloor Ferry Road, Chilmbi, Urwa'
                            value={formData.areaAndStreet}
                            onChange={onInputChange}
                        />
                    </div>
                </div>
                <div className='w-full '>
                    <div className='flex gap-[1rem] md:flex-row flex-col'>
                        <div className='w-full flex flex-col gap-[0.5rem]'>
                            <label>City/District/Town</label>
                            <Input
                                name="cityDistrictTown"
                                placeholder='Shillong'
                                value={formData.cityDistrictTown}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className='w-full flex flex-col gap-[0.5rem]'>
                            <label>State</label>
                            <Input
                                name="state"
                                placeholder='Meghalaya'
                                value={formData.state}
                                onChange={onInputChange}
                            />
                        </div>
                    </div>
                </div>
                <div className='w-full '>
                    <div className='flex gap-[1rem] md:flex-row flex-col'>
                        <div className='w-full flex flex-col gap-[0.5rem]'>
                            <label>Landmark (Optional)</label>
                            <Input
                                name="landmark"
                                value={formData.landmark}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className='w-full flex flex-col gap-[0.5rem]'>
                            <label>Alternate Phone (Optional)</label>
                            <Input
                                name="altPhoneNumber"
                                value={formData.altPhoneNumber}
                                onChange={onInputChange}
                            />
                        </div>
                    </div>
                </div>
                <div className='w-full md:flex-row flex-col'>
                    <div className='w-full flex flex-col gap-[0.5rem]'>
                        <label>Address Type</label>
                        <RadioGroup
                            name='addressType'
                            value={formData.addressType}
                            className='flex gap-[1rem]'
                            onClick={onRadioChange}
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="home" id="r1" />
                                <label htmlFor="r1">Home</label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="office" id="r2" />
                                <label htmlFor="r2">Office</label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>
                <div className='w-full flex gap-[1rem] justify-end'>
                    <Button onClick={onSaveClick}>
                        Save
                    </Button>
                    <Button variant={"secondary"} onClick={onCancelClick}>
                        Cancel
                    </Button>
                </div>
            </div>
        </div >
    )
}

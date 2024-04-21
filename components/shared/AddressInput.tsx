"use client"
import React from 'react'
import { Button } from '../ui/Button'
import Input from '../ui/Input'
import { RadioGroup, RadioGroupItem } from '../ui/RadioGroup'
import { tAddressContext, tAddressInputData } from '@/types'
import { useAddressContext } from '@/context/addressContext/addressContext'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import Required from '../ui/Required'

export default function AddressInput({
    formData,
    onSaveClick,
    onCancelClick,
    onRadioChange,
    errors,
}: {
    formData: UseFormRegister<tAddressInputData>,
    onSaveClick: (data: any) => void,
    onCancelClick: () => void,
    onRadioChange: (e: any) => void,
    errors: FieldErrors<tAddressInputData>,
}) {
    const { handleSubmitAddressFormData }: tAddressContext = useAddressContext();
    return (
        <div className='w-full flex justify-center'>
            <form onSubmit={handleSubmitAddressFormData(onSaveClick)} className='max-w-[40rem] w-full flex flex-col gap-[1rem]'>
                <div className='w-full '>
                    <div className='flex gap-[1rem] md:flex-row flex-col'>
                        <div className='w-full flex flex-col gap-[0.5rem]'>
                            <label>Name</label>
                            <Input
                                name="name"
                                placeholder='John Doe'
                                inputRegister={formData("name", { required: true })}
                            />
                            {errors.name && <Required />}
                        </div>
                        <div className='w-full flex flex-col gap-[0.5rem]'>
                            <label>10-digit mobile number</label>
                            <Input
                                name="phoneNumber"
                                placeholder='1234567890'
                                inputRegister={formData("phoneNumber", { required: true })}
                            />
                            {errors.phoneNumber && <Required />}
                        </div>
                    </div>
                </div>
                <div className='w-full md:flex-row flex-col'>
                    <div className='w-full flex flex-col gap-[0.5rem]'>
                        <label>Pincode</label>
                        <Input
                            name="pinCode"
                            placeholder='123456'
                            inputRegister={formData("pinCode", { required: true })}
                        />
                        {errors.pinCode && <Required />}
                    </div>
                </div>
                <div className='w-full md:flex-row flex-col'>
                    <div className='w-full flex flex-col gap-[0.5rem]'>
                        <label>Address (Area and Street)</label>
                        <textarea
                            // name="areaAndStreet"
                            className='rounded-md p-[0.5rem] text-xs'
                            placeholder='Salvadore Villa, Kuloor Ferry Road, Chilmbi, Urwa'
                            {...formData("areaAndStreet", { required: true })}
                        />
                        {errors.areaAndStreet && <Required />}
                    </div>
                </div>
                <div className='w-full '>
                    <div className='flex gap-[1rem] md:flex-row flex-col'>
                        <div className='w-full flex flex-col gap-[0.5rem]'>
                            <label>City/District/Town</label>
                            <Input
                                name="cityDistrictTown"
                                placeholder='Shillong'
                                inputRegister={formData("cityDistrictTown", { required: true })}
                            />
                            {errors.cityDistrictTown && <Required />}
                        </div>
                        <div className='w-full flex flex-col gap-[0.5rem]'>
                            <label>State</label>
                            <Input
                                name="state"
                                placeholder='Meghalaya'
                                inputRegister={formData("state", { required: true })}
                            />
                            {errors.state && <Required />}
                        </div>
                    </div>
                </div>
                <div className='w-full '>
                    <div className='flex gap-[1rem] md:flex-row flex-col'>
                        <div className='w-full flex flex-col gap-[0.5rem]'>
                            <label>Landmark (Optional)</label>
                            <Input
                                name="landmark"
                                inputRegister={formData("landmark")}
                            />
                        </div>
                        <div className='w-full flex flex-col gap-[0.5rem]'>
                            <label>Alternate Phone (Optional)</label>
                            <Input
                                name="altPhoneNumber"
                                inputRegister={formData("altPhoneNumber")}
                            />
                        </div>
                    </div>
                </div>
                <div className='w-full md:flex-row flex-col'>
                    <div className='w-full flex flex-col gap-[0.5rem]'>
                        <label>Address Type</label>
                        <RadioGroup
                            name='addressType'
                            className='flex gap-[1rem]'
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
                    <Button type='submit'>
                        Save
                    </Button>
                    <Button variant={"secondary"} onClick={onCancelClick}>
                        Cancel
                    </Button>
                </div>
            </form>
        </div >
    )
}

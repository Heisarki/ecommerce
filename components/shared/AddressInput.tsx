import React from 'react'
import { Button } from '../ui/Button'
import Input from '../ui/Input'
import { RadioGroup, RadioGroupItem } from '../ui/RadioGroup'

export default function AddressInput() {
    return (
        <div className='w-full flex justify-center'>
            <div className='max-w-[40rem] w-full flex flex-col gap-[1rem]'>
                <div className='w-full '>
                    <div className='flex gap-[1rem] md:flex-row flex-col'>
                        <div className='w-full flex flex-col gap-[0.5rem]'>
                            <label>Name</label>
                            <Input
                                placeholder='John Doe'
                            />
                        </div>
                        <div className='w-full flex flex-col gap-[0.5rem]'>
                            <label>10-digit mobile number</label>
                            <Input
                                placeholder='1234567890'
                            />
                        </div>
                    </div>
                </div>
                <div className='w-full md:flex-row flex-col'>
                    <div className='w-full flex flex-col gap-[0.5rem]'>
                        <label>Pincode</label>
                        <Input
                            placeholder='123456'
                        />
                    </div>
                </div>
                <div className='w-full md:flex-row flex-col'>
                    <div className='w-full flex flex-col gap-[0.5rem]'>
                        <label>Address (Area and Street)</label>
                        <textarea
                            className='rounded-md p-[0.5rem] text-xs'
                            placeholder='Salvadore Villa, Kuloor Ferry Road, Chilmbi, Urwa'
                        />
                    </div>
                </div>
                <div className='w-full '>
                    <div className='flex gap-[1rem] md:flex-row flex-col'>
                        <div className='w-full flex flex-col gap-[0.5rem]'>
                            <label>City/District/Town</label>
                            <Input
                                placeholder='Shillong'
                            />
                        </div>
                        <div className='w-full flex flex-col gap-[0.5rem]'>
                            <label>State</label>
                            <Input
                                placeholder='Meghalaya'
                            />
                        </div>
                    </div>
                </div>
                <div className='w-full '>
                    <div className='flex gap-[1rem] md:flex-row flex-col'>
                        <div className='w-full flex flex-col gap-[0.5rem]'>
                            <label>Landmark (Optional)</label>
                            <Input />
                        </div>
                        <div className='w-full flex flex-col gap-[0.5rem]'>
                            <label>Alternate Phone (Optional)</label>
                            <Input />
                        </div>
                    </div>
                </div>
                <div className='w-full md:flex-row flex-col'>
                    <div className='w-full flex flex-col gap-[0.5rem]'>
                        <label>Address Type</label>
                        <RadioGroup defaultValue="office" className='flex gap-[1rem]'>
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
                    <Button>
                        Save
                    </Button>
                    <Button variant={"secondary"}>
                        Cancel
                    </Button>
                </div>
            </div>
        </div >
    )
}

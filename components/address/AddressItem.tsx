"use client"
import { ThreeDotIcon } from '@/constants'
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/DropDownMenu"
import { tAddressInputData } from '@/types'

export default function AddressItem({
    address,
    handleEditClick }: {
        address: tAddressInputData,
        handleEditClick: () => void
    }) {
    return (
        <div className='flex flex-col gap-[0.5rem]'>
            <div className='flex gap-[1rem] justify-between items-center'>
                <h1 className='capitalize bg-secondary max-w-max px-[0.8rem] py-[0.4rem] rounded-md text-xs font-semibold'>{address?.addressType}</h1>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className='cursor-default md:cursor-pointer p-[1rem]pr-[0rem]'>
                            <ThreeDotIcon size={"0.8rem"} />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={handleEditClick}>
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { }}>
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
            <div className='flex gap-[1rem] text-sm'>
                <h1 className='font-bold text-sm'>{address?.name}</h1>
                <h1>{address?.phoneNumber}</h1>
            </div>
            <div>
                <p className='font-light text-sm'>{address?.areaAndStreet + " " + address?.cityDistrictTown + ", " + address?.state} - <span className='font-semibold'>{address?.pinCode}</span></p>
            </div>
        </div >
    )
}

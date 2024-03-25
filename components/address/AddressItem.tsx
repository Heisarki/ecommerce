"use client"
import { ThreeDotIcon } from '@/constants'
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/DropDownMenu"

export default function AddressItem() {
    return (
        <div className='flex flex-col gap-[0.5rem]'>
            <div className='flex gap-[1rem] justify-between items-center'>
                <h1 className='bg-secondary max-w-max px-[0.8rem] py-[0.5rem] rounded-md'>Office</h1>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className='cursor-default md:cursor-pointer p-[1rem]pr-[0rem]'>
                            <ThreeDotIcon />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => { }}>
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { }}>
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
            <div className='flex gap-[1rem]'>
                <h1 className='font-bold'>Budki War</h1>
                <h1>8119004026</h1>
            </div>
            <div>
                <p className='font-light'>5, Shree nagar main road , behind Spanish garden near midland hospital, Guwahati, Assam - <span className='font-bold'>781006</span></p>
            </div>

        </div>
    )
}

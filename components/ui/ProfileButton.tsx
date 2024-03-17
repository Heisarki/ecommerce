"use client"
import React from 'react'
import { CgProfile } from "react-icons/cg";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import { CiLogout } from "react-icons/ci";
import { GoGear } from "react-icons/go";
import { PiAddressBookLight } from "react-icons/pi";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/DropDownMenu"

export default function ProfileButton() {
    const { setTheme } = useTheme()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {/* <Button variant="ghost" size="sm">
                    <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button> */}
                <div className='flex items-center gap-1 p-1 px-4 rounded-2xl md:cursor-pointer  hover:bg-secondary/25'>
                    {/* <Profile /> */}
                    <CgProfile />
                    You
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("system")} className='flex gap-[0.5rem]'>
                    <CgProfile />Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")} className='flex gap-[0.5rem]'>
                    <PiAddressBookLight /> Address
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")} className='flex gap-[0.5rem]'>
                    <GoGear /> Setting
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")} className='flex gap-[0.5rem]'>
                    <CiLogout /> Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

"use client"
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/DropDownMenu"
import { AddressIcon, LogoutIcon, ProfileIcon, SettingIcon } from '@/constants/icons';
import { ModeToggle } from './ModeToggle';

export default function ProfileButton() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {/* <Button variant="ghost" size="sm">
                    <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button> */}
                <div className='flex items-center gap-1 p-1 px-4 rounded-2xl md:cursor-pointer  hover:bg-secondary/25'>
                    <ProfileIcon />
                    <h1 className='text-sm'>You</h1>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => { }} className='flex gap-[0.5rem]'>
                    <ProfileIcon />Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { }} className='flex gap-[0.5rem]'>
                    <AddressIcon /> Address
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { }} className='flex gap-[0.5rem]'>
                    <SettingIcon /> Setting
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { }} className='flex gap-[0.5rem]'>
                    <LogoutIcon /> Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

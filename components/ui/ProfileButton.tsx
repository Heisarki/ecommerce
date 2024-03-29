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
import { tLoginInCreateAccountContext } from '@/types';
import { useLoginInCreateAccountContext } from '@/context/loginCreateAccount/LoginCreateAccount';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/common';

export default function ProfileButton() {
    const { handleLogout, isLoggedIn, handleOpenLoginDialog }: tLoginInCreateAccountContext = useLoginInCreateAccountContext();
    const router = useRouter();
    return (
        <DropdownMenu>
            {
                isLoggedIn
                    ? <DropdownMenuTrigger asChild>
                        <div className='flex items-center gap-1 p-1 px-4 rounded-2xl md:cursor-pointer  hover:bg-secondary/25'>
                            <ProfileIcon />
                            <h1 className='text-sm'>
                                You
                            </h1>
                        </div>
                    </DropdownMenuTrigger>
                    : <div
                        onClick={handleOpenLoginDialog}
                        className='flex items-center gap-1 p-1 px-4 rounded-2xl md:cursor-pointer  hover:bg-secondary/25'
                    >
                        <ProfileIcon />
                        <h1 className='text-sm'>
                            Log in
                        </h1>
                    </div>

            }
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => router.push(ROUTES.profile.route)} className='flex gap-[0.5rem]'>
                    <ProfileIcon />Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push(ROUTES.address.route)} className='flex gap-[0.5rem]'>
                    <AddressIcon /> Address
                </DropdownMenuItem>
                {/* <DropdownMenuItem onClick={() => router.push()} className='flex gap-[0.5rem]'>
                    <SettingIcon /> Setting
                </DropdownMenuItem> */}
                <DropdownMenuItem onClick={handleLogout} className='flex gap-[0.5rem]'>
                    <LogoutIcon /> Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

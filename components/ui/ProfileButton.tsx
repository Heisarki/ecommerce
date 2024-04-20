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
import { ROUTES } from '@/constants/common';
import useNavigateTo from '@/hooks/useNavigateTo';

export default function ProfileButton() {
    const { handleLogout, isLoggedIn, handleOpenLoginDialog }: tLoginInCreateAccountContext = useLoginInCreateAccountContext();
    const { navigate } = useNavigateTo()
    async function handleNavToProfile() {
        navigate(ROUTES.profile.route)
    }
    async function handleNavToAddress() {
        navigate(ROUTES.address.route);
    }
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
                <DropdownMenuItem onClick={handleNavToProfile} className='flex gap-[0.5rem]'>
                    <ProfileIcon />Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleNavToAddress} className='flex gap-[0.5rem]'>
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

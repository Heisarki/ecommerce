"use client"
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/DropDownMenu"
import { AddressIcon, LogoutIcon, OrdersIcon, ProfileIcon, SettingIcon } from '@/constants/icons';
import { ModeToggle } from './ModeToggle';
import { tLoginInCreateAccountContext } from '@/types';
import { ROUTES } from '@/constants/common';
import useNavigateTo from '@/hooks/useNavigateTo';
import { useLoginInCreateAccountContext } from '@/context/loginCreateAccountContext/LoginCreateAccountContext';

export default function ProfileButton() {
    const { handleLogout, isLoggedIn, handleOpenLoginDialog, userDetails }: tLoginInCreateAccountContext = useLoginInCreateAccountContext();
    const { navigate } = useNavigateTo()
    async function handleNavToProfile() {
        navigate(ROUTES.profile.route)
    }
    async function handleNavToAddress() {
        navigate(ROUTES.address.route);
    }
    async function handleNavToOrders() {
        navigate(ROUTES.orders.route);
    }
    return (
        <DropdownMenu>
            {
                isLoggedIn
                    ? <DropdownMenuTrigger asChild>
                        <div className='flex items-center gap-1 p-1 px-4 rounded-2xl md:cursor-pointer  hover:bg-secondary/25'>
                            {
                                userDetails?.photoURL
                                    ? <div className='w-[1.5rem] h-[1.5rem] overflow-hidden rounded-full mr-[0.2rem] border'>
                                        <img src={userDetails?.photoURL} alt='' className='object-cover w-[1.5rem] h-[1.5rem]' />
                                    </div>
                                    : <ProfileIcon />
                            }

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
                <DropdownMenuItem onClick={handleNavToOrders} className='flex gap-[0.5rem]'>
                    <OrdersIcon /> Orders
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

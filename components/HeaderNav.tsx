'use client'
import React from 'react'
import { ModeToggle } from './ui/ModeToggle'
import CartButton from './ui/CartButton';
import ProfileButton from './ui/ProfileButton';
import Input from './ui/Input';
import useAnimationTyping from '@/hooks/useAnimationTyping';
import { tMenuListContext } from '@/types';
import { useMenuListContext } from '@/context/menuListContext/menuListContext';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'
import { LogoIcon } from '@/constants/icons';
import LoginCreateAccountDialog from './loginCreateAccount/LoginCreateAccountDialog';

export default function HeaderNav() {
    const { searchValue, handleOnChangeSearch }: tMenuListContext = useMenuListContext();
    const [placeholder] = useAnimationTyping("Search here...", searchValue)
    const router = useRouter();
    const pathName = usePathname();
    return (
        <nav className='h-[--nav-height] flex items-center fixed top-0 left-0 right-0 px-[0.5rem] lg:px-[2rem] z-50 bg-secondary/95 w-screen border-b'>
            <div className='md:grid md:grid-cols-3 w-full flex items-center justify-between'>
                <div
                    className='md:cursor-pointer cursor-default pl-[0.7rem]'
                    onClick={() => router.push("/")}
                >
                    <LogoIcon size={"1.5rem"} />
                </div>
                <div>
                    <div className={`${pathName === "/" ? "flex" : "hidden"}`}>
                        <Input
                            type='search'
                            placeholder={placeholder}
                            value={searchValue}
                            onChange={handleOnChangeSearch}
                        />
                    </div>
                </div>
                <div className='flex gap-2 items-end justify-end'>
                    <ProfileButton />
                    <div className='md:flex hidden'>
                        <CartButton />
                    </div>
                </div>
            </div>
            <LoginCreateAccountDialog />
        </nav>
    )
}

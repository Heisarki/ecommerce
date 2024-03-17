'use client'
import React from 'react'
import { ModeToggle } from './ui/ModeToggle'
import CartButton from './ui/CartButton';
import ProfileButton from './ui/ProfileButton';
import Input from './ui/Input';
import useAnimationTyping from '@/hooks/useAnimationTyping';

export default function HeaderNav() {
    const [placeholder] = useAnimationTyping("Search here...")
    return (
        <nav className='h-[--nav-height] flex items-center fixed top-0 left-0 right-0 px-[0.5rem] lg:px-[2rem] z-50 bg-secondary/95 w-screen border-b'>
            <div className='md:grid md:grid-cols-3 w-full flex items-center justify-between'>
                <div className=''>
                    <ModeToggle />
                </div>
                <div>
                    <Input
                        placeholder={placeholder}
                    />
                </div>
                <div className='flex gap-2 items-end justify-end'>
                    <ProfileButton />
                    <div className='md:flex hidden'>
                        <CartButton />
                    </div>
                </div>
            </div>
        </nav>
    )
}

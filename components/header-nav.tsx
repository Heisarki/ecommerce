import React from 'react'
import { ModeToggle } from './ui/mode-toggle'
import Profile from '@/public/assets/Profile'
import { CiShoppingCart } from "react-icons/ci";
import CartButton from './ui/cart-button';
import { Button } from './ui/button';
import ProfileButton from './ui/profile-button';

export default function HeaderNav() {
    return (
        <nav className='h-[--nav-height] flex fixed top-0 left-0 right-0 justify-between items-center px-[0.5rem] lg:px-[2rem] z-50 bg-secondary'>
            <div>
                {/* Honline
                <ModeToggle /> */}
            </div>
            <div className='flex items-center gap-2'>
                <ProfileButton />
                <CartButton />
            </div>
        </nav>
    )
}

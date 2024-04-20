'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { tCartContext } from '@/types/cartContextType'
import { useCartContext } from '@/context/cartContext/cartContext'
import { MOBILE_FOOTER_NAV_LIST, ROUTES } from '@/constants/common'
import useNavigateTo from '@/hooks/useNavigateTo'

export default function FooterNav() {
    const pathname = usePathname()
    const { cartItems }: tCartContext = useCartContext()
    const { navigate } = useNavigateTo();
    return (
        <div className='h-[--nav-height] md:hidden flex fixed bottom-[-2px] left-0 right-0 px-4 justify-between items-center border-t-[1px] bg-secondary' >
            {
                MOBILE_FOOTER_NAV_LIST.map(ele => (
                    <div key={ele.id} className='relative'>
                        {
                            cartItems.length > 0 && ele.title === "Cart"
                                ? <div className='absolute left-[1px] top-[-2px] border h-4 w-4 rounded-[50%] flex justify-center items-center bg-red-500'>
                                    <p className='text-[8px] text-white'>
                                        {cartItems.length}
                                    </p>
                                </div>
                                : ""
                        }
                        <Link
                            className={`${pathname === ele.route && 'bg-primary text-white'} flex flex-col justify-center items-center gap-1 px-3 pt-1 rounded-md cursor-pointer text-secondary-foreground`}
                            href={ele.route}
                            onClick={() => navigate(ele.route)}
                        >
                            <ele.icon />
                            <p className='text-xs'>{ele.title}</p>
                        </Link>
                    </div>
                ))
            }
        </div>
    )
}

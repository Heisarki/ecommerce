'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { GoHome } from "react-icons/go";
import { GiShoppingCart } from "react-icons/gi";
import { RxReader } from "react-icons/rx";
import { tCartContext } from '@/types/cartContextType'
import { useCartContext } from '@/context/cartContext/cartContext'


export const NAVLIST = [
    {
        id: 1,
        title: "Home",
        // icon: homeIcon,
        icon: <GoHome />,
        route: "/",
    },
    {
        id: 2,
        title: "orders",
        // icon: teamIcon,
        icon: <RxReader />,
        route: "/orders",
    },
    {
        id: 3,
        title: "Cart",
        icon: <GiShoppingCart />,
        // icon: CartIcon,
        route: "/cart",
    }
] as const

export default function FooterNav() {
    const pathname = usePathname()
    const { cartItems }: tCartContext = useCartContext()
    return (
        <div className='h-[--nav-height] md:hidden flex fixed bottom-[-2px] left-0 right-0 px-4 justify-between items-center border-t-[1px] bg-secondary' >
            {
                NAVLIST.map(ele => (
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
                        >
                            {ele.icon}
                            <p className='text-xs'>{ele.title}</p>
                        </Link>
                    </div>
                ))
            }
        </div>
    )
}

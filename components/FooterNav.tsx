'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { GoHome } from "react-icons/go";
import { GiShoppingCart } from "react-icons/gi";
import { RxReader } from "react-icons/rx";


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
    return (
        <div className='h-[--nav-height] md:hidden flex fixed bottom-0 left-0 right-0 px-4 justify-between items-center border-t-[1px] bg-secondary' >
            {
                NAVLIST.map(ele => (
                    <Link
                        key={ele.id}
                        className={`${pathname === ele.route && 'bg-primary text-white'} flex flex-col justify-center items-center gap-1 px-3 pt-1 rounded-md cursor-pointer text-secondary-foreground`}
                        href={ele.route}
                    >
                        {ele.icon}
                        <p className='text-xs'>{ele.title}</p>
                    </Link>
                ))
            }
        </div>
    )
}

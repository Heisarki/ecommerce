"use client"
import React, { ReactNode, useEffect } from 'react'
import HeaderNav from './HeaderNav'
import FooterNav from './FooterNav'
import { ModeToggle } from './ui/ModeToggle'
import { tGlobalContext, tLoginInCreateAccountContext } from '@/types'
import { useLoginInCreateAccountContext } from '@/context/loginCreateAccount/LoginCreateAccount'
import Loading from './ui/Loading'
import { useGlobalContext } from '@/context/globalContext/GlobalContext'

export default function AppLayout({
    children
}: { children: ReactNode }) {
    const { navLoading }: tGlobalContext = useGlobalContext()
    useEffect(() => {
        console.log("NAV", navLoading)
    }, [navLoading])
    return (
        <div className='flex flex-col relative overflow-auto h-[100vh]'>
            <HeaderNav />
            <section className='pt-[--nav-height-plus-padding] pb-[--nav-height-plus-padding] px-[0.5rem] lg:max-w-[80vw] flex self-center w-full'>
                {navLoading ? <Loading /> : children}
            </section>
            <div className='fixed md:right-[2rem] right-[0.5rem] md:bottom-[1rem] bottom-[--nav-height-plus-padding]'>
                <ModeToggle />
            </div>
            <FooterNav />
        </div>
    )
}

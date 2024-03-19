import React, { ReactNode } from 'react'
import HeaderNav from './HeaderNav'
import FooterNav from './FooterNav'
import { ModeToggle } from './ui/ModeToggle'

export default function AppLayout({
    children
}: { children: ReactNode }) {
    return (
        <div className='flex flex-col relative overflow-auto h-[100vh]'>
            <HeaderNav />
            <section className='pt-[--nav-height] pb-[--nav-height] px-[0.5rem] lg:max-w-[80vw] flex self-center w-full py-[0.5rem]'>
                {children}
            </section>
            <div className='fixed md:right-[2rem] right-[0.5rem] md:bottom-[1rem] bottom-[--nav-height-plus-padding]'>
                <ModeToggle />
            </div>
            <FooterNav />
        </div>
    )
}

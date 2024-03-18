import React, { ReactNode } from 'react'
import HeaderNav from './HeaderNav'
import FooterNav from './FooterNav'

export default function AppLayout({
    children
}: { children: ReactNode }) {
    return (
        <div className='flex flex-col relative overflow-auto h-[100vh]'>
            <HeaderNav />
            <section className='mt-[--nav-height] mb-[--nav-height] px-[0.5rem] lg:max-w-[80vw] flex self-center w-full py-[0.5rem]'>
                {children}
            </section>
            <FooterNav />
        </div>
    )
}

import React, { ReactNode } from 'react'
import HeaderNav from './header-nav'
import FooterNav from './footer-nav'

export default function AppLayout({
    children
}: { children: ReactNode }) {
    return (
        <div className='flex flex-col relative'>
            <HeaderNav />
            <section className='mt-[--nav-height] px-[0.5rem] lg:max-w-[80vw] flex self-center w-full py-[0.5rem]'>
                {children}
            </section>
            {/* <FooterNav /> */}
        </div>
    )
}
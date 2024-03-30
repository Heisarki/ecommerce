import React, { ReactNode } from 'react'
import { MenuListContextProvider } from './menuListContext/menuListContext'
import { CartContextProvider } from './cartContext/cartContext'
import { LoginInCreateAccountContextProvider } from './loginCreateAccount/LoginCreateAccount'
import { AddressContextProvider } from './addressContext/addressContext'


export default function ContextProvider({
    children
}: {
    children: ReactNode
}) {
    return (
        <LoginInCreateAccountContextProvider>
            <CartContextProvider>
                <MenuListContextProvider>
                    <AddressContextProvider>
                        {children}
                    </AddressContextProvider>
                </MenuListContextProvider>
            </CartContextProvider>
        </LoginInCreateAccountContextProvider>
    )
}

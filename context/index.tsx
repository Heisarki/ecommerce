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
            <AddressContextProvider>
                <CartContextProvider>
                    <MenuListContextProvider>
                        {children}
                    </MenuListContextProvider>
                </CartContextProvider>
            </AddressContextProvider>
        </LoginInCreateAccountContextProvider>
    )
}

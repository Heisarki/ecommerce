import React, { ReactNode } from 'react'
import { MenuListContextProvider } from './menuListContext/menuListContext'
import { CartContextProvider } from './cartContext/cartContext'
import { LoginInCreateAccountContextProvider } from './loginCreateAccount/LoginCreateAccount'
import { AddressContextProvider } from './addressContext/addressContext'
import { GlobalContextProvider } from './globalContext/GlobalContext'


export default function ContextProvider({
    children
}: {
    children: ReactNode
}) {
    return (
        <GlobalContextProvider>
            <LoginInCreateAccountContextProvider>
                <AddressContextProvider>
                    <CartContextProvider>
                        <MenuListContextProvider>
                            {children}
                        </MenuListContextProvider>
                    </CartContextProvider>
                </AddressContextProvider>
            </LoginInCreateAccountContextProvider>
        </GlobalContextProvider>
    )
}

import React, { ReactNode } from 'react'
import { MenuListContextProvider } from './menuListContext/menuListContext'
import { CartContextProvider } from './cartContext/cartContext'
import { LoginInCreateAccountContextProvider } from './loginCreateAccount/LoginCreateAccount'


export default function ContextProvider({
    children
}: {
    children: ReactNode
}) {
    return (
        <LoginInCreateAccountContextProvider>
            <CartContextProvider>
                <MenuListContextProvider>
                    {children}
                </MenuListContextProvider>
            </CartContextProvider>
        </LoginInCreateAccountContextProvider>
    )
}

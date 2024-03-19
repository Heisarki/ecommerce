import React, { ReactNode } from 'react'
import { MenuListContextProvider } from './menuListContext/menuListContext'
import { CartContextProvider } from './cartContext/cartContext'

export default function ContextProvider({
    children
}: {
    children: ReactNode
}) {
    return (
        <CartContextProvider>
            <MenuListContextProvider>
                {children}
            </MenuListContextProvider>
        </CartContextProvider>
    )
}

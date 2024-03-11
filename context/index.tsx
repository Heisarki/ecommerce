import React, { ReactNode } from 'react'
import { MenuListContextProvider } from './menuListContext'
import { CartContextProvider } from './cartContext'

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

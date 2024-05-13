import React, { ReactNode } from 'react'
import { MenuListContextProvider } from './menuListContext/menuListContext'
import { CartContextProvider } from './cartContext/cartContext'
import { LoginInCreateAccountContextProvider } from './loginCreateAccountContext/LoginCreateAccountContext'
import { AddressContextProvider } from './addressContext/addressContext'
import { GlobalContextProvider } from './globalContext/GlobalContext'
import { OrderContextProvider } from './orderContext/orderContext'


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
                            <OrderContextProvider>
                                {children}
                            </OrderContextProvider>
                        </MenuListContextProvider>
                    </CartContextProvider>
                </AddressContextProvider>
            </LoginInCreateAccountContextProvider>
        </GlobalContextProvider>
    )
}

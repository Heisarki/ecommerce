import AddressItem from '@/components/address/AddressItem'
import BillingDetails from '@/components/cart/BillingDetails'
import CartItems from '@/components/cart/CartItems'
import DeliveryAddress from '@/components/cart/DeliveryAddress'
import { Card } from '@/components/ui/Card'
import React from 'react'

export default function CartPage() {
    return (
        <div className='grid md:grid-cols-10 grid-cols-1 w-full relative md:gap-0 gap-[1rem]'>
            <div className='w-full md:pr-[1.5rem] flex flex-col gap-[1rem] px-0 md:col-span-6'>
                <Card className='p-[1rem] px-[1.2rem]'>
                    <DeliveryAddress />
                </Card>
                <CartItems />
            </div>
            <div className='h-max w-full md:sticky relative md:top-[--nav-height-plus-padding] px-0 md:col-span-4'>
                <BillingDetails />
            </div>
        </div>
    )
}

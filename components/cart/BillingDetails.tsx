"use client"
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/Card'
import { Button } from '../ui/Button'
import { tCartContext } from '@/types/cartContextType'
import { useCartContext } from '@/context/cartContext/cartContext'

export default function BillingDetails() {
    const { priceDetails, cartItems }: tCartContext = useCartContext()
    return (
        <div className='flex flex-col w-full gap-[1rem]'>
            <Card className='w-full'>
                <CardHeader>
                    <h1>Price Details</h1>
                </CardHeader>
                <CardContent>
                    <div className='flex items-center justify-between'>
                        <h1>SubTotal {`(${cartItems.length} items)`}</h1>
                        <h1>₹{priceDetails.subTotal.toFixed(2)}</h1>
                    </div>
                    <div className='flex items-center justify-between'>
                        <h1>Delivery Charges {`(${cartItems.length}`} × {`40)`}</h1>
                        <h1>₹{priceDetails.deliveryCharges.toFixed(2)}</h1>
                    </div>
                    <div className='flex items-center justify-between'>
                        <h1>GST {`(18%)`}</h1>
                        <h1>₹{priceDetails.gst.toFixed(2)}</h1>
                    </div>
                </CardContent>
                <CardFooter>
                    <div className='flex items-center justify-between w-full'>
                        <h1 className='font-medium'>Total <span className='text-xs font-normal'>{`(Incl. GST)`}</span></h1>
                        <h1>₹{priceDetails.total.toFixed(2)}</h1>
                    </div>
                </CardFooter>
            </Card>
            <Button>
                Proceed to payment
            </Button>
        </div>
    )
}

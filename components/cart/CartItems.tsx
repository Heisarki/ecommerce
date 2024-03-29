"use client"
import React from 'react'
import { Card, CardContent } from '../ui/Card'
import Image from 'next/image'
import { tCartContext, tCartItem } from '@/types/cartContextType'
import { useCartContext } from '@/context/cartContext/cartContext'
import { cn } from '@/lib/utils'
import { Button } from '../ui/Button'

export default function CartItems() {
    const { cartItems, handleDecrement, handleIncrement }: tCartContext = useCartContext();
    const arr = [1, 2, 3, 4]
    return (
        <Card>
            <CardContent className='gap-0'>
                {
                    cartItems.length > 0
                        ? (
                            cartItems.map((itemEle: tCartItem, index: number) => (
                                <div key={itemEle.id} className={`${cn('border-b py-[0.5rem] flex gap-[1rem] flex-col')} ${(index === cartItems.length - 1 && "border-b-0")}`}>
                                    <div className='flex gap-[1rem]'>
                                        <div className='flex flex-col gap-[0.5rem] w-[5rem] md:w-[6rem] flex-shrink-0'>
                                            <div className='size-[5rem] md:size-[6rem] rounded-md overflow-hidden'>
                                                <img
                                                    className='rounded-md contain h-full w-full'
                                                    alt={""}
                                                    src={itemEle.image}
                                                />
                                            </div>

                                        </div>
                                        <div className='flex flex-col flex-grow justify-between'>
                                            <div className='flex flex-col gap-[1rem]'>
                                                <h1 className='font-medium text-sm'>{itemEle.title}</h1>
                                                <h1 className='text-xs hidden md:flex'>
                                                    {
                                                        itemEle.description.length > 110
                                                            ? itemEle.description.substring(0, 110) + "..."
                                                            : itemEle.description
                                                    }
                                                </h1>
                                                <h1 className='text-xs md:hidden flex'>
                                                    {
                                                        itemEle.description.length > 50
                                                            ? itemEle.description.substring(0, 50) + "..."
                                                            : itemEle.description
                                                    }
                                                </h1>
                                            </div>

                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className='flex flex-col gap-[0.5rem] w-[5rem] md:w-[6rem] flex-shrink-0'>
                                            <div className='md:cursor-pointer'>
                                                <span className='w-full rounded-2xl flex items-center  border border-input bg-background'>
                                                    <Button
                                                        variant={"ghost"}
                                                        onClick={() => handleDecrement(itemEle.id)}
                                                        className='relative overflow-hidden text-center h-[1.2rem] hover:bg-accent hover:text-accent-foreground rounded-l-2xl border-r w-[1rem]'
                                                    >
                                                        -
                                                    </Button>
                                                    <span className='cursor-default w-[100%] text-center h-full text-secondary-foreground flex items-center justify-center text-xs font-semibold'>
                                                        {/* {item.qty} */}
                                                        {itemEle.qty}
                                                    </span>
                                                    <Button
                                                        variant={"ghost"}
                                                        onClick={() => handleIncrement(itemEle.id)}
                                                        className='relative overflow-hidden text-center h-[1.2rem] hover:bg-accent hover:text-accent-foreground rounded-r-2xl border-l  w-[1rem]'
                                                    >
                                                        +
                                                    </Button>
                                                </span>
                                            </div>
                                        </div>
                                        <h1 className='font-semibold text-end text-xs'>₹{itemEle.price.toFixed(2)}</h1>
                                    </div>
                                </div>
                            ))
                        )
                        : <p className='text-center py-[2rem] text-sm font-normal'>No item added to cart!</p>
                }
            </CardContent>
        </Card >
    )
}

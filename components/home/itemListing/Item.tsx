"use client"
import React from 'react'
import { Card } from "@/components/ui/Card"
import { tProduct } from '@/types'
import AddToCartButton from './AddToCartButton'

export default function Item({
    item,
}: {
    item: tProduct,
}) {
    return (
        <Card className='flex flex-col p-[0.4rem] gap-[0.5rem] h-full justify-between' data-id={item.id}>
            <div className='flex flex-col gap-[0.5rem]'>
                <div className='w-full overflow-hidden flex items-start justify-start'>
                    <img
                        src={item.image}
                        alt={item.title}
                        className='h-[10rem] w-full rounded-lg object-contain'
                    />
                </div>
                <div className='border-b ml-[-0.4rem] mr-[-0.4rem]'>
                </div>
                <div>
                    <h1 className='text-xs font-medium'>
                        ₹ {item.price.toFixed(2)}
                    </h1>
                    <p className='text-xs'>
                        {
                            item.description.length > 40
                                ? item.description.substring(0, 40) + '...'
                                : item.description
                        }
                    </p>
                </div>
            </div>
            <div className='flex justify-center'>
                <AddToCartButton
                    item={item}
                />
            </div>
        </Card >
    )
}

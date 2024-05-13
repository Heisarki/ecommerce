"use client"
import React, { useEffect } from 'react'
import OrderItem from './orderItem/OrderItem'
import { tOrderContext } from '@/types'
import { useOrderContext } from '@/context/orderContext/orderContext'

export default function Orders() {
    const { getOrderList, orderList }: tOrderContext = useOrderContext();
    useEffect(() => {
        getOrderList();
        console.log(getOrderList)
    }, [])
    if (orderList.length === 0)
        return <></>
    return (
        <div className='flex gap-[1rem] flex-col w-full'>
            {
                orderList.map((ele: any, index: number) => (
                    <div key={index}>
                        <OrderItem
                            item={ele}
                        />
                    </div>
                ))
            }
        </div>
    )
}

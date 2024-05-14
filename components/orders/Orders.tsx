"use client"
import React, { useEffect } from 'react'
import OrderItem from './orderItem/OrderItem'
import { tLoginInCreateAccountContext, tOrderContext } from '@/types'
import { useOrderContext } from '@/context/orderContext/orderContext'
import { useLoginInCreateAccountContext } from '@/context/loginCreateAccountContext/LoginCreateAccountContext'

export default function Orders() {
    const { getOrderList, orderList }: tOrderContext = useOrderContext();
    const { userDetails }: tLoginInCreateAccountContext = useLoginInCreateAccountContext();
    useEffect(() => {
        getOrderList();
        console.log(getOrderList)
    }, [userDetails?.id])
    if (orderList.data.length === 0 && !orderList.isLoading)
        return <h1 className='w-full text-center mt-[5rem]'>No orders!</h1>
    return (
        <div className='flex gap-[1rem] flex-col w-full'>
            {
                orderList.data.map((ele: any, index: number) => (
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

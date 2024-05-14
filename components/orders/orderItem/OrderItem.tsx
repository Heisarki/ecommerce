"use client"
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'
import { formatDateDDMMYYYY } from '@/utils/orderUtils'
import React from 'react'

export default function OrderItem({
    item,
}: {
    item?: any,
}) {
    return (
        <Card className='md:p-[1.5rem] p-[1rem] flex flex-col gap-[1rem]'>
            <div className='flex justify-between'>
                <h1 className='text-sm bg-primary p-[0.2rem] rounded-lg px-[0.6rem] text-primary-foreground'>#{item?.orderId}</h1>
                <h1 className='text-xs'>
                    {formatDateDDMMYYYY(item.orderDate)}
                </h1>
            </div>
            <div className='flex flex-col gap-[0.5rem] border p-[1rem] rounded-lg'>
                <h1 className='text-sm font-semibold'>Delivery address</h1>
                <div className='flex justify-between'>
                    <h1 className='text-sm font-semibold'>{item?.deliveryAddress?.name}</h1>
                    <h1 className='text-sm'>+91 {item?.deliveryAddress?.phoneNumber}</h1>
                </div>
                <div>
                    <p className='font-light text-sm'>{item?.deliveryAddress?.areaAndStreet + " " + item?.deliveryAddress?.cityDistrictTown + ", " + item?.deliveryAddress?.state} - <span className='font-semibold'>{item?.deliveryAddress?.pinCode}</span></p>
                </div>
            </div>
            {
                item.cartItems.map((itemEle: any, index: number) => (
                    <div className='flex gap-[1rem] border p-[1rem] rounded-lg' key={index}>
                        <div className='flex flex-col gap-[0.5rem] w-[5rem] md:w-[6rem] flex-shrink-0'>
                            <div className='size-[5rem] md:size-[6rem] rounded-md overflow-hidden flex justify-center items-center'>
                                <img
                                    className='rounded-lg object-contain h-[5rem] w-full bg-white'
                                    alt={""}
                                    src={itemEle.image}
                                />
                            </div>

                        </div>
                        <div className='flex flex-col flex-grow justify-between'>
                            <div className='flex flex-col gap-[1rem]'>
                                <h1 className='font-medium text-sm'>
                                    {itemEle.title}
                                </h1>
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
                        <div className='flex flex-col flex-shrink-0'>
                            <h1 className='font-semibold text-end text-xs '>
                                ₹{itemEle.price.toFixed(2)}
                            </h1>
                            <h1 className='text-xs text-end'>
                                Qty: {itemEle.qty}
                            </h1>
                        </div>
                    </div>
                ))
            }
            <div className='border p-[1rem] flex flex-col gap-[0.2rem] rounded-lg bg-secondary'>
                <h1 className='text-xs font-semibold mb-[0.3rem]'>
                    Price Details
                </h1>
                <div className='flex items-center justify-between'>
                    <h1 className='text-xs'>
                        SubTotal {`(${item.cartItems.length} items)`}
                    </h1>
                    <h1 className='text-xs'>
                        ₹{item?.billing?.subTotal.toFixed(2)}
                    </h1>
                </div>
                <div className='flex items-center justify-between'>
                    <h1 className='text-xs'>
                        Delivery Charges {`(40)`}
                    </h1>
                    <h1 className='text-xs'>
                        ₹{item?.billing?.deliveryCharges.toFixed(2)}
                    </h1>
                </div>
                <div className='flex items-center justify-between'>
                    <h1 className='text-xs'>
                        GST {`(18%)`}
                    </h1>
                    <h1 className='text-xs'>
                        ₹{item?.billing?.gst.toFixed(2)}
                    </h1>
                </div>
                <div className='flex items-center justify-between w-full mt-[0.3rem]'>
                    <h1 className='text-xs font-semibold'>Total <span className='text-xs'>{`(Incl. GST)`}</span></h1>
                    <h1 className='text-xs font-semibold'>
                        ₹{item?.billing?.total.toFixed(2)}
                    </h1>
                </div>
            </div>
        </Card >
    )
}

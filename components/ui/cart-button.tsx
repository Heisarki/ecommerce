import React from 'react'
import { GiShoppingCart } from "react-icons/gi";

export default function CartButton() {
    return (
        <div className='relative'>
            <div className='absolute left-[1px] top-[-1px] border h-4 w-4 rounded-[50%] flex justify-center items-center bg-red-500'>
                <p className='text-[8px] text-white'>1</p>
            </div>
            <div className='md:px-4 flex items-center justify-center gap-1 p-1 rounded-2xl md:cursor-pointer hover:bg-secondary h-8 md:w-fit w-8 border'>
                <GiShoppingCart />
                <p className='md:flex hidden'>Cart</p>
            </div>
        </div>
    )
}

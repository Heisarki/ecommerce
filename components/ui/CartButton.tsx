import { useCartContext } from '@/context/cartContext';
import { tCartContext, tCartItem } from '@/types/cartContextType';
import React from 'react'
import { GiShoppingCart } from "react-icons/gi";

export default function CartButton() {
    const { cartItems }: tCartContext = useCartContext();
    return (
        <div className='relative'>
            {
                cartItems.length > 0
                    ? <div className='absolute left-[1px] top-[-1px] border h-4 w-4 rounded-[50%] flex justify-center items-center bg-red-500'>
                        <p className='text-[8px] text-white'>
                            {cartItems.length}
                        </p>
                    </div>
                    : ""
            }
            <div className='md:px-4 flex items-center justify-center gap-1 p-1 rounded-2xl md:cursor-pointer hover:bg-secondary/25 h-8 md:w-fit w-8'>
                <GiShoppingCart />
                {/* <p className='md:flex hidden'>Cart</p> */}
            </div>
        </div>
    )
}

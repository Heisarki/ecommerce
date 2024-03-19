import React from 'react'
import { Button } from '../../ui/Button'
import { tMenuListContext, tProduct } from '@/types';
import { useMenuListContext } from '@/context/menuListContext/menuListContext';

export default function AddToCartButton({ item }: { item: tProduct }) {
    const { handleAddToCart, handleIncrement, handleDecrement }: tMenuListContext = useMenuListContext();
    return (
        <>
            {
                item.qty > 0
                    ? <button className='md:cursor-pointer w-[85%]'>
                        <span className='w-full rounded-2xl flex items-center  border border-input bg-background'>
                            <span
                                data-id={item.id}
                                onClick={handleDecrement}
                                className='w-full text-center py-[0.1rem] hover:bg-accent hover:text-accent-foreground rounded-l-2xl border-r'
                            >-</span>
                            <span className='cursor-default w-[100%] text-center h-full text-secondary-foreground flex items-center justify-center text-xs'>{item.qty}</span>
                            <span
                                data-id={item.id}
                                onClick={handleIncrement}
                                className='w-full text-center py-[0.1rem] hover:bg-accent hover:text-accent-foreground rounded-r-2xl border-l'
                            >+</span>
                        </span>
                    </button>
                    : <Button
                        data-id={item.id}
                        onClick={handleAddToCart}
                        className='h-[1.75rem] rounded-2xl text-xs w-[85%]'
                    >
                        Add to cart
                    </Button>
            }
            {/* <button className='md:cursor-pointer w-[85%]'>
                <span className='w-full rounded-2xl flex items-center  border border-primary bg-background'>
                    <span className='w-full text-center py-[0.2rem] hover:bg-accent hover:text-accent-foreground rounded-l-2xl border-r border-primary text-primary' >-</span>
                    <span className='cursor-default w-[100%] text-center h-full flex items-center justify-center text-xs text-primary'>2</span>
                    <span className='w-full text-center py-[0.2rem] hover:bg-accent hover:text-accent-foreground rounded-r-2xl border-l border-primary text-primary'>+</span>
                </span>
            </button> */}
        </>
    )
}

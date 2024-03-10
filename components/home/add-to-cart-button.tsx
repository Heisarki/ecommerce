import React from 'react'
import { Button } from '../ui/button'

export default function AddToCartButton() {
    return (
        // <button className='w-full  rounded-lg text-sm py-[0.5rem] bg-primary text-primary-foreground'>
        //     Add to cart
        // </button>
        <>
            {/* <Button className='h-[1.75rem] rounded-2xl'>
                Add to cart
            </Button> */}
            <button className='md:cursor-pointer'>
                <span className='w-full rounded-2xl flex items-center text-sm font-semibold border border-input bg-background'>
                    <span className='w-full text-center py-[0.2rem] hover:bg-accent hover:text-accent-foreground rounded-l-2xl border-r' >-</span>
                    <span className='cursor-default w-[100%] text-center h-full text-secondary-foreground flex items-center justify-center'>2</span>
                    <span className='w-full text-center py-[0.2rem] hover:bg-accent hover:text-accent-foreground rounded-r-2xl border-l'>+</span>
                </span>
            </button>
        </>
    )
}

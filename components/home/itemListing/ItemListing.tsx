"use client"
import React from 'react'
import Item from './Item'
import { tMenuListContext } from '@/types'
import { useMenuListContext } from '@/context/menuListContext'

export default function ItemListing() {
    const { productList, selectedCategory }: tMenuListContext = useMenuListContext()
    return (
        <div className='flex flex-col gap-[0.5rem]'>
            <h1 className='text-xl font-medium capitalize'>
                {
                    selectedCategory?.name
                        ? selectedCategory?.name
                        : "All products"
                }
            </h1>
            {
                productList.length > 0
                    ? <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 grid-cols-2 gap-3'>
                        {
                            productList.map((itemEle: any) => (
                                <Item
                                    item={itemEle}
                                    key={itemEle.id}
                                />
                            ))
                        }
                    </div>
                    : "Loading..."
            }
        </div>
    )
}

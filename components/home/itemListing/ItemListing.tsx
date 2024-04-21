"use client"
import React from 'react'
import Item from './Item'
import { tMenuListContext } from '@/types'
import { useMenuListContext } from '@/context/menuListContext/menuListContext'

export default function ItemListing() {
    const { filteredProductList, selectedCategory }: tMenuListContext = useMenuListContext()
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
                filteredProductList.data.length > 0
                    ? <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 grid-cols-2 gap-3'>
                        {
                            filteredProductList.data.map((itemEle: any, index: number) => (
                                <div key={itemEle.id || index}>
                                    <Item
                                        item={itemEle}
                                    />
                                </div>
                            ))
                        }
                    </div>
                    : <p className='pt-[5rem] text-center'>
                        {
                            filteredProductList.isLoading
                                ? "Loading..."
                                : (filteredProductList.error.message ? filteredProductList.error.message : "No item found!")
                        }
                    </p>
            }
        </div>
    )
}

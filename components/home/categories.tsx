"use client"
import React, { useRef, useState } from 'react'
import { FaChevronLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";
import { Card } from '../ui/Card';
import { useMenuListContext } from '@/context/menuListContext';
import { tMenuListContext } from '@/types';


export default function Categories() {
    const { categoryList, handleClickCategory }: tMenuListContext = useMenuListContext();

    /**
     * Functionality for scrolling on 
     * clicking the arrow button
     */
    const scrollRef = useRef<any>();
    const [scrollBy, setScrollBy] = useState(100)
    function handleScrollLeft(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        console.log(scrollRef.current)
        scrollRef.current.scrollLeft = -scrollBy
        setScrollBy((prev) => prev + 100)
    }
    function handleScrollRight(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        console.log(e.clientX)
        scrollRef.current.scrollLeft = scrollBy
        setScrollBy((prev) => prev + 100)
    }

    return (
        <>
            <h1 className='text-xl font-medium mb-[-10px]'>Categories</h1>
            <Card className='relative w-[100%] p-[0.5rem]  rounded-sm'>
                <div className='w-[2rem] absolute left-0 top-[20%] bottom-[20%] z-10 md:block hidden'>
                    <div
                        onClick={handleScrollLeft}
                        className='flex items-center justify-center h-[80%] rounded-r-md md:cursor-pointer bg-primary'
                    >
                        <FaChevronLeft color='#fff' />
                    </div>
                </div>
                <div
                    ref={scrollRef}
                    className='flex gap-4 w-[100%] overflow-auto relative scroll-smooth pb-[0.5rem]'
                >
                    {
                        categoryList.map((categoryEle: any, index: number) => (
                            <div
                                data-id={categoryEle.id}
                                key={categoryEle.id || index}
                                onClick={handleClickCategory}
                                className='rounded-xl border justify-between flex-grow w-[300px] h-[200px] flex flex-shrink-0 flex-col md:cursor-pointer gap-[0.5rem]'
                            >
                                <img
                                    data-id={categoryEle.id}
                                    src={categoryEle.image}
                                    alt={categoryEle.id}
                                    className='rounded-lg object-contain h-[150px] p-[.5rem]'
                                />
                                <p data-id={categoryEle.id} className='capitalize font-medium text-xs border-t p-[.5rem] text-center'>{categoryEle.name}</p>
                            </div>
                        ))
                    }
                </div>
                <div className='w-[2rem] absolute right-0 top-[20%] bottom-[20%] z-5 md:block hidden'>
                    <div
                        onClick={handleScrollRight}
                        className='flex items-center justify-center h-[80%] bg-primary rounded-l-md md:cursor-pointer'
                    >
                        <FaAngleRight color='#fff' />
                    </div>
                </div>
            </Card>
        </>
    )
}

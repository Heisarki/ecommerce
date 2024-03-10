"use client"
import { getCategoriesAPI } from '@/api';
import { API_BASE_URL, CATEGORIES_IMAGE_URL } from '@/constants';
import useGetAPICall from '@/hooks/getAPICall'
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import { FaChevronLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";
import { Card } from '../ui/card';


export default function Categories() {
    const categories = [
        {
            id: 1,
            image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
            name: "electronics"
        },
        {
            id: 2,
            image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
            name: "men's clothing"
        },
        {
            id: 3,
            image: "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
            name: "women's clothing"
        },
        {
            id: 4,
            image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
            name: "jewelery"
        },
    ]
    const [isLoading, setIsLoading] = useState(true)
    async function click() {
        const res = await getCategoriesAPI("products/categories", setIsLoading)
        console.log(res)
    }
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
        <Card className='relative w-[100%] p-[0.5rem]  rounded-sm'>
            {/* <div className='relative w-[100%] p-[0.5rem]  rounded-sm'> */}
            <div className='w-[2rem] absolute left-0 top-[20%] bottom-[20%] z-10'>
                <div
                    onClick={handleScrollLeft}
                    className='flex items-center justify-center h-[80%]    rounded-r-md md:cursor-pointer bg-secondary'
                >
                    <FaChevronLeft />
                </div>
            </div>
            <div
                ref={scrollRef}
                className='flex gap-4 w-[100%] overflow-auto relative scroll-smooth pb-[0.5rem]'
            >
                {
                    categories.map((categoryEle: any, index: number) => (
                        <div className='rounded-xl border justify-between flex-grow w-[300px] h-[200px] flex flex-shrink-0 flex-col md:cursor-pointer gap-[0.5rem]'
                        >
                            <img
                                src={categoryEle.image}
                                alt={categoryEle.id}
                                className='rounded-lg object-contain h-[150px] p-[.5rem]'
                            />
                            <p className='capitalize font-semibold text-xs border-t p-[.5rem] text-center'>{categoryEle.name}</p>
                        </div>
                    ))
                }
            </div>
            <div className='w-[2rem] absolute right-0 top-[20%] bottom-[20%] z-5'>
                <div
                    onClick={handleScrollRight}
                    className='flex items-center justify-center h-[80%] bg-secondary rounded-l-md md:cursor-pointer'
                >
                    <FaAngleRight />
                </div>
            </div>
            {/* </div> */}
        </Card>
    )
}

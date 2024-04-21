import React from 'react'
import { HiOutlineInformationCircle } from "react-icons/hi";


export default function Required() {
    return (
        <div className='flex flex-row gap-[0.2rem] items-center'>
            <HiOutlineInformationCircle className='text-red-700' />
            <p className='text-[0.6rem] text-red-600'>Required</p>
        </div>
    )
}

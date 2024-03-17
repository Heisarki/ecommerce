import React from 'react'
import { CiSearch } from "react-icons/ci";

export default function Input({
    value,
    onChange,
    placeholder,
}: {
    value?: string,
    onChange?: (e: any) => void,
    placeholder?: string,
}) {
    return (
        <div className='relative flex flex-grow'>
            <div className='absolute left-[0.5rem] top-0 bottom-0 flex justify-center items-center'>
                <CiSearch />
            </div>
            <input
                className='border focus:border focus:outline-none px-[1rem] pl-[2rem] py-[0.5rem] rounded-md text-xs w-[100%]'
                type='search'
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    )
}

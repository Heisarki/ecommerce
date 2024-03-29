import { cn } from '@/lib/utils';
import React from 'react'
import { CiSearch } from "react-icons/ci";

export default function Input({
    value,
    onChange,
    placeholder,
    type = "text",
}: {
    type?: string,
    value?: string,
    onChange?: (e: any) => void,
    placeholder?: string,
}) {
    return (
        <div className='relative flex flex-grow'>
            {
                type === "search" &&
                <div className='absolute left-[0.5rem] top-0 bottom-0 flex justify-center items-center'>
                    <CiSearch />
                </div>
            }
            <input
                className={`${cn("border focus:border focus:outline-none px-[0.5rem] py-[0.5rem] rounded-md text-xs w-[100%]")} ${type === "search" ? "pl-[1.8rem]" : ""}`}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    )
}

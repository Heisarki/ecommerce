"use client"
import { cn } from '@/lib/utils';
import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Input({
    readOnly = false,
    value,
    onChange,
    placeholder,
    type = "text",
    name = placeholder,
    inputRegister = {},
}: {
    readOnly?: boolean,
    type?: string,
    value?: string,
    onChange?: (e: any) => void,
    placeholder?: string,
    name?: string,
    inputRegister?: any
}) {
    const [inputType, setInputType] = useState(type)
    const [hidePassword, setHidePassword] = useState(true)
    function handleHidePassword() {
        if (hidePassword) {
            setInputType("text")
            setHidePassword(!hidePassword)
        } else {
            setInputType("password")
            setHidePassword(!hidePassword)
        }
    }
    return (
        <div className='relative flex flex-grow'>
            {
                inputType === "search" &&
                <div className='absolute left-[0.5rem] top-0 bottom-0 flex justify-center items-center'>
                    <CiSearch />
                </div>
            }
            <input
                readOnly={readOnly}
                name={name}
                className={`${cn("border focus:border focus:outline-none px-[0.5rem] py-[0.5rem] rounded-md text-xs w-[100%] h-[2.5rem]")} ${inputType === "search" ? "pl-[1.8rem]" : ""}`}
                type={inputType}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                {...inputRegister}
            />
            {
                type === "password" &&
                <div
                    className='absolute top-[50%] right-[0.5rem] translate-y-[-50%] cursor-pointer'
                    onClick={handleHidePassword}
                >
                    {hidePassword ? <FaEye /> : <FaEyeSlash />}
                </div>
            }
        </div>
    )
}

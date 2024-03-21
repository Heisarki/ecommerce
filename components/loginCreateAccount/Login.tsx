import React from 'react'
import Input from '../ui/Input'
import { Button } from '../ui/Button'
import { FacebookIcon, GoogleIcon } from '@/constants/icons'

export default function Login() {
    return (
        <>
            <div className='w-full flex flex-col gap-[1rem] border p-[1rem] rounded-md'>
                <div className='flex flex-col gap-[0.3rem]'>
                    <label className='text-xs'>Email or Phone number</label>
                    <Input placeholder='johndoe@email.com' />
                </div>
                <div className='flex flex-col gap-[0.3rem]'>
                    <label className='text-xs'>Password</label>
                    <Input placeholder='password' type='password' />
                </div>
                <Button className='w-full'>
                    Log in
                </Button>
            </div>
            <p className='w-full text-center text-sm'>Or</p>
            <div className='border p-[1rem] rounded-md flex flex-col gap-[1rem]'>
                <Button asChild>
                    <span className='w-full flex justify-start gap-[1rem] cursor-pointer'>
                        <GoogleIcon size={"1.5rem"} /> Sign in using Google
                    </span>
                </Button>
                <Button asChild>
                    <span className='w-full flex justify-start gap-[1rem] cursor-pointer'>
                        <FacebookIcon size={"1.5rem"} /> Sign in using Facebook
                    </span>
                </Button>
            </div>
        </>
    )
}

import React from 'react'
import Input from '../ui/Input'
import { Button } from '../ui/Button'
import { FacebookIcon, GoogleIcon } from '@/constants/icons'

export default function CreateAccount() {
    return (
        <>
            <div className='w-full flex flex-col gap-[1rem] border md:p-[1rem] p-[0.5rem] rounded-md'>
                <div className='flex gap-[0.5rem]'>
                    <div className='flex flex-col gap-[0.3rem]'>
                        <label className='text-xs'>Firstname</label>
                        <Input placeholder='John' />
                    </div>
                    <div className='flex flex-col gap-[0.3rem]'>
                        <label className='text-xs'>Lastname</label>
                        <Input placeholder='Doe' />
                    </div>
                </div>
                <div className='flex flex-col gap-[0.3rem]'>
                    <label className='text-xs'>Email or Phone number</label>
                    <Input placeholder='johndoe@email.com' />
                </div>
                <div className='flex flex-col gap-[0.3rem]'>
                    <label className='text-xs'>Password</label>
                    <Input placeholder='password' type='password' />
                </div>
                <div className='flex flex-col gap-[0.3rem]'>
                    <label className='text-xs'>Confirm Password</label>
                    <Input placeholder='password' type='password' />
                </div>
                <Button className='w-full'>
                    Create account
                </Button>
            </div>
            <p className='w-full text-center text-sm'>Or</p>
            <div className='border md:p-[1rem] p-[0.5rem] rounded-md flex flex-col gap-[1rem]'>
                <Button asChild>
                    <span className='w-full flex justify-start gap-[0.5rem] cursor-pointer'>
                        <GoogleIcon size={"1.5rem"} /> Create account using Google
                    </span>
                </Button>
                <Button asChild>
                    <span className='w-full flex justify-start gap-[0.5rem] cursor-pointer'>
                        <FacebookIcon size={"1.5rem"} /> Create account using Facebook
                    </span>
                </Button>
            </div>
        </>
    )
}

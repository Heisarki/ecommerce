import React from 'react'
import Input from '../ui/Input'
import { Button } from '../ui/Button'
import { FacebookIcon, GoogleIcon } from '@/constants/icons'
import { tLoginInCreateAccountContext } from '@/types';
import { useLoginInCreateAccountContext } from '@/context/loginCreateAccount/LoginCreateAccount';
import Required from '../ui/Required';

export default function CreateAccount() {
    const { authInputData, handleCreateAccount, handleSubmit, errors, watch }: tLoginInCreateAccountContext = useLoginInCreateAccountContext();
    return (
        <>
            <form onSubmit={handleSubmit(handleCreateAccount)} className='w-full flex flex-col gap-[1rem] border md:p-[1rem] p-[0.5rem] rounded-md'>
                <div className='flex gap-[0.5rem]'>
                    <div className='flex flex-col gap-[0.3rem]'>
                        <label className='text-xs'>Firstname</label>
                        <Input
                            inputRegister={authInputData("firstName", { required: true })}
                            placeholder='John'
                        />
                    </div>
                    <div className='flex flex-col gap-[0.3rem]'>
                        <label className='text-xs'>Lastname</label>
                        <Input
                            inputRegister={authInputData("lastName")}
                            placeholder='Doe'
                        />
                    </div>
                </div>
                {errors.firstName && <Required />}
                <div className='flex flex-col gap-[0.3rem]'>
                    <label className='text-xs'>Email or Phone number</label>
                    <Input
                        inputRegister={authInputData("emailOrPhoneNo", { required: true })}
                        placeholder='johndoe@email.com'
                    />
                    {errors.emailOrPhoneNo && <Required />}
                </div>
                <div className='flex flex-col gap-[0.3rem]'>
                    <label className='text-xs'>Password</label>
                    <Input
                        inputRegister={authInputData("currentPassword", { required: true })}
                        placeholder='password'
                        type='password'
                    />
                    {errors.currentPassword && <Required />}
                </div>
                <div className='flex flex-col gap-[0.3rem]'>
                    <label className='text-xs'>Confirm Password</label>
                    <Input
                        inputRegister={authInputData("confirmPassword", { required: true })}
                        placeholder='password'
                        type='password'
                    />
                    {errors.confirmPassword && <Required />}
                </div>
                <Button type='submit' className='w-full' disabled={watch("isLoggedInCreateAccountClick")}>
                    {watch("isLoggedInCreateAccountClick") ? "Please wait..." : "Create account"}
                </Button>
            </form>
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

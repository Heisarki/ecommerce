import React from 'react'
import { Button } from '../ui/Button'
import { FemaleIcon, MaleIcon, ProfileIcon } from '@/constants'
import Input from '../ui/Input'
import { Card } from '../ui/Card'

export default function Profile() {
    return (
        <div className='w-full flex justify-center'>
            <div className='max-w-[40rem] w-full flex flex-col gap-[1rem] md:px-0 px-[1rem] md:pb-[0rem] pb-[3rem]'>
                <div className='flex items-center gap-[2rem] w-full'>
                    <div className='size-[5rem] rounded-full border overflow-hidden'>
                        {/* <img src='' alt='' /> */}
                        <ProfileIcon size={"100%"} />
                    </div>
                    <Button className='rounded-3xl' variant={"ghost"}>
                        Edit profile
                    </Button>
                </div>
                <div className='w-full '>
                    <div className='flex gap-[1rem] md:flex-row flex-col'>
                        <div className='w-full flex flex-col gap-[0.5rem]'>
                            <label>First name</label>
                            <Input />
                        </div>
                        <div className='w-full flex flex-col gap-[0.5rem]'>
                            <label>Last name</label>
                            <Input />
                        </div>
                    </div>
                </div>
                <div className='w-full md:flex-row flex-col'>
                    <div className='w-full flex flex-col gap-[0.5rem]'>
                        <label>Email</label>
                        <Input />
                    </div>
                </div>
                <div className='w-full md:flex-row flex-col'>
                    <div className='flex gap-[1rem] md:flex-row flex-col'>
                        <div className='w-full flex flex-col gap-[0.5rem]'>
                            <label>Phone number</label>
                            <Input />
                        </div>
                        <div className='w-full flex flex-col gap-[0.5rem]'>
                            <label>Date of birth</label>
                            <Input type='date' />
                        </div>
                    </div>
                </div>
                <div>
                    <div className='w-full flex flex-col gap-[0.5rem]'>
                        <label>Gender</label>
                        <div className='flex gap-[1rem]'>
                            <Card className='p-[0.5rem] flex flex-col gap-[0.5rem] md:w-[5.5rem] w-[5rem] items-center md:cursor-pointer cursor-default'>
                                <div className='md:size-[2rem] size-[2rem]'>
                                    <MaleIcon size={"100%"} />
                                </div>
                                <p className='md:text-base text-xs'>Male</p>
                            </Card>
                            <Card className='p-[0.5rem] flex flex-col gap-[0.5rem] md:w-[5.5rem] w-[5rem] items-center md:cursor-pointer cursor-default'>
                                <div className='md:size-[2rem] size-[2rem]'>
                                    <FemaleIcon size={"100%"} />
                                </div>
                                <p className='md:text-base text-xs'>Female</p>
                            </Card>
                        </div>
                    </div>
                </div>
                <div className='w-full flex gap-[1rem] justify-end'>
                    <Button>
                        Save
                    </Button>
                    <Button variant={"secondary"}>
                        Cancel
                    </Button>
                </div>
            </div>
        </div >
    )
}

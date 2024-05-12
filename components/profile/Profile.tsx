"use client"
import React from 'react'
import { Button } from '../ui/Button'
import { FemaleIcon, MaleIcon, ProfileIcon } from '@/constants'
import Input from '../ui/Input'
import { tLoginInCreateAccountContext } from '@/types'
import { useLoginInCreateAccountContext } from '@/context/loginCreateAccountContext/LoginCreateAccountContext'
import MaleFemaleRadio from './MaleFemaleRadio'

export default function Profile() {
    const { userDetails, profileUpdateData, handleEditProfile, handleSaveEditProfile, handleCancelEditProfile, editProfileFlag, handleSubmitProfileUpdate, watchProfileUpdate, handleUploadProfilePhoto }: tLoginInCreateAccountContext = useLoginInCreateAccountContext();
    return (
        <form onSubmit={handleSubmitProfileUpdate(handleSaveEditProfile)}>
            <div className='w-full flex justify-center'>
                <div className='max-w-[40rem] w-full flex flex-col gap-[1rem] md:px-0 px-[1rem] md:pb-[0rem] pb-[3rem]'>
                    <div className='flex items-center gap-[2rem] w-full'>
                        <div className='size-[5rem] rounded-full border overflow-hidden'>
                            {/* <img src='' alt='' /> */}
                            {
                                watchProfileUpdate("photoURL") !== ""
                                    ? <img src={watchProfileUpdate("photoURL")} alt='' />
                                    : <ProfileIcon size={"100%"} />
                            }
                        </div>
                        {
                            editProfileFlag &&
                            <Input
                                type='file'
                                // variant={"outline"}
                                onChange={handleUploadProfilePhoto}
                            />
                        }
                        {
                            !editProfileFlag &&
                            <Button
                                className='rounded-3xl'
                                variant={"outline"}
                                onClick={handleEditProfile}
                            >
                                Edit profile
                            </Button>
                        }
                    </div>
                    <div className='w-full '>
                        <div className='flex gap-[1rem] md:flex-row flex-col'>
                            <div className='w-full flex flex-col gap-[0.5rem]'>
                                <label>First name</label>
                                <Input
                                    inputRegister={profileUpdateData("firstName")}
                                    readOnly={!editProfileFlag}
                                // value={userDetails?.firstName}
                                />
                            </div>
                            <div className='w-full flex flex-col gap-[0.5rem]'>
                                <label>Last name</label>
                                <Input
                                    inputRegister={profileUpdateData("lastName")}
                                    readOnly={!editProfileFlag}
                                // value={userDetails?.lastName}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='w-full md:flex-row flex-col'>
                        <div className='w-full flex flex-col gap-[0.5rem]'>
                            <label>Email</label>
                            <Input
                                inputRegister={profileUpdateData("email")}
                                readOnly={!editProfileFlag}
                            // value={userDetails?.email}
                            />
                        </div>
                    </div>
                    <div className='w-full md:flex-row flex-col'>
                        <div className='flex gap-[1rem] md:flex-row flex-col'>
                            <div className='w-full flex flex-col gap-[0.5rem]'>
                                <label>Phone number</label>
                                <Input
                                    inputRegister={profileUpdateData("phoneNumber")}
                                    readOnly={!editProfileFlag}
                                />
                            </div>
                            <div className='w-full flex flex-col gap-[0.5rem]'>
                                <label>Date of birth</label>
                                <Input
                                    readOnly={!editProfileFlag}
                                    inputRegister={profileUpdateData("dob")}
                                    type='date'
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='w-full flex flex-col gap-[0.5rem]'>
                            <label>Gender</label>
                            <div className='flex gap-[1rem]'>
                                <MaleFemaleRadio
                                    inputRegister={profileUpdateData("gender")}
                                    selectedGender={watchProfileUpdate("gender")}
                                    readOnly={!editProfileFlag}
                                />
                            </div>
                        </div>
                    </div>
                    {
                        editProfileFlag &&
                        <div className='w-full flex gap-[1rem] justify-end'>
                            <Button type='submit'>
                                Save
                            </Button>
                            <Button variant={"secondary"} onClick={handleCancelEditProfile}>
                                Cancel
                            </Button>
                        </div>
                    }
                </div>
            </div >
        </form >
    )
}

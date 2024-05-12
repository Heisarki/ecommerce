import React from 'react'
import { Card } from '../ui/Card'
import ClickRipple from '../ui/ClickRipple'
import { FemaleIcon, MaleIcon, TickIcon } from '@/constants'
import { cn } from '@/lib/utils'

export default function MaleFemaleRadio({
    selectedGender,
    inputRegister,
    readOnly = false,
}: {
    selectedGender?: any,
    inputRegister?: any,
    readOnly?: boolean,
}) {
    return (
        <>
            <input disabled={readOnly} {...inputRegister} type="radio" id='male' value="male" className='hidden' />
            <label htmlFor='male'>
                <Card className={cn('p-[0.5rem] flex flex-col gap-[0.5rem] md:w-[5.5rem] w-[5rem] items-center md:cursor-pointer cursor-default overflow-hidden relative',
                    selectedGender === "male" && "bg-black/20"
                )}>
                    {
                        !readOnly &&
                        <ClickRipple />
                    }
                    <div className='md:size-[2rem] size-[2rem]'>
                        <MaleIcon size={"100%"} />
                    </div>
                    <p className='md:text-base text-xs'>Male</p>
                    {
                        selectedGender === "male" &&
                        <div className='absolute right-[0.2rem] top-[0.2rem]'>
                            <TickIcon color='green' />
                        </div>
                    }
                </Card>
            </label>
            <input disabled={readOnly} {...inputRegister} type='radio' id="female" value="female" className='hidden' />
            <label htmlFor='female'>
                <Card className={cn('p-[0.5rem] flex flex-col gap-[0.5rem] md:w-[5.5rem] w-[5rem] items-center md:cursor-pointer cursor-default overflow-hidden relative',
                    selectedGender === "female" && "bg-black/20"
                )}>
                    {
                        !readOnly &&
                        <ClickRipple />
                    }
                    <div className='md:size-[2rem] size-[2rem]'>
                        <FemaleIcon size={"100%"} />
                    </div>
                    <p className='md:text-base text-xs'>Female</p>
                    {
                        selectedGender === "female" &&
                        <div className='absolute right-[0.2rem] top-[0.2rem]'>
                            <TickIcon color='green' />
                        </div>
                    }
                </Card>
            </label>
        </>
    )
}

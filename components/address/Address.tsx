import React from 'react'
import AddressInput from '../shared/AddressInput'
import { Card } from '../ui/Card'
import AddressItem from './AddressItem'
import { Button } from '../ui/Button'

export default function Address() {
    return (
        <div className='flex flex-col gap-[1rem]'>
            <Button
                variant={"ghost"}
                className='w-max'
            >
                Add New Address
            </Button>
            <Card className='md:p-[2rem] p-[1rem]'>
                {/* <AddressInput /> */}
                <AddressItem />
            </Card>
            <Card className='md:p-[2rem] p-[1rem]'>
                <AddressInput />
                {/* <AddressItem /> */}
            </Card>
            <Card className='md:p-[2rem] p-[1rem]'>
                {/* <AddressInput /> */}
                <AddressItem />
            </Card>
            <Card className='md:p-[2rem] p-[1rem]'>
                {/* <AddressInput /> */}
                <AddressItem />
            </Card>
        </div>
    )
}

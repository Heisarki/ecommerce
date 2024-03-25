import React from 'react'
import AddressInput from '../shared/AddressInput'
import { Card } from '../ui/Card'
import AddressItem from './AddressItem'

export default function Address() {
    return (
        <div className='flex flex-col gap-[1rem]'>
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

import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/Card'
import { Button } from '../ui/Button'

export default function BillingDetails() {
    return (
        <div className='flex flex-col w-full gap-[1rem]'>
            <Card className='w-full'>
                <CardHeader>
                    <h1>Price Details</h1>
                </CardHeader>
                <CardContent>
                    <div className='flex items-center justify-between'>
                        <h1>Price {`(8 items)`}</h1>
                        <h1>₹91,660</h1>
                    </div>
                    <div className='flex items-center justify-between'>
                        <h1>Delivery Charges {`(8`}<span className='mt-[-2rem]'>*</span>{`40)`}</h1>
                        <h1>₹91,660</h1>
                    </div>
                    <div className='flex items-center justify-between'>
                        <h1>GST {`(18%)`}</h1>
                        <h1>₹91,660</h1>
                    </div>
                </CardContent>
                <CardFooter>
                    <div className='flex items-center justify-between w-full'>
                        <h1 className='font-medium'>Total <span className='text-sm'>{`(Incl. GST)`}</span></h1>
                        <h1>₹91,660</h1>
                    </div>
                </CardFooter>
            </Card>
            <Button>
                Proceed to payment
            </Button>
        </div>
    )
}

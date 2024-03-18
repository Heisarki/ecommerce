import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/AlertDialog"
import { tCartContext } from '@/types/cartContextType'
import { useCartContext } from '@/context/cartContext'

export default function ConfirmationDialog() {
    const { currentItemToRemove, openRemoveItemDialog, handleConfirm, handleCancel }: tCartContext = useCartContext();
    return (
        <AlertDialog open={openRemoveItemDialog}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will remove the <span className='font-semibold text-foreground'>{currentItemToRemove.title}</span> from the cart
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

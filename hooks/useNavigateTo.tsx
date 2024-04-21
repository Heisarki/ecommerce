"use client"
import { ROUTES } from '@/constants/common';
import { useLoginInCreateAccountContext } from '@/context/loginCreateAccount/LoginCreateAccount';
import { tLoginInCreateAccountContext } from '@/types';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function useNavigateTo() {
    const { setNavLoading }: tLoginInCreateAccountContext = useLoginInCreateAccountContext();
    const router = useRouter();
    function navigate(route: string) {
        setNavLoading(true)
        router.push(route)
        setTimeout(() => {
            setNavLoading(false)
        }, 100)
    }
    return { navigate }
}

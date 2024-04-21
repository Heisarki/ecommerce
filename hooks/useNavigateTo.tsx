"use client"
import { useGlobalContext } from '@/context/globalContext/GlobalContext';
import { tGlobalContext } from '@/types';
import { useRouter } from 'next/navigation';

export default function useNavigateTo() {
    const { setNavLoading }: tGlobalContext = useGlobalContext();
    const router = useRouter();
    function navigate(route: string) {
        setNavLoading(true)
        router.push(route)
        setTimeout(() => {
            setNavLoading(false)
        }, 500)
    }
    return { navigate }
}

"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'

type TGetAPI = {
    isLoading: boolean,
    response: unknown,
    error: unknown,
}

export default function useGetAPICall(url: string) {
    const [response, setResponse] = useState<unknown>(null)
    const [error, setError] = useState<unknown>(null)
    const [isLoading, setIsLoading] = useState(true)
    async function apiCall() {
        setIsLoading(true)
        try {
            const res = await axios.get(url)
            setResponse(res)
        } catch (err) {
            setError(err)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        apiCall()
        console.log("API CALL", url)
    }, [url])
    return { isLoading, response, error } as TGetAPI
}

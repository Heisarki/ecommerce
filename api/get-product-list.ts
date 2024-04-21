import { API_BASE_URL } from "@/constants"
import axios from "axios"

async function getCategoryProductListAPI(url: string) {
    try {
        // setIsLoading(true)
        const res = await axios.get(`${API_BASE_URL}/products/category/${url}`)
        if (!res.data)
            throw new Error("Something went wrong!")
        return res
    } catch (err) {
       return err
    } finally {
        // setIsLoading(false)
    }
}

async function getAllProductListAPI() {
    try {
        // setIsLoading(true)
        const res = await axios.get(`${API_BASE_URL}/products`)
        console.log("PRODUCTS LIST",res)
        if (!res.data)
            throw new Error("Something went wrong!")
        return res
    } catch (err) {
        console.log("PRODUCTS LIST",err)
       return err
    } finally {
        // setIsLoading(false)
    }
}

export {
    getCategoryProductListAPI,
    getAllProductListAPI,
}
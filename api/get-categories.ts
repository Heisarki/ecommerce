import { API_BASE_URL } from "@/constants"
import axios from "axios"
import { error } from "console"

export { }
export async function getCategoriesAPI(url: string, setIsLoading: any) {
    try {
        setIsLoading(true)
        const res = await axios.get(`${API_BASE_URL}/${url}`)
        if (!res.data)
            throw new Error("Something went wrong!")
        return res
    } catch (err) {
       return err
    } finally {
        setIsLoading(false)
    }
}
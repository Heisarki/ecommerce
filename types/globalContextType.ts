import { Dispatch, SetStateAction } from "react"

export type tGlobalContext = {
    navLoading: boolean,
    setNavLoading: Dispatch<SetStateAction<boolean>>
}
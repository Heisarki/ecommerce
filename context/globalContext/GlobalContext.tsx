"use client";
import { tGlobalContext } from "@/types";
import {
    createContext,
    useContext,
    useState,
    ReactNode,
} from "react";


const GlobalContext = createContext({} as tGlobalContext);

export const GlobalContextProvider = ({
    children
}: {
    children: ReactNode
}) => {
    const [navLoading, setNavLoading] = useState(false)
    const value = {
        navLoading, setNavLoading
    }

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
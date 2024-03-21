"use client";
import { LOGIN_CREATE_ACCOUNT } from "@/constants/common";
import { tLoginInCreateAccountContext } from "@/types";
import {
    createContext,
    useContext,
    Dispatch,
    SetStateAction,
    useState,
    ReactNode,
} from "react";

const LoginInCreateAccountContext = createContext({} as tLoginInCreateAccountContext);

export const LoginInCreateAccountContextProvider = ({
    children
}: {
    children: ReactNode
}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loginOrCreateAccount, setLoginOrCreateAccount] = useState(LOGIN_CREATE_ACCOUNT.login)
    const [openLoginDialog, setOpenLoginDialog] = useState(false)
    const value = {
        isLoggedIn,
        openLoginDialog,
        handleOpenLoginDialog,
        handleGotoLogin,
        handleGotoCreateAccount,
        loginOrCreateAccount,
    }

    function handleOpenLoginDialog() {
        setOpenLoginDialog(true)
    }

    function handleGotoLogin() {
        setLoginOrCreateAccount(LOGIN_CREATE_ACCOUNT.login)
    }
    function handleGotoCreateAccount() {
        setLoginOrCreateAccount(LOGIN_CREATE_ACCOUNT.createAccount)
    }

    return (
        <LoginInCreateAccountContext.Provider value={value}>
            {children}
        </LoginInCreateAccountContext.Provider>
    );
};

export const useLoginInCreateAccountContext = () => useContext(LoginInCreateAccountContext);
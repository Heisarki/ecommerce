"use client";
import { LOGIN_CREATE_ACCOUNT } from "@/constants/common";
import { tLoginInCreateAccountContext, tUserDetails, tAuthInputData } from "@/types";
import {
    createContext,
    useContext,
    Dispatch,
    SetStateAction,
    useState,
    ReactNode,
    useEffect,
    useLayoutEffect,
} from "react";
import { auth } from '../../config'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { userDetailsInitialData, authInputInitialData } from "./loginCreateAccountInitialData";
import { toast } from "sonner";
import { useLocalStorage } from "@/hooks";

const LoginInCreateAccountContext = createContext({} as tLoginInCreateAccountContext);

export const LoginInCreateAccountContextProvider = ({
    children
}: {
    children: ReactNode
}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    // useLocalStorage("_ecom_is_logged_in", false)
    const [userDetails, setUserDetails] = useState(userDetailsInitialData as tUserDetails)
    const [loginOrCreateAccount, setLoginOrCreateAccount] = useState(LOGIN_CREATE_ACCOUNT.login)
    const [openLoginDialog, setOpenLoginDialog] = useState(false)
    const [authInputData, setAuthInputData] = useState(authInputInitialData as tAuthInputData)
    const value = {
        isLoggedIn,
        openLoginDialog,
        handleOpenLoginDialog,
        handleGotoLogin,
        handleGotoCreateAccount,
        loginOrCreateAccount,
        authInputData,
        handleLogin,
        handleEmailPhoneNoChange,
        handleCurrentPasswordChange,
        handleCreateAccount,
        handleConfirmPasswordChange,
        handleFirstNameChange,
        handleLastNameChange,
        handleLogout,
        userDetails,
    }

    async function checkIfUserLoggedIn() {
        try {
            const response = await onAuthStateChanged(auth, (user: any) => {
                console.log(user)
                if (user) {
                    setIsLoggedIn(true)
                    console.log("USER", user)
                    setUserDetails((prev: tUserDetails) => ({
                        ...prev,
                        email: user?.email,
                        id: user?.uid,
                    }))
                }
            })
            console.log("INITIAL", response)
        }
        catch (err: any) {
            console.log(err)
        }
    }
    useLayoutEffect(() => {
        checkIfUserLoggedIn();
        return () => {
            checkIfUserLoggedIn();
        }
    }, [])

    useEffect(() => {
        console.log("USER DE", userDetails)
    }, [userDetails])

    function handleOpenLoginDialog() {
        setOpenLoginDialog(true)
    }

    function handleGotoLogin() {
        setLoginOrCreateAccount(LOGIN_CREATE_ACCOUNT.login)
    }
    function handleGotoCreateAccount() {
        setLoginOrCreateAccount(LOGIN_CREATE_ACCOUNT.createAccount)
    }

    /**
     * Handling input change
     */
    function handleEmailPhoneNoChange(e: any) {
        setAuthInputData((prev: tAuthInputData) => ({
            ...prev,
            emailOrPhoneNo: e.target.value.trim()
        }))
    }
    function handleCurrentPasswordChange(e: any) {
        setAuthInputData((prev: tAuthInputData) => ({
            ...prev,
            currentPassword: e.target.value.trim()
        }))
    }
    function handleConfirmPasswordChange(e: any) {
        setAuthInputData((prev: tAuthInputData) => ({
            ...prev,
            confirmPassword: e.target.value.trim()
        }))
    }
    function handleFirstNameChange(e: any) {
        setAuthInputData((prev: tAuthInputData) => ({
            ...prev,
            firstName: e.target.value.trim()
        }))
    }
    function handleLastNameChange(e: any) {
        setAuthInputData((prev: tAuthInputData) => ({
            ...prev,
            lastName: e.target.value.trim()
        }))
    }
    /**
     * Login handler function
     */
    async function handleLogin() {
        console.log(authInputData)
        if (authInputData.emailOrPhoneNo === "" || authInputData.currentPassword === "")
            return;
        setAuthInputData((prev: any) => ({
            ...prev,
            isLoggedInCreateAccountClick: true,
        }))
        try {
            const response: any = await signInWithEmailAndPassword(auth, authInputData.emailOrPhoneNo, authInputData.currentPassword)
            console.log("CREATE ACC", response)
            setAuthInputData(authInputInitialData)
            setOpenLoginDialog(false)
            toast(`Login successfull with ${response?.user?.email}`)
            setUserDetails((prev: tUserDetails) => ({
                ...prev,
                email: response?.user?.email,
                id: response?.user?.uid,
            }))
        } catch (err: any) {
            console.log("CREATE ACC", err.message)
            toast(err.message)
            setAuthInputData((prev: any) => ({
                ...prev,
                isLoggedInCreateAccountClick: false,
            }))
        }
    }
    /**
    * Create account handler function
    */
    async function handleCreateAccount() {
        console.log(authInputData)
        if (authInputData.emailOrPhoneNo === "" || authInputData.currentPassword === "" || authInputData.confirmPassword === "")
            return;
        setAuthInputData((prev: any) => ({
            ...prev,
            isLoggedInCreateAccountClick: true,
        }))
        try {
            const response = await createUserWithEmailAndPassword(auth, authInputData.emailOrPhoneNo, authInputData.currentPassword)
            console.log("CREATE ACC", response)
            setAuthInputData(authInputInitialData)
            setOpenLoginDialog(false)
            toast("Account created successfully!")
            setUserDetails({
                ...userDetails,
                id: response?.user?.uid,
                email: response?.user?.email || "",
            })
        } catch (err: any) {
            console.log("CREATE ACC", err.message)
            toast(err.message)
            setAuthInputData((prev: any) => ({
                ...prev,
                isLoggedInCreateAccountClick: false,
            }))
        }
    }
    /**
     * Handleing logout
     */
    async function handleLogout() {
        try {
            const response = await signOut(auth);
            console.log("SIGNOUT", response)
            checkIfUserLoggedIn()
            setIsLoggedIn(false)
            toast("Logout successfull!")
            setUserDetails(userDetailsInitialData)
        } catch (err: any) {
            checkIfUserLoggedIn()
            console.log(err)
            toast(err?.message)
        }
    }

    return (
        <LoginInCreateAccountContext.Provider value={value}>
            {children}
        </LoginInCreateAccountContext.Provider>
    );
};

export const useLoginInCreateAccountContext = () => useContext(LoginInCreateAccountContext);
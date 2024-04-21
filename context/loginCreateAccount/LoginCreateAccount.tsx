"use client";
import { LOGIN_CREATE_ACCOUNT, ROUTES } from "@/constants/common";
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
import { initialUserDetailsData, initialAuthInputData } from "./initialLoginCreateAccountData";
import { toast } from "sonner";
import { useLocalStorage } from "@/hooks";
import LoginCreateAccountDialog from "@/components/loginCreateAccount/LoginCreateAccountDialog";
import { SubmitHandler, useForm } from "react-hook-form";
import useNavigateTo from "@/hooks/useNavigateTo";

const LoginInCreateAccountContext = createContext({} as tLoginInCreateAccountContext);

export const LoginInCreateAccountContextProvider = ({
    children
}: {
    children: ReactNode
}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    // useLocalStorage("_ecom_is_logged_in", false)
    const [userDetails, setUserDetails] = useState(initialUserDetailsData as tUserDetails)
    const [loginOrCreateAccount, setLoginOrCreateAccount] = useState(LOGIN_CREATE_ACCOUNT.login)
    const [openLoginDialog, setOpenLoginDialog] = useState(false)
    const {
        register: authInputData,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        reset
    } = useForm<tAuthInputData>({
        defaultValues: initialAuthInputData
    })
    const { navigate } = useNavigateTo();
    const value = {
        isLoggedIn,
        openLoginDialog,
        handleOpenLoginDialog,
        handleCloseLoginDialog,
        handleGotoLogin,
        handleGotoCreateAccount,
        loginOrCreateAccount,
        handleLogin,
        handleCreateAccount,
        errors,
        authInputData,
        handleSubmit,
        setValue,
        watch,

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
    function handleCloseLoginDialog() {
        setOpenLoginDialog(false)
    }

    function handleGotoLogin() {
        setLoginOrCreateAccount(LOGIN_CREATE_ACCOUNT.login)
    }
    function handleGotoCreateAccount() {
        setLoginOrCreateAccount(LOGIN_CREATE_ACCOUNT.createAccount)
    }

    /**
     * Login handler function
     */
    async function handleLogin(data: any) {
        console.log(data)
        setValue('isLoggedInCreateAccountClick', true)
        try {
            const response: any = await signInWithEmailAndPassword(auth, data.emailOrPhoneNo, data.currentPassword)
            console.log("CREATE ACC", response)
            // setAuthInputData(initialAuthInputData)
            setOpenLoginDialog(false)
            toast(`Login successfull with ${response?.user?.email}`)
            setUserDetails((prev: tUserDetails) => ({
                ...prev,
                email: response?.user?.email,
                id: response?.user?.uid,
            }))
            reset();
        } catch (err: any) {
            console.log("CREATE ACC", err.message)
            toast(err.message)
        }
        setValue('isLoggedInCreateAccountClick', false)
    }
    /**
    * Create account handler function
    */
    async function handleCreateAccount(data: any) {
        // console.log(authInputData)
        setValue('isLoggedInCreateAccountClick', true)
        if (data.currentPassword !== data.confirmPassword) {
            setValue('isLoggedInCreateAccountClick', false)
            toast("Password do not match")
            return
        }
        try {
            const response = await createUserWithEmailAndPassword(auth, data.emailOrPhoneNo, data.currentPassword)
            setOpenLoginDialog(false)
            toast("Account created successfully!")
            setUserDetails({
                ...userDetails,
                id: response?.user?.uid,
                email: response?.user?.email || "",
            })
            reset();
        } catch (err: any) {
            console.log("CREATE ACC", err.message)
            toast(err.message)
        }
        setValue('isLoggedInCreateAccountClick', false)

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
            setUserDetails(initialUserDetailsData)
            navigate(ROUTES.home.route)
        } catch (err: any) {
            checkIfUserLoggedIn()
            console.log(err)
            toast(err?.message)
        }
    }

    return (
        <LoginInCreateAccountContext.Provider value={value}>
            {children}
            <LoginCreateAccountDialog />
        </LoginInCreateAccountContext.Provider>
    );
};

export const useLoginInCreateAccountContext = () => useContext(LoginInCreateAccountContext);
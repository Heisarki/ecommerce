"use client";
import { COLLECTION_NAME, LOGIN_CREATE_ACCOUNT, ROUTES } from "@/constants/common";
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
import { initialUserDetailsData, initialAuthInputData, initialProfileData } from "./initialLoginCreateAccountData";
import { toast } from "sonner";
import { useLocalStorage } from "@/hooks";
import LoginCreateAccountDialog from "@/components/loginCreateAccount/LoginCreateAccountDialog";
import { SubmitHandler, useForm } from "react-hook-form";
import useNavigateTo from "@/hooks/useNavigateTo";
import { v4 } from "uuid"
import { getUserData, saveData, updateData } from "@/api/crud";

const LoginInCreateAccountContext = createContext({} as tLoginInCreateAccountContext);

export const LoginInCreateAccountContextProvider = ({
    children
}: {
    children: ReactNode
}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    // useLocalStorage("_ecom_is_logged_in", false)
    const [userDetails, setUserDetails] = useLocalStorage("_ecom_user_details", initialUserDetailsData as tUserDetails)
    const [loginOrCreateAccount, setLoginOrCreateAccount] = useState(LOGIN_CREATE_ACCOUNT.login)
    const [openLoginDialog, setOpenLoginDialog] = useState(false)
    const [editProfileFlag, setEditProfileFlag] = useState(false)
    const {
        register: profileUpdateData,
        handleSubmit: handleSubmitProfileUpdate,
        formState: { errors: errorsProfileUpdate },
        setValue: setValueProfileUpdate,
        watch: watchProfileUpdate,
        reset: resetProfileUpdate
    } = useForm<tUserDetails>({
        defaultValues: initialProfileData
    })
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

        editProfileFlag,
        profileUpdateData,
        handleSubmitProfileUpdate,
        errorsProfileUpdate,
        setValueProfileUpdate,
        watchProfileUpdate,
        resetProfileUpdate,

        handleEditProfile,
        handleCancelEditProfile,
        handleSaveEditProfile,
        handleUploadProfilePhoto,
    }

    useEffect(() => {
        if (userDetails?.email)
            resetProfileUpdate(userDetails)
    }, [userDetails])

    function handleUploadProfilePhoto(e: any) {
        const file = e.target.files[0];
        const reader: any = new FileReader();

        reader.onloadend = () => {
            // Set the image preview to the data URL of the selected image
            setValueProfileUpdate("photoURL", reader?.result)
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    function handleEditProfile() {
        console.log("PROFILE", profileUpdateData)
        // resetProfileUpdate(userDetails)
        setEditProfileFlag(true)
    }
    function handleCancelEditProfile() {
        setEditProfileFlag(false)
        resetProfileUpdate(userDetails)
    }
    async function handleSaveEditProfile(data: any) {
        console.log("PROFILE", data)
        const response = await updateData(
            userDetails.id,
            COLLECTION_NAME.USERS,
            {
                [userDetails.id]: data
            }
        )
        if (response) {
            toast.success("Details updated!")
            setUserDetails(data)
        } else {
            resetProfileUpdate(userDetails)
            toast.error("Updating failed! Try again")
        }

        setEditProfileFlag(false)
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
                } else {
                    setUserDetails(initialUserDetailsData)
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
            console.log("USER LOG IN", response)
            // setAuthInputData(initialAuthInputData)
            setOpenLoginDialog(false)
            toast(`Login successfull with ${response?.user?.email}`)
            // setUserDetails((prev: tUserDetails) => ({
            //     ...prev,
            //     email: response?.user?.email,
            //     id: response?.user?.uid,
            // }))
            reset();
            const userResponse = await getUserData(
                response?.user?.uid,
                COLLECTION_NAME.USERS
            )
            if (userResponse) {
                console.log("USER INFOR", userResponse?.[0])
                setUserDetails(userResponse?.[0])
            }

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
            // setUserDetails({
            //     ...userDetails,
            //     id: response?.user?.uid,
            //     email: response?.user?.email || "",
            // })
            reset();

            const timestamp = Date.now()
            const user: tUserDetails = {
                firstName: data.firstName,
                lastName: data.lastName,
                email: response?.user?.email,
                id: response?.user?.uid,
                photoURL: "",
                createdAt: timestamp,
                updatedAt: timestamp,
            }
            setUserDetails(user)
            const userResponse = await saveData(
                response?.user?.uid,
                COLLECTION_NAME.USERS,
                {
                    [response?.user?.uid]: user
                }
            );
            if (!userResponse) {
                toast("Something went wrong!")
                setValue('isLoggedInCreateAccountClick', false)
                return
            }

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
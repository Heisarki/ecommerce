export type tLoginInCreateAccountContext = {
    isLoggedIn: boolean,
    openLoginDialog: boolean,
    handleOpenLoginDialog: () => void,
    handleGotoCreateAccount: () => void,
    handleGotoLogin: () => void,
    loginOrCreateAccount: string,
    authInputData: tAuthInputData,
    handleLogin: (e:any) => void,
    handleEmailPhoneNoChange:(e:any) => void,
    handleCurrentPasswordChange: (e: any) => void,
    handleCreateAccount: (e: any) => void,
    handleConfirmPasswordChange: (e: any) => void,
    handleFirstNameChange: (e: any) => void,
    handleLastNameChange: (e: any) => void,
    handleLogout: () => void,
    userDetails: tUserDetails,
}

export type tAuthInputData = {
    emailOrPhoneNo: string,
    currentPassword: string,
    confirmPassword: string,
    firstName: string,
    lastName: string,
    isLoggedInCreateAccountClick: boolean,
}

export type tUserDetails = {
    id: string,
    email: string,
    firstName: string,
    lastname: string,
    userProfile: string,
}
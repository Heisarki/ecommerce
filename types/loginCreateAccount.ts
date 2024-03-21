export type tLoginInCreateAccountContext = {
    isLoggedIn: boolean,
    openLoginDialog: boolean,
    handleOpenLoginDialog: () => void,
    handleGotoCreateAccount: () => void,
    handleGotoLogin: () => void,
    loginOrCreateAccount: string,
}
import { AddressIcon, CartIcon, HomeIcon, OrdersIcon, ProfileIcon } from "."

export const LOGIN_CREATE_ACCOUNT = {
    login: "LOGIN",
    createAccount : "CREATE_ACCOUNT",
}

export const MOBILE_FOOTER_NAV_LIST = [
    {
        id: 1,
        title: "Home",
        icon: HomeIcon,
        route: "/",
    },
    {
        id: 2,
        title: "orders",
        icon: OrdersIcon,
        route: "/orders",
    },
    {
        id: 3,
        title: "Cart",
        icon: CartIcon,
        route: "/cart",
    },
]

export const ROUTES = {
    home: {
        id: 1,
        title: "Home",
        icon: HomeIcon,
        route: "/",
    },
    cart: {
        id: 3,
        title: "Cart",
        icon: CartIcon,
        route: "/cart",
    },
    orders: {
        id: 2,
        title: "orders",
        icon: OrdersIcon,
        route: "/orders",
    },
    profile: {
        id: 4,
        title: "Profile",
        icon: ProfileIcon,
        route: "/profile",
    },
    address: {
        id: 5,
        title: "Address",
        icon: AddressIcon,
        route: "/address",
    }
}





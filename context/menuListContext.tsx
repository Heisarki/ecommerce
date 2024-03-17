"use client";
import { getAllProductListAPI, getCategoryProductListAPI } from "@/api/get-product-list";
import { CATEGORY } from "@/constants/category";
import { tCategory, tMenuListContext, tProduct } from "@/types";
import { tCartContext, tCartItem } from "@/types/cartContextType";
import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";
import { useCartContext } from "./cartContext";
import { getItemDataFromCart } from "@/utils";

const MenuListContext = createContext({} as tMenuListContext);

export const MenuListContextProvider = ({
    children
}: {
    children: ReactNode
}) => {
    const { cartItems, setCartItems }: tCartContext = useCartContext()
    const [categoryList, setCategoryList] = useState(CATEGORY as tCategory[])
    const [selectedCategory, setSelectedCategory] = useState({} as tCategory)
    const [productList, setProductList] = useState([] as tProduct[])
    const value = {
        productList, setProductList,
        categoryList, setCategoryList,
        selectedCategory, setSelectedCategory,
        handleClickCategory,
        handleAddToCart,
        handleIncrement,
        handleDecrement,
    }

    /**
     * Function to handle on clicking 
     * category and listing the product
     * from this category
     */
    async function handleClickCategory(e: any) {
        setProductList([])
        const id = e.target.getAttribute("data-id")
        const selectedCategoryTemp = categoryList.filter((categoryEle: tCategory) => categoryEle.id === id)[0]
        setSelectedCategory(selectedCategoryTemp)
        const res: any = await getCategoryProductListAPI(selectedCategoryTemp?.name)
        console.log("RES", res)
        if (res.status)
            setProductList(getItemDataFromCart(res.data, cartItems))
    }

    /**
     * Funtions to perform add item,
     * increment, decrement item to cart
     */
    function handleAddToCart(e: any) {
        const id = e.target.getAttribute("data-id")
        const itemToAddToCart: tCartItem | any = productList.find((itemEle: tProduct) => String(itemEle.id) === String(id))
        if (itemToAddToCart) {
            setCartItems([
                ...cartItems,
                {
                    ...itemToAddToCart,
                    qty: 1
                }
            ])
            setProductList(productList.map((itemEle: tProduct) => {
                if (String(itemEle.id) === String(id))
                    return { ...itemEle, qty: 1 }
                return { ...itemEle }
            }))
        }
    }
    function handleIncrement(e: any) {
        const id = e.target.getAttribute("data-id")

        setCartItems(cartItems.map((itemEle: tCartItem) => {
            if (String(itemEle.id) === String(id))
                return { ...itemEle, qty: itemEle.qty + 1 }
            return { ...itemEle }
        }))
        setProductList(productList.map((itemEle: tProduct) => {
            if (String(itemEle.id) === String(id))
                return { ...itemEle, qty: itemEle.qty + 1 }
            return { ...itemEle }
        }))
    }
    function handleDecrement(e: any) {
        const id = e.target.getAttribute("data-id")
        const itemToAddToCart: tCartItem | any = productList.find((itemEle: tProduct) => String(itemEle.id) === String(id))
        if (itemToAddToCart) {
            if (itemToAddToCart.qty === 1) {
                setCartItems(cartItems.filter((itemEle: tCartItem) => String(itemEle.id) !== String(id)))
            } else {
                setCartItems(cartItems.map((itemEle: tCartItem) => {
                    if (String(itemEle.id) === String(id))
                        return { ...itemEle, qty: itemEle.qty - 1 }
                    return { ...itemEle }
                }))
            }
            setProductList(productList.map((itemEle: tProduct) => {
                if (String(itemEle.id) === String(id))
                    return { ...itemEle, qty: itemEle.qty - 1 }
                return { ...itemEle }
            }))
        }
    }

    /**
     * side effect to get all product list 
     * on loading of app
     */
    useEffect(() => {
        async function getAllProductList() {
            const res: any = await getAllProductListAPI()
            console.log("RES", res)
            if (res.status)
                setProductList(getItemDataFromCart(res.data, cartItems))
        }
        getAllProductList()
    }, [])
    useEffect(() => {
        console.log("CART", cartItems)
    }, [cartItems])

    return (
        <MenuListContext.Provider value={value}>
            {children}
        </MenuListContext.Provider>
    );
};

export const useMenuListContext = () => useContext(MenuListContext);


// "use client";
// import { tMenuListContext } from "@/types";
// import {
//     createContext,
//     useContext,
//     Dispatch,
//     SetStateAction,
//     useState,
//     ReactNode,
// } from "react";

// const MenuListContext = createContext({} as tMenuListContext);

// export const HomeContMenuListContext = ({
//     children
// }: {
//     children: ReactNode
// }) => {
//     const value = {
//     }

//     return (
//         <MenuListContext.Provider value={value}>
//             {children}
//         </MenuListContext.Provider>
//     );
// };

// export const useMenuListContext = () => useContext(MenuListContext);
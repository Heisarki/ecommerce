"use client";
import { getAllProductListAPI, getCategoryProductListAPI } from "@/api/get-product-list";
import { CATEGORY } from "@/constants/category";
import { tCategory, tMenuListContext, tOnAddingItemEffect, tProduct, tProductList } from "@/types";
import { tCartContext, tCartItem } from "@/types/cartContextType";
import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";
import { useCartContext } from "../cartContext/cartContext";
import { OnAddingAnimationEffect, getItemDataFromCart } from "@/utils";
import { toast } from "sonner"

const MenuListContext = createContext({} as tMenuListContext);

export const MenuListContextProvider = ({
    children
}: {
    children: ReactNode
}) => {
    const { cartItems, setCartItems }: tCartContext = useCartContext()
    const [categoryList, setCategoryList] = useState(CATEGORY as tCategory[])
    const [selectedCategory, setSelectedCategory] = useState({} as tCategory)
    const [productList, setProductList] = useState({ isLoading: true, data: [], error: { code: 0, message: "" } } as tProductList)
    const [filteredProductList, setFilteredProductList] = useState({ isLoading: true, data: [], error: { code: 0, message: "" } } as tProductList)
    const [searchValue, setSearchValue] = useState("")
    const [onAddingItemEffect, setOnAddingAnimationEffect] = useState({} as tOnAddingItemEffect)
    const value = {
        productList, setProductList,
        filteredProductList, setFilteredProductList,
        categoryList, setCategoryList,
        selectedCategory, setSelectedCategory,
        handleClickCategory,
        handleAddToCart,
        handleIncrement,
        handleDecrement,
        searchValue,
        handleOnChangeSearch,
        onAddingItemEffect,
    }

    /**
     * Function to handle on clicking 
     * category and listing the product
     * from this category
     */
    async function handleClickCategory(e: any) {
        setProductList({ ...productList, isLoading: true, data: [] })
        setFilteredProductList({ ...productList, isLoading: true, data: [] })
        const id = e.target.getAttribute("data-id")
        const selectedCategoryTemp = categoryList.filter((categoryEle: tCategory) => categoryEle.id === id)[0]
        setSelectedCategory(selectedCategoryTemp)
        const res: any = await getCategoryProductListAPI(selectedCategoryTemp?.name)
        console.log("RES", res)
        if (res.status) {
            const processedItemList = getItemDataFromCart(res.data, cartItems)
            setProductList({ ...productList, isLoading: false, data: processedItemList })
            setFilteredProductList({ ...productList, isLoading: false, data: processedItemList })
        } else {
            setProductList({ error: { code: 502, message: "502 Bad gateway" }, isLoading: false, data: [] })
            setFilteredProductList({ error: { code: 502, message: "502 Bad gateway" }, isLoading: false, data: [] })
        }
    }

    /**
     * Funtions to perform add item,
     * increment, decrement item to cart
     */
    function handleAddToCart(id: string | number) {
        const itemToAddToCart: tCartItem | any = productList.data.find((itemEle: tProduct) => String(itemEle.id) === String(id))
        console.log(itemToAddToCart)
        // toast(`${cartItems.length === 1 ? "1 item" : cartItems.length + " items"} added to cart`)
        toast(`${itemToAddToCart.title} added to cart`)
        if (itemToAddToCart) {
            setCartItems([
                ...cartItems,
                {
                    ...itemToAddToCart,
                    qty: 1
                }
            ])
            const modifiedProductList = {
                ...productList,
                isLoading: false,
                data: productList.data.map((itemEle: tProduct) => {
                    if (String(itemEle.id) === String(id))
                        return { ...itemEle, qty: 1 }
                    return { ...itemEle }
                })
            }
            setProductList(modifiedProductList)
            setFilteredProductList(modifiedProductList)
        }
        // animation effect
        OnAddingAnimationEffect(id, setOnAddingAnimationEffect);
    }
    function handleIncrement(id: string | number) {
        setCartItems(cartItems.map((itemEle: tCartItem) => {
            if (String(itemEle.id) === String(id))
                return { ...itemEle, qty: itemEle.qty + 1 }
            return { ...itemEle }
        }))
        const modifiedProductList = {
            ...productList,
            isLoading: false,
            data: productList.data.map((itemEle: tProduct) => {
                if (String(itemEle.id) === String(id))
                    return { ...itemEle, qty: itemEle.qty + 1 }
                return { ...itemEle }
            })
        }
        setProductList(modifiedProductList)
        setFilteredProductList(modifiedProductList)
        // animation effect
        OnAddingAnimationEffect(id, setOnAddingAnimationEffect);
    }
    function handleDecrement(id: string | number) {
        const itemToAddToCart: tCartItem | any = productList.data.find((itemEle: tProduct) => String(itemEle.id) === String(id))
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
            const modifiedProductList = {
                ...productList,
                isLoading: false,
                data: productList.data.map((itemEle: tProduct) => {
                    if (String(itemEle.id) === String(id))
                        return { ...itemEle, qty: itemEle.qty - 1 }
                    return { ...itemEle }
                })
            }
            setProductList(modifiedProductList)
            setFilteredProductList(modifiedProductList)
        }
        // animation effect
        OnAddingAnimationEffect(id, setOnAddingAnimationEffect);
    }

    /**
     * Function to handle search product
     */
    function handleOnChangeSearch(e: any) {
        setFilteredProductList({ ...productList, isLoading: true, data: [] })
        const value = e.target.value
        setSearchValue(value)
        // setTimeout(() => {
        const lowercaseQuery = value.toLowerCase();
        // Filter items based on whether they include the query in their title or description
        const filteredItems = productList.data.filter(item => {
            const lowercaseName = item.title.toLowerCase();
            const lowercaseDescription = item.description.toLowerCase();
            return lowercaseName.includes(lowercaseQuery) || lowercaseDescription.includes(lowercaseQuery);
        });
        setFilteredProductList({ ...productList, isLoading: false, data: filteredItems })
        console.log("Now")
        // }, 1000)
    }

    /**
     * side effect to get all product list 
     * on loading of app
     */
    useEffect(() => {
        async function getAllProductList() {
            const res: any = await getAllProductListAPI()
            if (res.status) {
                const processedItemList = getItemDataFromCart(res.data, cartItems)
                setProductList({ ...productList, isLoading: false, data: processedItemList })
                setFilteredProductList({ ...productList, isLoading: false, data: processedItemList })
            } else {
                setProductList({ error: { code: 502, message: "502 Bad gateway" }, isLoading: false, data: [] })
                setFilteredProductList({ error: { code: 502, message: "502 Bad gateway" }, isLoading: false, data: [] })
            }
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
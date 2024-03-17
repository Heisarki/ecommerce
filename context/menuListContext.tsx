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
import { addQtyKeyToItemListing } from "@/utils";

const MenuListContext = createContext({} as tMenuListContext);

export const MenuListContextProvider = ({
    children
}: {
    children: ReactNode
}) => {
    const [categoryList, setCategoryList] = useState(CATEGORY as tCategory[])
    const [selectedCategory, setSelectedCategory] = useState({} as tCategory)
    const [productList, setProductList] = useState([] as tProduct[])
    const value = {
        productList, setProductList,
        categoryList, setCategoryList,
        selectedCategory, setSelectedCategory,
        handleClickCategory,
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
            setProductList(addQtyKeyToItemListing(res.data))
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
                setProductList(addQtyKeyToItemListing(res.data))
        }
        getAllProductList()
    }, [])

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
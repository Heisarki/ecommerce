import { Dispatch, SetStateAction } from "react"
import { tProduct, tProductList } from "."

export type tMenuListContext = {
    productList: tProductList,
    setProductList: Dispatch<SetStateAction<tProductList>>,
    categoryList: tCategory[],
    setCategoryList: Dispatch<SetStateAction<tCategory[]>>,
    filteredProductList:tProductList,
    setFilteredProductList: Dispatch<SetStateAction<tProductList>>,
    selectedCategory: tCategory,
    setSelectedCategory: Dispatch<SetStateAction<tCategory>>,
    handleClickCategory: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
    handleAddToCart: (e: any) => void,
    handleIncrement: (e: any) => void,
    handleDecrement: (e: any) => void,
    searchValue: string,
    handleOnChangeSearch:(e: any) => void,
}

export type tCategory = {
    id: string | number,
    image: string,
    name: string,
}
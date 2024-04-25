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
    handleAddToCart: (id: string | number) => void,
    handleIncrement: (id: string | number) => void,
    handleDecrement: (id: string | number) => void,
    searchValue: string,
    handleOnChangeSearch: (e: any) => void,
    onAddingItemEffect: tOnAddingItemEffect
}

export type tCategory = {
    id: string | number,
    image: string,
    name: string,
}

export type tOnAddingItemEffect = {
    itemId: string | number,
    style: any
}
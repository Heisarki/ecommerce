import { Dispatch, SetStateAction } from "react"
import { tProduct } from "."

export type tMenuListContext = {
    productList: tProduct[],
    setProductList: Dispatch<SetStateAction<tProduct[]>>,
    categoryList: tCategory[],
    setCategoryList: Dispatch<SetStateAction<tCategory[]>>,
    selectedCategory: tCategory,
    setSelectedCategory: Dispatch<SetStateAction<tCategory>>,
    handleClickCategory:(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
}

export type tCategory = {
    id: string | number,
    image: string,
    name: string,
}
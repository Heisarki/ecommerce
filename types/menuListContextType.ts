import { Dispatch, SetStateAction } from "react"
import { tProduct } from "."

export type tMenuListContext = {
    productList: tProduct[],
    setProductList: Dispatch<SetStateAction<tProduct[]>>,
    categoryList: tCategory[],
    setCategoryList: Dispatch<SetStateAction<tCategory[]>>,
    selectedCategory: tCategory,
    setSelectedCategory: Dispatch<SetStateAction<tCategory>>,
    handleClickCategory: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
    handleAddToCart: (e: any) => void,
    handleIncrement: (e: any) => void,
    handleDecrement: (e: any) => void,
}

export type tCategory = {
    id: string | number,
    image: string,
    name: string,
}
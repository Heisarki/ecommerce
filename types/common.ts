export type tProduct = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
      rate: number;
      count: number;
  };
  qty: number;
};

export type tProductList = {
  data: tProduct[],
  isLoading: boolean,
  error: {
    code: number | string,
    message: string,
  }
}

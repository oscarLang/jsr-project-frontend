export interface IStockHistory {
    price: number;
}

export interface IStock {
    name: string;
    price: string;
    quantity: number;
    rate: number;
    stock: string;
    varience: number;
    history: IStockHistory[];
}
  
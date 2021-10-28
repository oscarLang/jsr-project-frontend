export interface IStockHistory {
    price: string;
    date: Date;
    formatedDate: string;
}

export interface IStock {
    ticker: string;
    name: string;
    ceo: string;
    catchPhrase: string;
    price: string;
    quantity: number;
    volatility: number;
    amount: number;
    buyPrice: string;
    minutly: IStockHistory[];
    hourly: IStockHistory[];
    daily: IStockHistory[];
}
  
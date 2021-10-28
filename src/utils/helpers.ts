import { IStock } from "./types";

export const getChangeOfStock = (stock: IStock): number => {
    const newPrice = Number(stock.price);
    if(!stock.daily) {
        return 0;
    }
    const old = Number(stock.hourly.slice(-1)[0].price);
    console.log(old);
    return ((newPrice - old) / old) * 100;
};
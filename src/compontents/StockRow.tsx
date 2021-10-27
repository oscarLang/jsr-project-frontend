import React from "react";
import { Button, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { IStock } from "../utils/types";
import { useHistory } from "react-router-dom";
import { useModal } from "mui-modal-provider";
import BuyDialog from "./BuyDialog";
import { socket } from "../App";
interface IProps {
  row: IStock;
  alternativeLayout: boolean;
}

const StockRow: React.FC<IProps> = ({row, alternativeLayout}) => {
    const [color, setColor] = React.useState("black");
    const [stock, updateStockValues] = React.useState<IStock>(row);
    const history = useHistory();
    const { showModal } = useModal();
    React.useEffect(() => {
        socket.on(`marketChange${row.ticker}`, item => {
            updateStockValues({...stock, price: item.price});
            setColor(item.changePositive ? "green" : "red");
            setTimeout(() => {
               setColor("black"); 
            }, 5000);
        });
    }, []);

    const handleOpenSellDialog = () => {
        console.log("sell");
    };

    const getChangeOfStock = (): number => {
        const newPrice = Number(stock.price);
        const old = Number(stock.daily.slice(-1)[0].price);
        return ((newPrice - old) / old) * 100;
    };

    const changeOfStock = Number(getChangeOfStock().toFixed(0));

    return (
        <TableRow>
            <TableCell component="th" scope="row" onClick={() => history.push(`/stocks/${stock.ticker}`)}>
            {stock.ticker}
            </TableCell>
            <TableCell>{stock.name}</TableCell>
            <TableCell style={{ color: color }} align="right">
                ${parseFloat(stock.price).toFixed(2)}
            </TableCell>
            <TableCell align="right" style={{ color: `${(changeOfStock < 0) ? "red" : "green"}` }}>{changeOfStock}%</TableCell>
            <TableCell align="right">
                <Button onClick={handleOpenSellDialog}>
                    Sell
                </Button>
                <Button onClick={() => showModal(BuyDialog, { stock: stock })}>
                    Buy
                </Button>
            </TableCell>
        </TableRow>
    );
}

export default StockRow;
import React from "react";
import { Button, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { IStock } from "../utils/types";
import { useHistory } from "react-router-dom";
import { useModal } from "mui-modal-provider";
import BuyDialog from "./BuyDialog";
import { socket } from "../App";
import SellDialog from "./SellDialog";
import { getChangeOfStock } from "../utils/helpers";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
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
        return () => {
            socket.removeAllListeners(`marketChange${row.ticker}`);
        }
    }, []);
    let changeOfStock = 0;
    if (!alternativeLayout) {
        changeOfStock = Number(getChangeOfStock(row).toFixed(0));
    } else {
        changeOfStock = ((Number(row.price) - Number(row.buyPrice)) / Number(row.buyPrice)) * 100;
    }

    const push = (): void => {
        history.push(`/stocks/${stock.ticker}`);
    };

    return (
        <TableRow>
            <TableCell component="th" scope="row" onClick={() => push()}>
                <OpenInFullIcon color="primary"/>
            </TableCell>
            <TableCell component="th" scope="row" onClick={() => push()}>
                {stock.ticker}
            </TableCell>
            {alternativeLayout ? (
                <TableCell component="th" scope="row" onClick={() => push()}>
                    ${parseFloat(stock.buyPrice).toFixed(2)}
                </TableCell>
            ) : (
                <TableCell component="th" scope="row" onClick={() => push()}>
                    {stock.name}
                </TableCell>
            )}
            <TableCell style={{ color: color }} align="right">
                ${parseFloat(stock.price).toFixed(2)}
            </TableCell>
            {!alternativeLayout ? (
                <TableCell align="right" style={{ color: `${(changeOfStock < 0) ? "red" : "green"}` }}>{changeOfStock}%</TableCell>
                ) : (
                    <>
                    <TableCell align="right" style={{ color: `${(changeOfStock < 0) ? "red" : "green"}` }}>{changeOfStock.toFixed(0)}%</TableCell>
                    <TableCell align="right" >{stock.amount}pcs</TableCell>
                </>
            )}
            <TableCell align="right">
                <Button color="error" onClick={() => showModal(SellDialog, { stock: stock })}>
                    Sell
                </Button>
                <Button color="success" onClick={() => showModal(BuyDialog, { stock: stock })}>
                    Buy
                </Button>
            </TableCell>
        </TableRow>
    );
}

export default StockRow;
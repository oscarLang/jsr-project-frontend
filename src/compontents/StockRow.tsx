import React from "react";
import { Button, CircularProgress, IconButton, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { IStock, IStockHistory } from "../utils/types";
import Chart from "./Chart";
import { fade } from "material-ui/utils/colorManipulator";

interface IProps {
  row: IStock;
  alternativeLayout: boolean;
}

const StockRow: React.FC<IProps> = ({row, alternativeLayout}) => {
    const [fade, setFade] = React.useState(0);
    const [color, setColor] = React.useState("Green");
    React.useEffect(() => {
        setFade(1);
    }, [row]);

    const handleOpenBuyDialog = () => {
        console.log("buy");
    };

    const handleOpenSellDialog = () => {
        console.log("sell");
    };

    return (
        <TableRow>
            <TableCell component="th" scope="row">
            {row.stock}
            </TableCell>
            <TableCell align="right">{row.name}</TableCell>
            <TableCell className={"fade" + color} align="right">
                {row.price}
            </TableCell>
            {alternativeLayout &&
                <TableCell align="right" style={{ color: "green" }}>{"0%"}</TableCell>
            }
            <TableCell align="right">
                {!alternativeLayout &&
                    <Button onClick={handleOpenBuyDialog}>
                    Buy
                    </Button>
                }
                <Button onClick={handleOpenSellDialog}>
                    Sell
                </Button>
            </TableCell>
        </TableRow>
    );
}

export default StockRow;
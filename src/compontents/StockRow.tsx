import React from "react";
import { Button, CircularProgress, IconButton, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { IStock, IStockHistory } from "../utils/types";
import Chart from "./Chart";
import { fade } from "material-ui/utils/colorManipulator";
import { useHistory } from "react-router-dom";
import { useModal } from "mui-modal-provider";
import BuyDialog from "./BuyDialog";

interface IProps {
  row: IStock;
  alternativeLayout: boolean;
}

const StockRow: React.FC<IProps> = ({row, alternativeLayout}) => {
    const [fade, setFade] = React.useState(0);
    const [color, setColor] = React.useState("Green");
    const history = useHistory();
    const { showModal } = useModal();
    React.useEffect(() => {
        setFade(1);
    }, [row]);

    const handleOpenSellDialog = () => {
        console.log("sell");
    };

    return (
        <TableRow>
            <TableCell component="th" scope="row" onClick={() => history.push(`/stocks/${row.stock}`)}>
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
                    <Button onClick={handleOpenSellDialog}>
                        Sell
                    </Button>
                }
                <Button onClick={() => showModal(BuyDialog, { stock: row })}>
                Buy
                </Button>
            </TableCell>
        </TableRow>
    );
}

export default StockRow;
import React from "react";
import { Button, CircularProgress, IconButton, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { IStock, IStockHistory } from "../utils/types";
import StockRow from "./StockRow";

interface IProps {
  objects: IStock[];
  alternativeLayout: boolean;
}

const StockTable: React.FC<IProps> = ({objects, alternativeLayout = false}) => {
    return (
        <TableContainer>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>{!alternativeLayout ? "Name": "Purchase price"}</TableCell>
                <TableCell align="right">Current price($)</TableCell>
                {!alternativeLayout ?
                    (<TableCell align="right">Change(24h)</TableCell>)
                    :
                    (
                    <>
                        <TableCell align="right">Change</TableCell>
                        <TableCell align="right">Amount</TableCell>
                    </>
                    )
                }
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {objects && objects.map((row) => (
                <StockRow row={row} alternativeLayout={alternativeLayout}/>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    );
}

export default StockTable;
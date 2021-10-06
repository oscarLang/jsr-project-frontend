import React from "react";
import { Button, CircularProgress, IconButton, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { IStock, IStockHistory } from "../utils/types";
import StockRow from "./StockRow";

interface IProps {
  objects: IStock[];
}

const StockTable: React.FC<IProps> = ({objects}) => {
    const [alternativeLayout, setLayout] = React.useState(true);
    React.useEffect(() => {
        if(objects.length) {
            if ('buyPrice' in objects[0]) {
                setLayout(true)
            }
        }
    }, [objects]);
    
    if (!objects) {
      return <CircularProgress />
    }
    return (
        <TableContainer>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell>Stock</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Current price($)</TableCell>
                {alternativeLayout &&
                    <TableCell align="right">Change</TableCell>
                }
                <TableCell align="right">Action</TableCell>
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
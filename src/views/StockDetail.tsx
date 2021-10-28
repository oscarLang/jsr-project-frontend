import React, { useContext, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Grid, Card, Paper, CardActions, CardContent } from '@mui/material';
import Login from '../compontents/Login';
import Chart from '../compontents/Chart';
import apiRequest from '../utils/apiRequest';
import { IStock } from '../utils/types';
import { ProfileContext } from '../contexts/profile';
import Profile from "../compontents/Profile";
import { useParams } from 'react-router';
import { socket } from '../App';
import { getChangeOfStock } from '../utils/helpers';
import { useModal } from "mui-modal-provider";
import SellDialog from '../compontents/SellDialog';
import BuyDialog from '../compontents/BuyDialog';


const StockDetail: React.FC = () => {
    const {
        isLoggedIn,
        profile,
        funds
        } = useContext(ProfileContext);
    const [stockItem, setStockItem] = React.useState<IStock>();
    const [stockPrice, setStockPrice] = React.useState("");
    const [color, setColor] = React.useState("black");
    const { showModal } = useModal();
    let { ticker } = useParams<{ticker: string}>();

    React.useEffect(() => {
        (async function() {
            const res = await apiRequest(`/market/${ticker}/`, "GET");
            setStockItem(res.data);
            setStockPrice(res.data.price);
        })();
        socket.on("minutly", items => {
            const thisStock = items.find((item: IStock) => item.ticker === ticker);
            if (thisStock) {
                console.log(thisStock);
                setStockItem(thisStock);
            }
        });
        socket.on(`marketChange${ticker}`, item => {
            console.log("ja")
            setStockPrice(item.price);
            setColor(item.changePositive ? "green" : "red");
            setTimeout(() => {
               setColor("black"); 
            }, 5000);
        });
        return () => {
            console.log("nej")
            socket.removeAllListeners(`marketChange${ticker}`);
        }
    }, []);

    const change = getChangeOfStock(stockItem || {} as IStock)

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper sx={{ padding: "1em" }}>
                    <Chart object={stockItem ? stockItem : {} as IStock} />
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" color="primary">
                            {stockItem?.ticker} - {stockItem?.name}
                        </Typography>
                        <Typography variant="subtitle1">
                            Slogan: <i>{stockItem?.catchPhrase}</i>
                        </Typography>
                        <Typography variant="subtitle1">
                            CEO: {stockItem?.ceo}
                        </Typography>
                        <Typography variant="subtitle1">
                            Volatility: {((stockItem?.volatility || 0) * 100).toFixed(2)}%
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Card>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={6}>
                                <Typography
                                    gutterBottom 
                                    variant="overline"
                                    component="p">
                                    Change(24h)
                                </Typography>
                                <Typography
                                    style={{ color: `${(change < 0) ? "red" : "green"}` }}
                                    gutterBottom 
                                    variant="h5"
                                    component="div">
                                    {change.toFixed(2)}% (24h)
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography
                                    gutterBottom 
                                    variant="overline"
                                    component="p">
                                    Latest price
                                </Typography>
                                <Typography
                                    style={{ color: color }}
                                    gutterBottom 
                                    variant="h5"
                                    component="div">
                                    ${parseFloat(stockPrice).toFixed(2)}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" fullWidth size="large" color="success"
                            onClick={() => showModal(BuyDialog, { stock: stockItem || {} as IStock })}>
                            Buy
                        </Button>
                        <Button variant="contained" fullWidth size="large" color="error"
                            onClick={() => showModal(SellDialog, { stock: stockItem || {} as IStock })}>
                            Sell
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
        
    );  
}

export default StockDetail;
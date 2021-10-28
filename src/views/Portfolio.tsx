import React, { useContext, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Grid, Card, Paper } from '@mui/material';
import Login from '../compontents/Login';
import Chart from '../compontents/Chart';
import apiRequest from '../utils/apiRequest';
import { IStock } from '../utils/types';
import StockTable from '../compontents/StockTable';
import EarningsCalendar from '../compontents/Calendar';
import { ProfileContext } from '../contexts/profile';
import Profile from "../compontents/Profile";

const Portfolio: React.FC = () => {
    const [stocks, setStocks] = React.useState<IStock[]>([]);
    React.useEffect(() => {
        (async function() {
            try {
                const userReq = await apiRequest("/user/stocks/", "GET");
                const marketReq = await apiRequest("/market/all/", "GET");
                const stocksInMarket = marketReq.data.res;
                const combined = userReq.data.stocks.filter((s: IStock) => s.amount > 0).map((s: IStock) => {
                    const stockOfUser = 
                        stocksInMarket.find((sm: IStock) => (s.name === sm.ticker));
                    return {...stockOfUser, ...s};
                });
                console.log(combined);
                setStocks(combined);

            } catch (e) {
                console.error(e);
            }
        })();
    }, []);
    return (
        <Paper sx={{padding: "1em"}}>
            <Typography variant="h6">Porfolio</Typography>
            <StockTable objects={stocks} alternativeLayout={true}/>
        </Paper>
    );  
}

export default Portfolio;
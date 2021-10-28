import React, { useContext, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Grid, Card, Paper } from '@mui/material';
import Chart from '../compontents/Chart';
import apiRequest from '../utils/apiRequest';
import { IStock } from '../utils/types';
import StockTable from '../compontents/StockTable';
import { ProfileContext } from '../contexts/profile';
const Home: React.FC = () => {
    const {
        isLoggedIn,
        profile,
        funds
        } = useContext(ProfileContext);
    const [stocks, setStocks] = React.useState<IStock[]>([]);
    React.useEffect(() => {
        (async function() {
            try {
                const market = await apiRequest("/market/all/", "GET");
                setStocks(market.data.res);
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);
    const random = Math.floor((Math.random() * stocks.length) + 0);
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper sx={{padding: "1em"}}>
                    <Chart object={stocks ? stocks[random] : {} as IStock}/>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper sx={{padding: "1em"}}>
                    <Typography variant="h6">Popular stocks</Typography>
                    <StockTable objects={stocks} alternativeLayout={false}/>
                </Paper>
            </Grid>
        </Grid>
    );  
}

export default Home;
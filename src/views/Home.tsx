import React, { useContext, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Grid, Card, Paper } from '@mui/material';
import Login from '../compontents/Login';
import Chart from '../compontents/Chart';
import apiRequest from '../utils/apiRequest';
import { IStock } from '../utils/types';
import StockTable from '../compontents/StockTable';
import EarningsCalendar from '../compontents/Calendar';
import { ProfileContext } from '../contexts/profile';

const Home: React.FC = () => {
    const {
        isLoggedIn,
        } = useContext(ProfileContext);
    const [stocks, setStocks] = React.useState<IStock[]>([]);

    React.useEffect(() => {
        (async function() {
            try {
                const market = await apiRequest("/market/all/", "GET");
                console.log(market);
                setStocks(market.data.res);
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);

    React.useEffect(() => {
        console.log(isLoggedIn)
    }, [isLoggedIn]);


    return (
        <div style={{margin: "auto", maxWidth: 1200  }}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Paper sx={{padding: "1em"}}>
                        <Chart object={stocks ? stocks[0] : {} as IStock}/>       
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper sx={{padding: "1em", minHeight: 320}}>
                        {(!isLoggedIn) 
                        ? (<Login />)
                        : (<div>heh</div>)}
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                    <Paper sx={{padding: "1em"}}>
                        <Typography variant="h6">Popular stocks</Typography>
                        <StockTable objects={stocks}/>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper sx={{padding: "1em"}}>
                        <EarningsCalendar />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );  
}

export default Home;
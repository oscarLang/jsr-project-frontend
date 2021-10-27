import React, { useContext, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Grid, Card, Paper } from '@mui/material';
import Login from '../compontents/Login';
import Chart from '../compontents/Chart';
import apiRequest from '../utils/apiRequest';
import { IStock } from '../utils/types';
import { ProfileContext } from '../contexts/profile';
import Profile from "../compontents/Profile";
import { useParams } from 'react-router';
import { socket } from '../App';

const StockDetail: React.FC = () => {
    const {
        isLoggedIn,
        profile,
        funds
        } = useContext(ProfileContext);
    const [stockItem, setStockItem] = React.useState<IStock>();
    let { ticker } = useParams<{ticker: string}>();

    React.useEffect(() => {
        (async function() {
            const res = await apiRequest(`/market/${ticker}/`, "GET");
            setStockItem(res.data);
        })();
        socket.on("minutly", items => {
            const thisStock = items.find((item: IStock) => item.ticker === ticker);
            if (thisStock) {
                console.log(thisStock);
                setStockItem(thisStock);
            }
        });
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper sx={{padding: "1em"}}>
                    <Chart object={stockItem ? stockItem : {} as IStock}/>       
                </Paper>
            </Grid>
        </Grid>
    );  
}

export default StockDetail;
import React, { useContext, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Grid, Card, Paper } from '@mui/material';
import Login from '../compontents/Login';
import Chart from '../compontents/Chart';
import apiRequest from '../utils/apiRequest';
import { IStock } from '../utils/types';
import { ProfileContext } from '../contexts/profile';
import Profile from "../compontents/Profile";
import { useParams } from 'react-router';

const StockDetail: React.FC = () => {
    const {
        isLoggedIn,
        profile,
        funds
        } = useContext(ProfileContext);
    const [stockItem, setStockItem] = React.useState<IStock>();
    let { stock } = useParams<{stock: string}>();

    React.useEffect(() => {
        (async function() {
            const res = await apiRequest(`/market/${stock}/`, "GET");
            setStockItem(res.data);
        })();
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
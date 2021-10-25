import React, { useContext, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Grid, Card, Paper } from '@mui/material';
import Login from './Login';
import Chart from './Chart';
import apiRequest from '../utils/apiRequest';
import { IStock } from '../utils/types';
import StockTable from './StockTable';
import EarningsCalendar from './Calendar';
import { ProfileContext } from '../contexts/profile';
import Profile from "./Profile";
import { Route, RouteProps, Router } from 'react-router';

const RouteWithSideInformation: React.FC<RouteProps> = (props: RouteProps) => {
    const {
        isLoggedIn,
        profile,
        funds
        } = useContext(ProfileContext);
    return (
        <Grid container spacing={4}>
            <Grid item xs={8} >
                <Route {...props} />
            </Grid>
            <Grid item xs={4} container spacing={"4"} direction="column">
                <Grid item>
                    <Paper sx={{padding: "1em"}}>
                        {(!isLoggedIn) ? (<Login />) : (<Profile user={profile} funds={funds}/>)}
                    </Paper>
                </Grid> 
                <Grid item>
                    <Paper sx={{padding: "1em"}}>
                        <EarningsCalendar />
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    );  
}

export default RouteWithSideInformation;
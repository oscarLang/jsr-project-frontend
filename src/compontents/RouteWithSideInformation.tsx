import React, { useContext } from 'react';
import { Grid, Paper } from '@mui/material';
import Login from './Login';
import EarningsCalendar from './Calendar';
import { ProfileContext } from '../contexts/profile';
import Profile from "./Profile";
import { Route, RouteProps } from 'react-router';

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
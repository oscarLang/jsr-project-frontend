import React, { useContext } from 'react';
import { Grid, Paper, Box } from '@mui/material';
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
        <Grid container gap={1}>
            <Grid item xs={12} sm={7} >
                <Route {...props} />
            </Grid>
            <Grid container item xs={12} sm={4} gap={1}>
                <Grid item sx={{flexGrow: 1, display: { xs: `${!isLoggedIn ? "none" : "inline"}`, sm: 'inline' }}}>
                    <Paper sx={{padding: "1em"}}>
                        {(!isLoggedIn) ? (<Login />) : (<Profile user={profile} funds={funds}/>)}
                    </Paper>
                </Grid> 
                <Grid item sx={{flexGrow: 1}}>
                    <Paper sx={{padding: "1em"}}>
                        <EarningsCalendar />
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    );  
}

export default RouteWithSideInformation;
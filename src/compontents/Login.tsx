
import { AppBar, Toolbar, Typography, Button, IconButton, Grid, Avatar, TextField, } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { Link, Route, Switch } from "react-router-dom";

import { AccountCircle } from '@mui/icons-material';
import React, { useContext, useReducer } from 'react';
import apiRequest from '../utils/apiRequest';
import profileReducer from '../reducers/profile';
import { ProfileContext } from '../contexts/profile';

const Login = (): JSX.Element => {
    const {
        isLoggingIn,
        isLoggedIn,
        profile,
        loginUser
        } = useContext(ProfileContext);
    const funds = 0;
    React.useEffect(() => {
        console.log(profile);
    }, [isLoggedIn]);

    const [form, setForm] = React.useState({
        email: "",
        password: ""
    });
    const onChange = (name: string, value: string): void => {
        setForm({...form, [name]: value})
    };

    const loginUserButtonPress = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();
        await loginUser(form.email, form.password);
    };

    if (isLoggedIn) {
        return <div>Logged in</div>;
    }

    return (
        <div>
            <Avatar />
            <Typography component="h1" variant="h5">
                Sign in to start trading
            </Typography>
            <form onSubmit={loginUserButtonPress}>
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={form.email}
                onChange={(event) => onChange(event.target.name, event.target.value)}
                />
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={form.password}
                onChange={(event) => onChange(event.target.name, event.target.value)}
                />
                <Button id="signin" type="submit" fullWidth variant="contained" color="primary">
                Sign In
                </Button>
                <Grid container>
                <Grid item>
                    <Link to="/user/register">
                    {"Don't have an account? Sign Up"}
                    </Link>
                </Grid>
                </Grid>
            </form>
            </div>

    );
}

export default Login;

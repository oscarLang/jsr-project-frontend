
import { AppBar, Toolbar, Typography, Button, IconButton, Grid, Avatar, TextField, } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { Link, Route, Switch } from "react-router-dom";

import { AccountCircle } from '@mui/icons-material';
import React from 'react';
import apiRequest from '../utils/apiRequest';

const Login = (): JSX.Element => {
    const isLoggedIn = false;
    const funds = 0;
    const [form, setForm] = React.useState({
        email: "",
        password: ""
    });

    const onChange = (name: string, value: string): void => {
        setForm({...form, [name]: value})
    };

    const loginUser = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();
        try {
            const result = await apiRequest("/user/login/", "POST", form);
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <Avatar />
            <Typography component="h1" variant="h5">
                Sign in to start trading
            </Typography>
            <form onSubmit={loginUser}>
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

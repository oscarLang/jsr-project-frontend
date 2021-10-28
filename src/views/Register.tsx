import {Typography, Button, Avatar, TextField, Paper} from '@mui/material';
import { Redirect, useHistory } from "react-router-dom";
import { useSnackbar } from 'notistack';
import React, { useContext } from 'react';
import apiRequest from '../utils/apiRequest';
import { ProfileContext } from '../contexts/profile';

const Register = (): JSX.Element => {
    const {
        isLoggedIn,
    } = useContext(ProfileContext);
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const [form, setForm] = React.useState({
        email: "",
        password: "",
        passwordAgain: "",
    });
    const onChange = (name: string, value: string): void => {
        setForm({...form, [name]: value})
    };

    const registerUser = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();
        try {
            const result = await apiRequest("/user/register/", "POST", form);
            if (result.data.res) {
                enqueueSnackbar("Succesfully registred user",{variant: 'success'});
                history.push("/");
            }
        } catch (error) {
            enqueueSnackbar("Succesfully registred user",{variant: 'error'});
        }
    };
    if (isLoggedIn) {
        return <Redirect to="/" />;
    }
    return (
        <Paper sx={{maxWidth: 500, margin: "auto", padding: "1em"}}>
            <Avatar />
            <Typography component="h1" variant="h5">
                Register to start trading
            </Typography>
            <form onSubmit={registerUser}>
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
                value={form.password}
                onChange={(event) => onChange(event.target.name, event.target.value)}
                />
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="passwordAgain"
                label="Password agian"
                type="password"
                id="password"
                value={form.passwordAgain}
                onChange={(event) => onChange(event.target.name, event.target.value)}
                />
                <Button id="register" type="submit" fullWidth variant="contained" color="primary">
                Register
                </Button>
            </form>
        </Paper>

    );
}

export default Register;

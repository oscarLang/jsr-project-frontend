import {Typography, Button, Avatar, TextField, Paper} from '@mui/material';
import React from 'react';
import apiRequest from '../utils/apiRequest';

const Register = (): JSX.Element => {
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
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    };
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

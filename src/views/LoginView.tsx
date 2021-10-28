import {Paper} from '@mui/material';
import React from 'react';
import { Redirect } from 'react-router';
import Login from '../compontents/Login';
import { ProfileContext } from '../contexts/profile';
const LoginView: React.FC = () => {
    const {
        isLoggedIn,
        } = React.useContext(ProfileContext);

    if (isLoggedIn) {
        return <Redirect to="/" />;
    }
    return (
        <Paper sx={{maxWidth: 500, margin: "auto", padding: "1em"}}>
            <Login />
        </Paper>
    );
}

export default LoginView;

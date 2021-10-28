import {Paper} from '@mui/material';
import React from 'react';
import { Redirect } from 'react-router';
import Login from '../compontents/Login';
import { ProfileContext } from '../contexts/profile';
const LogoutView: React.FC = () => {
    const {logout} = React.useContext(ProfileContext);

    React.useEffect(() => {
        logout();
    }, []);
    return (
        <Redirect to="/" />
    );
}

export default LogoutView;

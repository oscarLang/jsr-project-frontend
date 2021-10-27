import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import ProfileProvider from "./contexts/profile";
import ModalProvider from 'mui-modal-provider';
import { SnackbarProvider } from 'notistack';
ReactDOM.render(
    <BrowserRouter>
        <ProfileProvider>
            <SnackbarProvider
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                maxSnack={3}>
                <ModalProvider beta>
                    <App />
                </ModalProvider>
            </SnackbarProvider>
        </ProfileProvider>
    </BrowserRouter>,
    document.getElementById('root')
);
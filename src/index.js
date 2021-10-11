import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import ProfileProvider from "./contexts/profile";

ReactDOM.render(
    <BrowserRouter>
        <ProfileProvider>
            <App />
        </ProfileProvider>
    </BrowserRouter>,
    document.getElementById('root')
);
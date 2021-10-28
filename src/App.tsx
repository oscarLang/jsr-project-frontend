import React, { useReducer, useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, CssBaseline, Divider, List, ListItem, ListItemIcon, ListItemText, SwipeableDrawer } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { Link, Route, Switch } from "react-router-dom";
import './App.css';
import { AccountCircle } from '@mui/icons-material';
import Home from './views/Home';
import Register from './views/Register';
import profileReducer from './reducers/profile';
import { ProfileContext } from './contexts/profile';
import apiRequest from './utils/apiRequest';
import StockDetail from './views/StockDetail';
import RouteWithSideInformation from './compontents/RouteWithSideInformation';
import DepositView from './views/Deposit';
import Portfolio from './views/Portfolio';
import io from 'socket.io-client';
import { useSnackbar } from 'notistack';
import LoginView from './views/LoginView';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import LogoutView from './views/Logout';

var socketUrl = process.env.REACT_APP_SOCKET_URL || "https://market-socket.oscarlang.tech";


export const socket = io(socketUrl, { reconnectionDelayMax: 10000 });
const App = (): JSX.Element => {
    const {
        isLoggedIn,
        funds,
        getProfile
    } = useContext(ProfileContext);

    const { enqueueSnackbar } = useSnackbar();
    const [drawer, openDrawer] = React.useState(false);
    React.useEffect(() => {
        if (!isLoggedIn) {
            (async function () {
                await getProfile();
            })();
        }
        socket.on("connect_error", (error) => {
            enqueueSnackbar("Errow while trying to update stock market prices", { variant: 'error' });
        });
    }, []);

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <CssBaseline />
                <AppBar position="static">
                    <Toolbar>
                        <Box sx={{flexGrow: 1}}>
                            {isLoggedIn && (
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={() => openDrawer(true)}
                                    edge="start"
                                    sx={{ display: { xs: 'flex', sm: 'none' } }}
                                >
                                    <MenuIcon />
                                </IconButton>
                            )}
                            <Button
                                component={Link}
                                to="/"
                                sx={{ display: { xs: 'none', sm: 'flex' } }}
                                color="inherit">        
                                StockSocket - 
                                <Typography variant="caption">
                                    Trade 24/7
                                </Typography>
                            </Button>
                        </Box>
                        {isLoggedIn ? (
                            <div>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    color="inherit"
                                    component={Link} to="/deposit"
                                >
                                    <Typography variant="h6">
                                        {"$" + funds.toFixed(2)}
                                    </Typography>
                                    <AccountBalanceIcon />
                                </IconButton>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    color="inherit"
                                    component={Link} to="/user/portfolio"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    color="inherit"
                                    component={Link} to="/user/logout"
                                >
                                    <LogoutIcon />
                                </IconButton>
                            </div>
                        ) : (
                            <Button
                                component={Link}
                                to="/user/login"
                                sx={{ display: { xs: 'flex', sm: 'none' } }}
                                color="inherit">
                                Login
                            </Button>
                        )}
                    </Toolbar>
                </AppBar>
            </Box>
            <SwipeableDrawer
                open={drawer}
                onClose={() => openDrawer(false)}
                onOpen={() => openDrawer(true)}
            >
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={() => openDrawer(false)}
                >   
                    <Toolbar>
                    <Typography variant="button">
                        StockSocket - 
                    </Typography>
                    <Typography variant="caption">
                        Trade 24/7
                    </Typography>
                    </Toolbar>
                    <Divider />
                    <List>
                        <ListItem component={Link} to="/" button key={"home"}>
                            <ListItemIcon><HomeIcon /></ListItemIcon>
                            <ListItemText primary={"Home"} />
                        </ListItem>
                        <ListItem component={Link} to="/user/portfolio" button key={"port"}>
                            <ListItemIcon><AccountCircle /></ListItemIcon>
                            <ListItemText primary={"Portfolio"} />
                        </ListItem>
                        <ListItem component={Link} to="/user/deposit" button key={"dep"}>
                            <ListItemIcon><AccountBalanceIcon /></ListItemIcon>
                            <ListItemText primary={"Deposit"} />
                        </ListItem>
                        <Divider />
                        <ListItem component={Link} to="/user/logout" button key={"log"}>
                            <ListItemIcon><LogoutIcon /></ListItemIcon>
                            <ListItemText primary={"Logout"} />
                        </ListItem>
                    </List>
                </Box>
            </SwipeableDrawer>
            <Box sx={{ margin: "auto", marginTop: "1em", maxWidth: 1200 }}>
                <Switch>
                    <RouteWithSideInformation exact path="/" component={Home} />
                    <RouteWithSideInformation exact path="/deposit" component={DepositView} />
                    <RouteWithSideInformation path="/user/portfolio" component={Portfolio} />
                    <Route path="/stocks/:ticker" component={StockDetail} />
                    <Route exact path="/user/register" component={Register} />
                    <Route exact path="/user/login" component={LoginView} />
                    <Route exact path="/user/logout" component={LogoutView} />
                </Switch>
            </Box>
        </>
    );
}

export default App;

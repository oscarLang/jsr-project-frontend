import React, { useReducer,useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, CssBaseline} from '@mui/material';
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

const App = (): JSX.Element => {
    const {
        isLoggedIn,
        funds,
        isFetchingFunds,
        getFunds,
        getProfile
    } = useContext(ProfileContext);

    React.useEffect(() => {
        if (!isLoggedIn) {
            (async function() {
                const profileSuccess = await getProfile();
                if (profileSuccess) {
                    await getFunds();
                }
            })();
        }
    }, []);
    return (
        <>
        <Box sx={{ flexGrow: 1}}>
            <CssBaseline />
            <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component={Link} to="/">
                JSRamverk
                </Typography>
                { isLoggedIn && (
                    <div>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                        component={Link} to="/trade/deposit"
                    >
                        <Typography variant="h6">   
                        {"$" + funds}
                        </Typography>
                        <AccountBalanceIcon />
                    </IconButton>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                        component={Link} to="/trade/dashboard"
                    >
                        <AccountCircle />
                    </IconButton>
                    </div>
                ) }
            </Toolbar>
            </AppBar>
        </Box>
        <Box sx={{margin: "auto", marginTop: "1em", maxWidth: 1200}}>
            <Switch>
                <RouteWithSideInformation exact path="/" component={Home} />
                <RouteWithSideInformation exact path="/deposit" component={DepositView} />
                <RouteWithSideInformation path="/user/portfolio" component={Portfolio} />
                <Route path="/stocks/:stock" component={StockDetail} />
                <Route exact path="/user/register" component={Register} />
                {/* <Route exact path="/user/login" component={Login} />
                <Route exact path="/market" component={Market} />
                <Route exact path="/trade" component={Trade} /> */}
            </Switch>
        </Box>
        </>
    );
}

export default App;

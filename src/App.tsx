import { AppBar, Toolbar, Typography, Button, IconButton, Box, CssBaseline} from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { Link, Route, Switch } from "react-router-dom";
import './App.css';
import { AccountCircle } from '@mui/icons-material';
import Home from './views/Home';
import Register from './views/Register';

const App = (): JSX.Element => {
  const isLoggedIn = false;
  const funds = 0;
  return (
    <>
      <Box sx={{ flexGrow: 1}}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component={Link} to="/">
              JSRamverk
            </Typography>
            <Typography variant="h6" component={Link} to="/market">
              Market
            </Typography>
            {
              !isLoggedIn && (
                <Button color="inherit" component={Link} to="/user/login">Login</Button>
              )
            }
            {
              isLoggedIn && (
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
              )
            }
          </Toolbar>
        </AppBar>
      </Box>
      
      <Box sx={{margin: "1em"}}>
        <Switch>
          <Route exact path="/" component={Home} />
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

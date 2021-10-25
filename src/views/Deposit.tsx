import React, { useContext, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Grid, Card, Paper, TextField, ButtonGroup, InputAdornment } from '@mui/material';
import apiRequest from '../utils/apiRequest';
import { useHistory } from 'react-router';

const DepositView: React.FC = () => {
    const history = useHistory();
    const [amount, changeAmount] = React.useState(0);
    const submit = async () => {
        const res = apiRequest("/user/deposit/", "POST", {amount: amount})
    };


    return (
        <Paper id="deposit">
            <Grid container sx={{padding: "1em 4em", margin: "auto", minHeight: "350px"}} alignItems="stretch">
                <Grid item xs={12}>
                    <Typography variant="h4">Deposit to your account</Typography>
                    <Typography variant="body1">The money goes straight into your account! </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    fullWidth
                    required
                    type="number"
                    id="amount"
                    label="Amount to deposit"
                    name="amount"
                    value={amount}
                    sx={{marginBottom: "5px"}}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                    onChange={(event) => changeAmount(Number(event.target.value))}
                    />
                    <ButtonGroup variant="contained" size="small" color="secondary" fullWidth>
                        <Button onClick={() => changeAmount(100)}>$100</Button>
                        <Button onClick={() => changeAmount(250)}>$250</Button>
                        <Button onClick={() => changeAmount(500)}>$500</Button>
                        <Button onClick={() => changeAmount(1000)}>$1000</Button>
                    </ButtonGroup>
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={() => submit()} fullWidth variant="contained" color="primary">
                        Deposit funds
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );  
}

export default DepositView;
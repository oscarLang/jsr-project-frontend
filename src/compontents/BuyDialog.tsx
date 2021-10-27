import React, { useContext, useEffect, useState } from "react";
import apiRequest from "../utils/apiRequest";
import { IStock } from "../utils/types";
import { DialogTitle, DialogContent, DialogContentText, Grid, Typography, DialogActions, Button, TextField, Dialog, DialogProps } from "@mui/material";
import { ProfileContext } from "../contexts/profile";
import { useSnackbar } from "notistack";

interface IProps extends DialogProps {
    stock: IStock;
}

const BuyDialog: React.FC<IProps> = ({stock, ...props}) => {
    const { profile, getProfile } = useContext(ProfileContext);
    const { enqueueSnackbar } = useSnackbar();
    const [helperText, setHelperText] = React.useState("");
    const [error, setError] = React.useState(false);
    const [amountTextField, setAmount] = React.useState(0);
    const [existingAmount, setExistingAmount] = React.useState(0);
    React.useEffect(() => {
        if (profile && profile.stocks?.length) {
            const hasTheStock = profile.stocks.find((s) => s.name === stock.name);
            if (hasTheStock) {
                setExistingAmount(hasTheStock.amount);
            }
        }
    }, [profile]);

    const handleBuy = async (): Promise<void> => {
        if (error) {
            setHelperText("Fix errors before buying stock: " + helperText);
            return;
        }

        const buyStock = await apiRequest("/market/buy/", "POST",{
            stock: stock.ticker,
            amount: amountTextField
        });

        if (buyStock) {
            enqueueSnackbar(amountTextField + " stocks of " + stock.name + " bought");
            setError(false);
            await getProfile();

        } else {
            setError(true);
            setHelperText("Failed to purchase stocks");
        }
    };
    const  validate = (event: any): void => {
        var amount = event.target.value;
        if (amount > stock.quantity) {
            setError(true);
            setHelperText("Not enough stocks available!");
        } else if (amount < 0) {
            setError(true);
            setHelperText("Amount can not be negative");
        } else {
            setError(false);
            setHelperText("");
        }
        setAmount(amount);
    };


    return (
        <Dialog {...props}>
            <DialogTitle id="form-dialog-title">Buy and Sell stocks</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Buy stocks from {stock.name} for current price of ${stock.price}
            </DialogContentText>
            {existingAmount > 0 &&
                <DialogContentText>
                You currently have {existingAmount} stocks of this type.
                </DialogContentText>
            }
            <Grid container justifyContent="center" alignItems="center">
                <Grid item>
                    <TextField
                        autoFocus
                        id="amount"
                        label="Amount"
                        type="number"
                        error={error}
                        onChange={validate}
                        value={amountTextField}
                        helperText={helperText}
                    />
                </Grid>
                <Grid item>
                    <Typography variant="subtitle1">
                    for ${(amountTextField * Number(stock.price)).toFixed(2)}
                    </Typography>
                </Grid>
            </Grid>
            </DialogContent>
            <DialogActions>
            <Button color="primary" onClick={handleBuy} disabled={error}>
                Buy
            </Button>
            </DialogActions>
        </Dialog>
    );
}

export default BuyDialog;
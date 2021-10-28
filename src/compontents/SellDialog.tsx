import React, { useContext, useEffect, useState } from "react";
import apiRequest from "../utils/apiRequest";
import { IStock } from "../utils/types";
import { DialogTitle, DialogContent, DialogContentText, Grid, Typography, DialogActions, Button, TextField, Dialog, DialogProps } from "@mui/material";
import { ProfileContext } from "../contexts/profile";
import { useSnackbar } from "notistack";

interface IProps extends DialogProps {
    stock: IStock;
}

const SellDialog: React.FC<IProps> = ({stock, ...props}) => {
    const { profile, getProfile } = useContext(ProfileContext);
    const { enqueueSnackbar } = useSnackbar();
    const [helperText, setHelperText] = React.useState("");
    const [error, setError] = React.useState(false);
    const [amountTextField, setAmount] = React.useState(0);
    const [existingAmount, setExistingAmount] = React.useState(0);
    React.useEffect(() => {
        if (profile && profile.stocks?.length) {
            const hasTheStock = profile.stocks.find((s) => s.name === stock.ticker);
            if (hasTheStock) {
                setExistingAmount(hasTheStock.amount);
            }
        }
    }, [profile]);

    const handleSell = async (): Promise<void> => {
        if (error) {
            setHelperText("Fix errors before buying stock: " + helperText);
            return;
        }

        const sellStock = await apiRequest("/market/sell/", "POST",{
            stock: stock.ticker,
            amount: amountTextField
        });

        if (sellStock) {
            enqueueSnackbar(amountTextField + " stocks of " + stock.name + " sold");
            setError(false);
            await getProfile();

        } else {
            setError(true);
            setHelperText("Failed to sell stocks");
        }
    };
    const  validate = (event: any): void => {
        var amount = event.target.value;
        if (amount < 0) {
            setError(true);
            setHelperText("Amount can not be negative");
        } else if (amount > existingAmount) {
            setError(true);
            setHelperText("You only have " + existingAmount + " of this stock");
        } else {
            setError(false);
            setHelperText("");
        }
        setAmount(amount);
    };


    return (
        <Dialog {...props}>
            <DialogTitle id="form-dialog-title">Sell stocks</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Sell stocks of {stock.name} for current price of ${stock.price}
            </DialogContentText>
            <DialogContentText>
                You currently have {existingAmount} stocks of this type.
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="amount"
                label="Amount"
                type="number"
                fullWidth
                error={error}
                onChange={validate}
                value={amountTextField}
                helperText={helperText}
            />
            </DialogContent>
            <DialogActions>
            <Button color="primary" onClick={handleSell} disabled={error}>
                Sell
            </Button>
            </DialogActions>
        </Dialog>
    );
}

export default SellDialog;
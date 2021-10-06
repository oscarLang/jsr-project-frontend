import React from "react";
import { List, ListItem, CircularProgress, Typography, ListItemText, Chip, Divider } from "@mui/material"
import { CartesianGrid, Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { IStock, IStockHistory } from "../utils/types";
import apiRequest from "../utils/apiRequest";
import EventIcon from '@mui/icons-material/Event';

const EarningsCalendar: React.FC = () => {
    const [earnings, setUpcoming] = React.useState<IStock[]>([]);

    React.useEffect(() => {
        (async function() {
            try {
                //const earnings = await apiRequest("/market/earnings/", "GET");
                //setUpcoming(earnings.data.res);
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);
    
    return (
        <>
            <Typography variant="h6">Upcoming earnings</Typography>
            <List>
                <ListItem>
                    <ListItemText primary={"Ericsson"} secondary={"2021-10-10"} />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary={"Ericsson"} secondary={"2021-10-10"} />
                </ListItem>
            </List>
        </>
    );
}

export default EarningsCalendar;
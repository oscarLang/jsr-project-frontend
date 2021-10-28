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
                const market = await apiRequest("/market/all/", "GET");
                setUpcoming(market.data.res);
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);
    
    if (!earnings.length) {
        return <></>;
    }

    return (
        <>
            <Typography variant="h6">Upcoming earnings</Typography>
            <List>
                <ListItem>
                    <ListItemText primary={earnings[0].ticker + " " + earnings[0].name} secondary={"2021-11-17"} />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary={earnings.slice(-1)[0].ticker + " " +  earnings.slice(-1)[0].name} secondary={"2021-12-24"} />
                </ListItem>
            </List>
        </>
    );
}

export default EarningsCalendar;
import React from "react";
import { List, ListItem, Typography, ListItemText, CircularProgress, Button, Divider } from "@mui/material"
import { IProfileUser } from "../reducers/profile";
import { Link } from "react-router-dom";
import { IStock } from "../utils/types";
import apiRequest from "../utils/apiRequest";


interface Props {
    user?: IProfileUser;
    funds: number;
}
const Profile: React.FC<Props> = ({user, funds=0}) => {
    const [totalValue, setValue] = React.useState(0);
    const [development, setDevelopment] = React.useState(0);

    React.useEffect(() => {
        (async function() {
            try {
                const userReq = await apiRequest("/user/stocks/", "GET");
                const marketReq = await apiRequest("/market/all/", "GET");
                const stocksInMarket = marketReq.data.res;
                const combined = userReq.data.stocks.map((s: IStock) => {
                    const stockOfUser = 
                        stocksInMarket.find((sm: IStock) => s.name === sm.ticker);
                        return {...stockOfUser, ...s};
                });
                let t = 0;
                let v = 0;
                combined.forEach((s: IStock) => {
                    t += parseFloat(s.buyPrice) * s.amount;
                    v += parseFloat(s.price) * s.amount;
                });
                setDevelopment(((v - t) / t) * 100)
                setValue(v);


            } catch (e) {
                console.error(e);
            }
        })();
    }, [funds]);
    if (!user) {
        return <CircularProgress />
    }

    return (
        <List>
            <ListItem>
                <ListItemText primary={"Total value of portfolio"} secondary={`$${totalValue.toFixed(2)}`} />
            </ListItem>
            <Divider />
            <ListItem>
                <ListItemText primary={"Development of your portfolio"} secondary={`${!isNaN(development) ?  development.toFixed(2) : 0}%`} />
            </ListItem>
            <Divider />
            <ListItem>
                <ListItemText primary={"Current funds"} secondary={`${funds.toFixed(2)}$`} />
            </ListItem>
            <Divider />
            <ListItem sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Button component={Link} to="/deposit" sx={{margin: "1px"}} variant="contained" size="small">Deposit funds</Button>
                <Button component={Link} to="/user/portfolio" sx={{margin: "1px"}} variant="contained" size="small" color="secondary">View your portfolio</Button>
            </ListItem>
        </List>
    );
}

export default Profile;
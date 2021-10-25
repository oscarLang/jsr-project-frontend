import React from "react";
import { List, ListItem, Typography, ListItemText, CircularProgress, Button, Divider } from "@mui/material"
import { IProfileUser } from "../reducers/profile";
import { Link } from "react-router-dom";


interface Props {
    user?: IProfileUser;
    funds: number;
}
const Profile: React.FC<Props> = ({user, funds=0}) => {
    if (!user) {
        return <CircularProgress />
    }
    return (
        <List>
            <ListItem>
                <ListItemText primary={"Total value of portfolio"} secondary={`${0}$`} />
            </ListItem>
            <Divider />
            <ListItem>
                <ListItemText primary={"Development of your portfolio (1 week)"} secondary={`${0}%`} />
            </ListItem>
            <Divider />
            <ListItem>
                <ListItemText primary={"Current funds"} secondary={`${funds}$`} />
            </ListItem>
            <Divider />
            <ListItem>
                <Button component={Link} to="/deposit" sx={{margin: "1px"}} variant="contained" size="small">Deposit funds</Button>
                <Button component={Link} to="/user/portfolio" sx={{margin: "1px"}} variant="contained" size="small" color="secondary">View your portfolio</Button>
            </ListItem>
        </List>
    );
}

export default Profile;
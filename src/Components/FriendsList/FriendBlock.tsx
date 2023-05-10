import { Paper, Typography, Box, Button, Link } from "@mui/material";
import { useEffect } from "react";
import { IFriend } from "../../api/interfaces";
import { useNavigate } from "react-router-dom";
import { authByToken, sendUnFollow } from "../../api/apiWorker";
import { store } from "../../storage/Store";

export default function FriendBlock(props: {setter: (friends: IFriend[] | undefined) => void, data: IFriend}) {
    const navigate = useNavigate();
    
    const unfollow = () => {
        if (sessionStorage.getItem('id') && props.data.id)
            sendUnFollow(props.data.id).then(() => authByToken().then(() => props.setter(store.getState().data?.friends))); //it's too greedy
    }

    return (
        <Paper>
            <Box sx={{margin: '1vh', display: 'flex', justifyContent: 'space-between'}}>
                <Link href='' onClick={() => navigate(`/user/${props.data.id}`)} underline="none" sx={{fontWeight: 'bold', margin: 'auto 0'}}>{props.data.name} {props.data.surname}</Link>
                <Button onClick={unfollow}>Отписаться</Button>
            </Box>
        </Paper>
    );
}
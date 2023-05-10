import { Container, Typography, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { store } from "../storage/Store";
import { authByToken, sendUnFollow } from "../api/apiWorker";
import FriendBlock from "../Components/FriendsList/FriendBlock";
import { IFriend } from "../api/interfaces";


export default function Friends() {

    const [friends, setFriends] = useState<IFriend[] | undefined>(store.getState().data?.friends);

    useEffect(() => {
        if (sessionStorage.getItem('token'))                                        //redux void but session haves a token
            authByToken().then(() => setFriends(store.getState().data?.friends));   //get friends
    }, []);

    return (
        <Container>
            <Paper>
                <Typography sx={{margin: '1vh'}} variant="h4">Список ваших друзей</Typography>
            </Paper>
            {
                friends?.map((friend: IFriend) => <FriendBlock setter={setFriends} data={friend}/>)
            }
        </Container>
    );
}
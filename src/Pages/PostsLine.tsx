import { Container, Paper, Box, Typography } from "@mui/material";
import PostsCollection from "../Components/Posts/PostsCollection";
import { useEffect, useState } from "react";
import { store } from "../storage/Store";
import { authByToken } from "../api/apiWorker";
import { IFriend } from "../api/interfaces";

export default function PostsLine() {
    const [friends, setFriends] = useState<IFriend[] | undefined>();

    useEffect(() => {
        if (!store.getState().data && sessionStorage.getItem('token'))
            authByToken().then(() => setFriends(store.getState().data?.friends))
        else
            setFriends(store.getState().data?.friends)
    }, []);

    return (
        <Container>
            <Paper>
                <Box margin={1}>
                    <Typography variant="h4" align="center">
                        Лента новостей
                    </Typography>
                    <Typography variant="h6" align="center">
                        Тут постоянно кто-то чем-то делится
                    </Typography>
                    <Typography align="center" variant="subtitle1" sx={{fontStyle: 'italic'}}> 
                        Но зачем? 
                    </Typography>
                </Box>
            </Paper>
            {
                friends ? 
                <PostsCollection friends={friends}/> :
                <></>
            }
        </Container>
    );
}
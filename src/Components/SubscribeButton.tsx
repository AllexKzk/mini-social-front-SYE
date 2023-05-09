import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { authByToken, sendFollow, sendUnFollow } from "../api/apiWorker";
import { useParams } from "react-router-dom";
import { store } from "../storage/Store";
import { IFriend } from "../api/interfaces";

export default function SubscribeButton(){
    const [isFriend, setFriend] = useState(false);
    const {userId} = useParams<{userId: string}>();

    const findInFollows = () => {
        const friends = store.getState().data?.friends || [];
        console.log(friends, userId)
        for (const friend of friends){
            if (userId == friend.id){   //string and num compare
                setFriend(true);
                return ;
            }
        }
        setFriend(false);
    }

    useEffect(() => {
        if (!store.getState().data?.friends || !sessionStorage.getItem('id'))
            authByToken().then(() => findInFollows());  
        else
            findInFollows();
    }, []);

    const follow = () => {
        if (sessionStorage.getItem('id') && userId)
            sendFollow(userId);
        //it'll perfect to handle 'else'
    }
    const unfollow = () => {
        if (sessionStorage.getItem('id') && userId)
            sendUnFollow(userId);
    }
    return (
        <Box sx={{width: 'auto'}}>
            {
                !isFriend ? <Button fullWidth onClick={() => follow()}> Подписаться </Button> 
                            :
                            <Button fullWidth onClick={() => unfollow()}> Отписаться </Button> 
            }
        </Box>
    );
}
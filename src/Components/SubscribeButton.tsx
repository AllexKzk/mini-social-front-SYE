import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { authByToken, sendFollow, sendUnFollow } from "../api/apiWorker";
import { useNavigate, useParams } from "react-router-dom";
import { store } from "../storage/Store";

export default function SubscribeButton(){
    const [isFriend, setFriend] = useState<boolean | undefined>(undefined);
    const {userId} = useParams<{userId: string}>();
    const navigate = useNavigate();

    const findInFollows = () => {
        const friends = store.getState().data?.friends || [];
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
        if (sessionStorage.getItem('id') && userId){
            sendFollow(userId);
            setFriend(true);
        }
    }
    const unfollow = () => {
        if (sessionStorage.getItem('id') && userId){
            sendUnFollow(userId);
            setFriend(false);
        }
    }
    if (isFriend === undefined)
        return null;
    
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
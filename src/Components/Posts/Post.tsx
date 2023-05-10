import { Paper, Box, Typography, Divider, IconButton } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IPost } from "./IPost";
import { getFile, likePost } from "../../api/apiWorker";
import { useEffect, useState } from "react";
import Progress from "../Progress";

export default function Post (props: {data: IPost}) {
    const [imageUrl, setUrl] = useState<string | undefined>(undefined);
    const [isImageLoading, setImageLoading] = useState(false);
    const [info, setInfo] = useState<{isLiked: boolean, likesCount: string}>({
        isLiked: props.data.liked, likesCount: props.data.likes
    });

    useEffect(() => {
        if (props.data.imagePath){
            setImageLoading(true);
            getFile(props.data.imagePath, setUrl).then(() => setImageLoading(false))
        }
    }, []);

    const liked = () => {
        if (!info.isLiked){
            likePost(props.data.id);
            setInfo({
                isLiked: true,
                likesCount: 1 + info.likesCount
            });
        }
    };
 
    return (
        <Paper id={props.data.id} sx={{margin: '1vh 0', height: 'auto'}}>
            <Box sx={{display: 'flex', flexDirection: 'column', margin: '1vh'}}>
                <Typography sx={{fontWeight: 'bold'}}>{props.data.authorName} {props.data.authorSurname}</Typography>
                <Typography whiteSpace='pre-line'>{props.data.caption}</Typography>
                {
                    imageUrl ? <Progress isLoaded={isImageLoading}>
                                    <img onError={() => setImageLoading(true)} src={imageUrl}/>
                                </Progress> : 
                                <></>
                }
                <Box sx={{display: 'flex', justifyContent: 'end'}}>
                    <IconButton onClick={() => liked()}>
                        { info.isLiked ? <FavoriteIcon/> : <FavoriteBorderIcon/> }
                        <Typography sx={{fontSize: 24, marginLeft: 1}}>{info.likesCount || 0}</Typography>
                    </IconButton>
                </Box>
            </Box>
        </Paper>
    );
}
import { Paper, Box, Typography, Divider, IconButton } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IPost } from "./IPost";
import { likePost, serverUrl } from "../../api/apiWorker";

export default function Post (props: {data: IPost}) {
    return (
        <Paper id={props.data.id} sx={{margin: '1vh 0', height: 'auto'}}>
            <Box sx={{display: 'flex', flexDirection: 'column', margin: '1vh'}}>
                <Typography sx={{fontWeight: 'bold'}}>{props.data.authorName} {props.data.authorSurname}</Typography>
                <Typography>{props.data.caption}</Typography>
                {props.data.imagePath ? <img src={`${serverUrl}/${props.data.imagePath}`}/> : <></>}
                <Box sx={{display: 'flex', justifyContent: 'end'}}>
                    <IconButton onClick={() => likePost(props.data.id)}>
                        { props.data.liked ? <FavoriteIcon/> : <FavoriteBorderIcon/> }
                        <Typography sx={{fontSize: 24, marginLeft: 1}}>{props.data.likes ? props.data.likes : 0}</Typography>
                    </IconButton>
                </Box>
            </Box>
        </Paper>
    );
}
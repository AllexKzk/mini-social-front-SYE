import { Avatar, Box } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './avatar.css';
import AvatarUpload from "./AvatarUpload";
import { getFile, serverUrl } from "../../api/apiWorker";
import { useState, useEffect } from "react";
import Progress from "../Progress";

export default function AvatarEdditable(props: {isEdditable: boolean, path: string}) {

    const [avatarUrl, setUrl] = useState('');
    const [isLoaded, setLoaded] = useState(false);
    useEffect(() => {
        if (props.path){
            setLoaded(true);
            getFile(props.path, setUrl).then(() => setLoaded(false));
        }
    }, []);

    return (
        <Box sx={{display: 'flex', height: '100%', width: '100%', position: 'relative'}}>
            {props.isEdditable ? <AvatarUpload /> : <></>}
            {
                props.path ?
                    <Progress isLoaded={isLoaded}>
                        <img onError={() => setLoaded(true)} src={avatarUrl} className="avatar"/>
                    </Progress> :
                    <AccountCircleIcon sx={{height: '100%', width: '100%'}}/>
            }
        </Box>
    );
}
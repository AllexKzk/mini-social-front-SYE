import { Avatar, Box } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './avatar.css';
import AvatarUpload from "./AvatarUpload";
import { getFile, serverUrl } from "../../api/apiWorker";
import { useState, useEffect } from "react";

export default function AvatarEdditable(props: {isEdditable: boolean, path: string}) {

    const [avatarUrl, setUrl] = useState('');

    useEffect(() => {
        if (props.path)
            getFile(props.path, setUrl);
    });

    return (
        <Box sx={{display: 'flex', height: 'inherit', width: 'inherit', position: 'relative'}}>
            {props.isEdditable ? <AvatarUpload /> : <></>}
            {props.path ? <img src={avatarUrl} className="avatar"/> : <AccountCircleIcon sx={{height: 'auto', width: 'auto'}}/>}
        </Box>
    );
}
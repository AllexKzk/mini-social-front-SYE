import { Avatar, Box } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './avatar.css';
import AvatarUpload from "./AvatarUpload";
import { serverUrl } from "../../api/apiWorker";

export default function AvatarEdditable(props: {isEdditable: boolean, path: string}) {
    return (
        <Box sx={{display: 'flex', height: 'inherit', width: 'inherit', position: 'relative'}}>
            {props.isEdditable ? <AvatarUpload /> : <></>}
            {props.path ? <img src={`${serverUrl}/${props.path}`} className="avatar"/> : <AccountCircleIcon sx={{height: 'auto', width: 'auto'}}/>}
        </Box>
    );
}
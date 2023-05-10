import { Box, IconButton } from "@mui/material";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import './avatar.css';
import { useState, useRef } from "react";
import { uploadAvatar } from "../../api/apiWorker";

export default function AvatarUpload() {
    const [isVisible, setVisible] = useState(false);
    const inputFile = useRef<HTMLInputElement | null>(null);

    const updateAvatar = (files: FileList | null) => {
        if (files?.length)
            uploadAvatar(files[0]);
    };

    return (
        <IconButton onClick={() => inputFile.current?.click()}
                    onMouseEnter={() => setVisible(true)} 
                    onMouseLeave={() => setVisible(false)} 
                    className="avatarButton">
            {isVisible ? <AddAPhotoIcon sx={{height: '25%', width: '25%'}}/> : <></>}
            <input type='file' name='avatar' ref={inputFile} hidden onChange={(ev) => updateAvatar(ev.target.files)}/>
        </IconButton>
    );
}
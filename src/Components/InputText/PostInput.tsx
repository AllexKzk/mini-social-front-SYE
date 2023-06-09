import { Box, Button, Divider, IconButton, Input, Paper, TextareaAutosize, Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import './textarea.css';
import { useRef, useState } from "react";
import { createPost } from "../../api/apiWorker";

interface ITextPrev {
    label: string
}

export default function PostInput(props: ITextPrev) {
    const [postText, setText] = useState('');
    const inputFile = useRef<HTMLInputElement | null>(null);
    const [file, setFile] = useState<FileList | null>(null);

    const submitPost = () => {
        console.log('send:', postText, file ? file[0] : 'null');
        createPost(postText, file ? file[0] : null);
        setFile(null);
        setText('');
    };

    return (
        <Paper className="postInput">
            <TextareaAutosize value={postText} onChange={(ev) => setText(ev.target.value)} placeholder={props.label} minRows={3} className="customTextArea"/>
            <Divider/>
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <IconButton onClick={() => inputFile.current?.click()}>
                    <input type='file' name="caption-img" ref={inputFile} hidden onChange={(ev) => setFile(ev.target.files)}/>
                    <AttachFileIcon/>
                    {file ? <Typography>{file?.length}</Typography> : <></>}
                </IconButton>
                <Box>
                    <IconButton onClick={() => setText('')}>
                        <CloseIcon/>
                    </IconButton>
                    <IconButton onClick={submitPost}>
                        <SendIcon/>
                    </IconButton>
                </Box>
            </Box>
        </Paper>
    );
}
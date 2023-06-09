import {  Typography, Box, Button, TextareaAutosize, IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import './textarea.css'

interface IHiddenTextField {
    prepText: string,
    callback: (text: string) => void,
    isEdditable: boolean
}

export default function HiddenTextField(props: IHiddenTextField){
    const [focused, setFocused] = useState(false);
    interface ITextInput{
        current: string, 
        prev: string
    }; 
    const [input, setInput] = useState<ITextInput>({current: props.prepText, prev: props.prepText});

    const undoChanges = () => {
        setInput({...input, current: input.prev}); //current changes set to prev
        setFocused(false);                         //hide textArea
    };
    const submitChanges = async () => {
        setInput({...input, prev: input.current});  //save text in prev local
        setFocused(false);                          //hide textArea
        props.callback(input.current);              //send to server
    };

    return ( 
            <Box sx={{width: '100%', height: '100%'}}>
            {
                focused && props.isEdditable ? 
                <Box sx={{'display': 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                    <TextareaAutosize 
                        autoFocus
                        maxRows={3}
                        value={input.current} 
                        className="customTextArea" 
                        onChange={(ev) => setInput({...input, current: ev.target.value})} //change current text field
                    />
                    <Box sx ={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}>
                        <IconButton onClick={undoChanges}>
                            <CloseIcon/>
                        </IconButton>
                        <IconButton onClick={submitChanges}>
                            <DoneIcon/>
                        </IconButton>
                    </Box>
                </Box>
                :
                <Box sx={{position: 'relative', height: '100%'}}>
                    <Button className='hiddenInputButton' onClick={() => setFocused(true)} />
                    <Typography className="hiddenInputText">
                        {input.current}
                    </Typography>
                </Box>
            }
        </Box>
    );
}
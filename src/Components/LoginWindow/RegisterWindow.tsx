import { Box, Button, Alert, TextField, AlertColor } from "@mui/material";
import { IRegisterData } from "../../api/interfaces";
import "./window.css";
import { useState } from "react";
import {register} from "../../api/apiWorker";
import { useNavigate } from "react-router-dom";
import { store } from "../../storage/Store";
import Progress from "../Progress";

export default function RegisterWindow() {
    const navigate = useNavigate();
    const [data, setData] = useState<IRegisterData>({
        Login: '',
        Password: '',
        Name: '',
        Surname: ''
    });

    interface IAlert {
        severity: AlertColor,
        message: string
    };
    const [alert, setAlert] = useState<IAlert | undefined>(undefined);
    const [progress, setProgress] = useState(false);

    const registerNewUser = async () => {
        setProgress(true);
        register(data).then(() => {
            setAlert({severity: 'success', message: 'Authorised'});
            setTimeout(() => navigate(`/user/${store.getState().id}`), 100);
            setProgress(false);
        }).catch((err: Error) => {
            setAlert({severity: 'error', message: err.message});
            setProgress(false);
        });
        
    };

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', margin: '3vh'}}>
            <TextField onChange={ev => setData({...data, Login: ev.target.value})} className="loginInput" label="Login"/>
            <TextField type="password" onChange={ev => setData({...data, Password: ev.target.value})} className="loginInput" label="Password"/>
            <TextField onChange={ev => setData({...data, Name: ev.target.value})} className="loginInput" label="Name"/>
            <TextField onChange={ev => setData({...data, Surname: ev.target.value})} className="loginInput" label="Surname"/>
            {alert ? <Alert severity={alert.severity}> {alert.message}</Alert> : <></>}
            <Progress isLoaded={progress}>
                <Button onClick={() => registerNewUser()} variant="contained" sx={{marginTop: 2}}>Sign Up</Button>
            </Progress>
        </Box>
    );
}
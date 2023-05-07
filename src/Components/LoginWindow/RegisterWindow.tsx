import { Box, Button, Alert, TextField, AlertColor } from "@mui/material";
import { IRegisterData } from "../../api/interfaces";
import "./window.css";
import { useState } from "react";
import {register} from "../../api/apiWorker";
import { useNavigate } from "react-router-dom";
import { store } from "../../storage/Store";

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

    const registerNewUser = async () => {
        register(data).then(() => {
            setAlert({severity: 'success', message: 'Authorised'});
            setTimeout(() => navigate(`/user/${store.getState().id}`), 100);
        }).catch((err: Error) => {
            setAlert({severity: 'error', message: err.message});
        });
        
    };

    return (
        <Box className="window">
            <Box className="input-block">
                <TextField onChange={ev => setData({...data, Login: ev.target.value})} margin="normal" variant="outlined" label="Login"/>
                <TextField type="password" onChange={ev => setData({...data, Password: ev.target.value})} margin="normal" variant="outlined" label="Password"/>
                <TextField onChange={ev => setData({...data, Name: ev.target.value})} margin="normal" variant="outlined" label="Name"/>
                <TextField onChange={ev => setData({...data, Surname: ev.target.value})} margin="normal" variant="outlined" label="Surname"/>
                {alert ? <Alert severity={alert.severity}> {alert.message}</Alert> : <></>}
                <Button onClick={() => registerNewUser()} variant="contained" sx={{marginTop: 2}}>Sign Up</Button>
            </Box>
        </Box>
    );
}
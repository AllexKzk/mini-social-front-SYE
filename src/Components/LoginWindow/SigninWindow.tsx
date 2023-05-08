import { Alert, AlertColor, Box, Button, Paper, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import "./window.css";
import { ILoginData } from "../../api/interfaces";
import { login } from "../../api/apiWorker";
import { useNavigate } from "react-router-dom";
import { store } from "../../storage/Store";

export default function SigninWindow() {
    const navigate = useNavigate();
    const [data, setData] = useState<ILoginData>({
        Login: '',
        Password: '',
    });

    interface IAlert {
        severity: AlertColor,
        message: string
    };
    const [alert, setAlert] = useState<IAlert | undefined>(undefined);

    const loginUser = async () => {
        login(data).then(() => {
            setAlert({severity: 'success', message: 'Authorized'});
            navigate(`/user/${store.getState().id}`);
        }).catch((err: Error) => {
            setAlert({severity: 'error', message: err.message});
        });
    };

    return (
        <Box className="window">
            <Box className="input-block">
                <TextField onChange={ev => setData({...data, Login: ev.target.value})} margin="normal" variant="outlined" label="Login"/>
                <TextField onChange={ev => setData({...data, Password: ev.target.value})} type="password" margin="normal" variant="outlined" label="Password"/>
                {alert ? <Alert severity={alert.severity}> {alert.message}</Alert> : <></>}
                <Button onClick={() => loginUser()} variant="contained" sx={{marginTop: 2}}>Sign In</Button>
            </Box>
        </Box>
    );
}
import { Alert, AlertColor, Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import "./window.css";
import { ILoginData } from "../../api/interfaces";
import { login } from "../../api/apiWorker";
import { useNavigate } from "react-router-dom";
import Progress from "../Progress";

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
    const [progress, setProgress] = useState(false);

    const loginUser = async () => {
        setProgress(true);
        login(data).then((id) => {
            setAlert({severity: 'success', message: 'Authorized'});
            navigate(`/user/${id}`);
            setProgress(false);
        }).catch((err: Error) => {
            console.log(err.message);
            setAlert({severity: 'error', message: 'Неверный пароль или логин'});    //hardcode because of Cyclic can't rewrite status message x_x
            setProgress(false);
        });
    };

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', margin: '3vh'}}>
            <TextField onChange={ev => setData({...data, Login: ev.target.value})} className="loginInput" label="Login"/>
            <TextField onChange={ev => setData({...data, Password: ev.target.value})} className="loginInput" type="password" label="Password"/>
            {alert ? <Alert severity={alert.severity}> {alert.message}</Alert> : <></>}
            <Progress isLoaded={progress}>
                <Button onClick={() => loginUser()} variant="contained" sx={{marginTop: 2}}>Sign In</Button>
            </Progress>
        </Box>
    );
}
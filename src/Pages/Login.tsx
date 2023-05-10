import { useState } from "react";
import { Link, Box, Paper, Typography, Divider} from "@mui/material";
import SigninWindow from "../Components/LoginWindow/SigninWindow";
import RegisterWindow from "../Components/LoginWindow/RegisterWindow";


export default function Login() {
    const [isRegisteration, setRegisteration] = useState(false);

    return (
        <Box marginTop={'10vh'}>
            <Box sx={{margin: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'start'}}>
                <Paper className="login">
                    <Box sx={{margin: 'auto'}}>
                        <Typography variant="h1" align="center">Share</Typography>
                        <Divider/>
                        <Typography variant="h2" align="center">Your</Typography>
                        <Divider/>
                        <Typography variant="h1" align="center">Existence</Typography>
                    </Box>
                    {isRegisteration ? <RegisterWindow/> : <SigninWindow />}
                </Paper>
                <Link sx={{margin: 'inherit'}} href='#' onClick={() => setRegisteration(!isRegisteration)}>
                    {isRegisteration ? 'Sign In' : 'Register'}
                </Link>
            </Box>
        </Box>
    );
}
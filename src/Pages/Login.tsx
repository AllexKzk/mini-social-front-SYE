import { useState } from "react";
import { Link, Box } from "@mui/material";
import SigninWindow from "../Components/LoginWindow/SigninWindow";
import RegisterWindow from "../Components/LoginWindow/RegisterWindow";


export default function Login() {
    const [isRegisteration, setRegisteration] = useState(false);

    return (
        <Box marginTop={'10vh'}>
            <Box sx={{width: '100%', height: '100%', margin: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'start'}}>
                {isRegisteration ? <RegisterWindow/> : <SigninWindow />}
                <Link sx={{margin: 'inherit'}} href='#' onClick={() => setRegisteration(!isRegisteration)}>
                    {isRegisteration ? 'Sign In' : 'Register'}
                </Link>
            </Box>
        </Box>
    );
}
import { Container, Paper, Box, Button } from "@mui/material";
import { useEffect } from "react";
import { Outlet,Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionStorage.getItem('id') || !sessionStorage.getItem('token'))  //if no token or id
            navigate('/login');                                                 //go to login
    }, []);

    const quite = () => {
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <Container sx={{display: 'flex', flexDirection: 'row', marginTop: '5vh'}} maxWidth="md">
            <Outlet/>
            <Box sx={{minHeight: '20vh'}}>
                <Paper sx={{height: 'auto'}}>
                    <Box sx={{display: 'flex', flexDirection: 'column', padding: '1vh'}}>
                        {
                            sessionStorage.getItem('id') ?  
                                <Button onClick={() => navigate(`/user/${sessionStorage.getItem('id')}`)}>Домой</Button> :
                                <Button onClick={() => navigate('/login')}>Войти</Button>
                        }
                        <Button onClick={() => navigate('/postsline')}>Новости</Button>
                        <Button onClick={() => navigate('/friends')}>Сострадальцы</Button>
                        <Button onClick={quite}>Выйти</Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}
import { Container, Paper, Box } from "@mui/material";
import { Outlet,Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <Container sx={{display: 'flex', flexDirection: 'row', marginTop: '5vh'}} maxWidth="md">
            <Outlet/>
            <Paper sx={{height: '20vh'}}>
                <Box sx={{height: 'inherit', display: 'flex', flexDirection: 'column', margin: '1vh'}}>
                    <Link to='/login'> Войти </Link>
                    <Link to='/postsline'> Новости </Link>
                    <Link to='/friends'> Сострадальцы </Link>
                </Box>
            </Paper>
        </Container>
    );
}
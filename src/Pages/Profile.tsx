import { Container, Typography, Box, Paper} from "@mui/material";
import { IUser } from "../api/interfaces";
import { useState } from "react";
import { store } from "../storage/Store";
import { useParams } from "react-router-dom";
import { getProfile, updateProfileSettings } from "../api/apiWorker";
import { updateData } from "../storage/AuthUser";
import HiddenTextField from "../Components/InputText/HiddenTextField";

export default function Profile() {
    const [profile, setProfile] = useState<IUser | undefined>(undefined);
    const {userId} = useParams<{userId: string}>();
    
    useState(() => {
        getProfile(userId!)
        .then((userData: IUser) => {
            setProfile(userData);
        });
    });

    const updateBio = async (newBio: string) => {
        store.dispatch(updateData({...store.getState(), bio: newBio})); //save in Redux
        updateProfileSettings('bio');                                   //send Redux to the server
    }

    return(
        <Container maxWidth="md">
            {
                profile ? 
                <Paper>
                    <Box sx={{display: 'flex', flexDirection: 'row'}}>
                        <Box sx={{width: '200px', height: '200px', backgroundColor: 'grey'}}/>
                        <Box sx={{width: '100%', height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'start'}}>
                            <Typography variant="h2" alignSelf={'start'}>
                                {`${profile?.name} ${profile?.surname}`}
                            </Typography>
                            <Typography variant="button"> Монография: </Typography>
                            <HiddenTextField callback={(text: string) => updateBio(text)} prepText={profile.bio || ''}/>
                        </Box>
                    </Box>
                </Paper>
                :
                <></>
            }
        </Container>
    );
}
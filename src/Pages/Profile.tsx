import { Container, Typography, Box, Paper} from "@mui/material";
import { IUser } from "../api/interfaces";
import { useState } from "react";
import { store } from "../storage/Store";
import { useParams } from "react-router-dom";
import { getProfile, updateProfileSettings } from "../api/apiWorker";
import HiddenTextField from "../Components/InputText/HiddenTextField";
import PostInput from "../Components/InputText/PostInput";
import PostsCollection from "../Components/Posts/PostsCollection";
import AvatarEdditable from "../Components/Avatar/AvatarEdditable";

export default function Profile() {
    const [profile, setProfile] = useState<IUser | undefined>(undefined);
    const [edditable, setEdditable] = useState(false);
    const {userId} = useParams<{userId: string}>();
    
    useState(() => {
        getProfile(userId!)
        .then((userData: IUser) => {
            setProfile(userData);
        });

        if (sessionStorage.getItem('id') === userId)
            setEdditable(true);                         //it's my profile
    });

    const updateBio = async (newBio: string) => {
        updateProfileSettings('bio', newBio);       //send to the server
    }

    return(
        <Container maxWidth="md" sx={{marginTop: 5}}>
            {
                profile ? 
                <>
                <Paper>
                    <Box sx={{height: '20vh', width: 'auto', display: 'flex', flexDirection: 'row'}}>
                        <Box sx={{width: '20vh', height: '20vh'}}>
                            <AvatarEdditable isEdditable={edditable} path={profile.avatar}/>
                        </Box>
                        <Box sx={{height: 'auto', display: 'flex', flexDirection: 'column', flexGrow: 1}}>
                            <Typography variant="h2" alignSelf={'start'}>
                                {`${profile?.name} ${profile?.surname}`}
                            </Typography>
                            <Typography variant="button"> Монография: </Typography>
                            <HiddenTextField isEdditable={edditable} callback={(text: string) => updateBio(text)} prepText={profile.bio || ''}/>
                        </Box>
                    </Box>
                </Paper>
                {
                    edditable ? <PostInput label="Всё ещё жив?"/> : <> </>
                }
                <PostsCollection sources={[userId!]}/>
                </>
                :
                <></>
            }
        </Container>
    );
}
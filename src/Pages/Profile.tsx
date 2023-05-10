import { Container, Typography, Box, Paper} from "@mui/material";
import { IUser } from "../api/interfaces";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProfile, updateProfileSettings } from "../api/apiWorker";
import HiddenTextField from "../Components/InputText/HiddenTextField";
import PostInput from "../Components/InputText/PostInput";
import PostsCollection from "../Components/Posts/PostsCollection";
import AvatarEdditable from "../Components/Avatar/AvatarEdditable";
import SubscribeButton from "../Components/SubscribeButton";

export default function Profile() {
    const [profile, setProfile] = useState<IUser | undefined>(undefined);
    const [edditable, setEdditable] = useState(false);
    const {userId} = useParams();
    useEffect(() => {
        if (userId && !profile)
            getProfile(userId).then((userData: IUser) => {
                setProfile(userData);
            });
        if (sessionStorage.getItem('id') === userId)
            setEdditable(true);                         //it's my profile
    }, []);

    const updateBio = async (newBio: string) => {
        updateProfileSettings('bio', newBio);       //send to the server
    }

    if (profile && userId)
        return (
                <Container>
                    <Paper>
                        <Box sx={{minHeight: '20vh', width: 'auto', display: 'flex', flexDirection: 'row'}}>
                            <Box sx={{maxWidth: '20vh', height: 'auto'}}>
                                <AvatarEdditable isEdditable={edditable} path={profile.avatar}/>
                            </Box>
                            <Box sx={{maxHeight: 'auto', margin: '1vh', display: 'flex', flexDirection: 'column', flexGrow: 1}}>
                                <Typography variant="h2" alignSelf={'start'}>
                                    {profile.name} {profile.surname}
                                </Typography>
                                <Typography variant="button"> Монография: </Typography>
                                <HiddenTextField isEdditable={edditable} callback={(text: string) => updateBio(text)} prepText={profile.bio || ''}/>
                                { edditable ? <></> : <SubscribeButton/> }
                            </Box>
                        </Box>
                    </Paper>
                    { edditable ? <PostInput label="Всё ещё дышишь?"/> : <></>}
                    <PostsCollection sources={[userId]}/>
            </Container>
        );

    return(
        <Container/>
    );
}
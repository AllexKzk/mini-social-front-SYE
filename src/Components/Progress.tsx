import { CircularProgress } from "@mui/material";

export default function Progress(props: {isLoaded: boolean, children: string | JSX.Element | JSX.Element[]}) {

    return (
        <>
        {
            props.isLoaded ? <CircularProgress sx={{margin: 'auto'}}/> : props.children
        }
        </>
    );
}
import { PaletteOptions, createTheme } from '@mui/material';

const colors = {
    primary: {
        main: '#ffb000'
    }
};

const colorPalette:PaletteOptions = {
    mode: 'dark',
    ...colors
};

export const darkTheme = createTheme({
    palette:  colorPalette,
    components: {
        MuiPaper: {
            variants: [
                {
                    props: {className: 'login'},
                    style: {
                        minHeight: '60vh',
                        minWidth: '60vh',
                        margin: 'auto',
                        borderRadius: '32px',
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: 'flex-end',
                    }
                },
                {
                    props: {className: 'postInput'},
                    style: {
                        height: 'auto', 
                        width: 'auto', 
                        margin: '1vh 0', 
                        display: 'flex', 
                        flexDirection: 'column',
                        ":hover": {
                            boxShadow: `0 0 8px ${colors.primary.main}`,
                        }
                    }
                },
            ]
        },
        MuiTextField: {
            variants: [
                {
                    props: {className: 'loginInput'},
                    style: {
                        margin: '1vh 0',
                        variant: 'outlined'
                    }
                },
            ]
        },
        MuiButton: {
            variants: [
                {
                    props: {className: 'hiddenInputButton'},
                    style: {
                        position: 'absolute',
                        variant: 'outlined',
                        height: '100%',
                        width: '100%',
                    }
                },
            ]
        },
        MuiTypography: {
            variants: [
                {
                    props: {className: 'hiddenInputText'},
                    style: {
                        whiteSpace: 'pre-line',
                        fontSize: 'medium'
                    }
                },
            ]
        },
        MuiIconButton: {
            variants: [
                {
                    props: {className: 'avatarButton'},
                    style: {
                        position: 'absolute', 
                        height: 'inherit', 
                        width: 'inherit',
                        "&:hover": {
                            backgroundColor: 'rgba(0, 0, 0, 0.3)'
                        }
                    }
                },
            ]
        }
    }
});
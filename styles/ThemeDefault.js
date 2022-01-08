import {createTheme} from "@mui/material";

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#9C1658',
            dark: '#82174B',
            contrastText: "#FFFFFF"
        },
        background: {
            'default': '#FFFFFF',
            'paper': '#FFFFFF'
        },
        divider: '#f1f1f1',
        text: {
            primary: "#333333",
            secondary: "#777777",
            disabled: "#ebebeb",
            hint: "#333333",
        },
        link: {
            accent: '#9C1658',
            accentHover: '#82174B',
            default: '#333',
            defaultHover: '#212121'
        },
        black: {
            main: '#0D0C21',
            contrastText: '#eee',
        },
        white: {
            main: '#fff',
            contrastText: '#444',
        },
        pale: {
            main: '#FCF4D9',
            contrastText: '#383838',
        }
    },
    components: {
        MuiLink: {
            variants: [
                {
                    props: {variant: 'secondary'},
                    style: {
                        color: '#333',
                        '&:hover': {
                            color: '#9C1658'
                        }
                    }
                }
            ],
        }
    }
});

export default theme;
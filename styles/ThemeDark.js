import {createTheme} from "@mui/material";

const theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: "#242424",
            paper: "#050505"
        },
        divider: '#333',
        text: {
            primary: "#c1c1c1",
            secondary: "#777777",
            disabled: "#ebebeb",
            hint: "#333333"
        },
        link: {
            accent: '#fff',
            accentHover: '#bbb',
            default: '#777',
            defaultHover: '#fff'
        },
        primary: {
            main: '#9C1658',
            dark: '#82174B'
        },
        black: {
            main: '#111111',
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
            styleOverrides: {
                root: {
                    color: '#bbb',
                    '&:hover': {
                        color: '#ffffff'
                    }
                },
            },
            variants: [
                {
                    props: {variant: 'secondary'},
                    style: {
                        color: '#bbb',
                        '&:hover': {
                            color: '#ffffff'
                        }
                    }
                },
            ],
        }
    }
});

export default theme;
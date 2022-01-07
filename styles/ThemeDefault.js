import {createTheme} from "@mui/material";

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#9C1658',
            dark: '#82174B'
        },
        secondary: {
            main: '#333',
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
});

export default theme;
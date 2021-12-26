import Head from 'next/head'
import {Button, Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import ReaderAppBar from "../components/ReaderAppBar";

export default function Home() {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#9C1658',
                dark: '#82174B'
            },
            secondary: {
                main: '#666',
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

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="container">
            <Head>
                <title>Reader</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <ReaderAppBar />
                <Container>
                    <h1>Глава 2. Рубиновый город</h1>
                    <p>Тут должен быть текст главы</p>
                    <Button variant="contained">Example button</Button>
                </Container>
            </main>
        </div>
      </ThemeProvider>
  )
}

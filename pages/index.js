import Head from 'next/head'
import {Container, CssBaseline, ThemeProvider} from "@mui/material";
import ReaderAppBar from "../components/ReaderAppBar";
import theme from "../config/Theme";

export default function Home({readerData, chapterText}) {
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="container">
            <Head>
                <title>Reader</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <ReaderAppBar readerData={readerData} />
                <Container>
                    <h1>{readerData.chapter.title}</h1>
                    <p>{chapterText}</p>
                </Container>
            </main>
        </div>
      </ThemeProvider>
  )
}

export async function getStaticProps() {
    const readerData = {
        chapter: {
            title: 'Глава 2. Рубиновый город'
        },
        bookUrl: 'https://dev.litnet.com/ru/book/disgardium-ugroza-a-klassa-b89465',
    }

    return {
        props: {
            readerData,
            chapterText: 'Тут будет текст главы',
        }
    }
}

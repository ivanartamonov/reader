import Head from 'next/head'
import {Container, CssBaseline, ThemeProvider} from "@mui/material";
import ReaderAppBar from "../../components/ReaderAppBar";
import theme from "../../config/Theme";
import Book from "../../models/Book";

export default function Reader({user, readerData, chapterText}) {
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="container">
            <Head>
                <title>Reader</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <ReaderAppBar
                    readerData={readerData}
                    user={user}
                />
                <Container>
                    <h1>{readerData.chapter.title}</h1>
                    <p>{chapterText}</p>
                </Container>
            </main>
        </div>
      </ThemeProvider>
  )
}

export async function getServerSideProps(context) {
    // OK - define bookId from URL
    // define chapterId from URL
    // define User
    // check access
    // fetch bookInfo
    // fetch chapter info
    // fetch text

    // define bookId from URL
    const slug = context.params?.slug;
    const bookId = Book.extractIdFromSlug(slug);

    if (bookId === undefined) {
        return { props: {err: { statusCode: 404 }} }
    }

    // define chapterId from URL
    const chapterId = context.query.c;

    // TODO: define User

    // TODO: check access

    // fetch bookInfo


    //const bookId = 196551;
    const URL = `https://api.dev.litnet.com/v2/library/is-exists?bookId=${bookId}`;
    const inLib = await fetch(URL).then(response => response.json());

    const readerData = {
        isInLibrary: inLib,
        chapter: {
            title: 'Глава 2. Рубиновый город'
        },
        bookUrl: 'https://dev.litnet.com/ru/book/disgardium-ugroza-a-klassa-b89465',
    }

    const user = {
        isUserLoggedIn: true
    }

    return {
        props: {
            user,
            readerData,
            chapterText: 'Тут будет текст главы',
        }
    }
}

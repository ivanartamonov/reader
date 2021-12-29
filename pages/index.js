import Head from 'next/head'
import {Container, CssBaseline, ThemeProvider} from "@mui/material";
import ReaderAppBar from "../components/ReaderAppBar";
import theme from "../config/Theme";
import LibraryRepository, {useBookQuery} from "../data/library/LibraryRepository";
import {useBookInLibraryStatus} from "../queries/library";

export default function Home({user, readerData, chapterText}) {
    const libRepo = LibraryRepository;
    //console.log(useBookQuery(196551));
    console.log(useBookInLibraryStatus(196551));

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
    //const bookId = 196551;

    //const {data: bookInLibStatus, isSuccess} = useBookInLibraryStatus(bookId);

    const readerData = {
        isInLibrary: true,
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

import Head from 'next/head'
import {CssBaseline, ThemeProvider} from "@mui/material";
import ReaderAppBar from "../../components/reader/ReaderAppBar";
import theme from "../../config/Theme";
import Book from "../../models/Book";
import ApiClient from "../../queries/client/ApiClient";
import {CFG} from "../../queries/config";
import ReaderText from "../../components/reader/ReaderText";

export default function Reader({user, readerData, chapterText, book, toc}) {
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
                    book={book}
                    toc={toc}
                />
                <ReaderText
                    readerData={readerData}
                    chapterText={chapterText}
                    currentPage={readerData.page}
                />
            </main>
        </div>
      </ThemeProvider>
  )
}

export async function getServerSideProps(context) {
    let {bookId, chapterId, page} = extractQueryParams(context);

    if (bookId === undefined) {
        return { props: {err: { statusCode: 404 }} }
    }

    // define User
    const userData = await defineUser(context);
    if (userData.token) {
        ApiClient._jwt = userData.token;
    }

    // fetch bookInfo
    const book = await fetchBook(bookId, chapterId === undefined);

    // fetch chapterInfo
    if (chapterId === undefined) {
        chapterId = book.firstChapterId;
    }
    const chapterInfo = await fetchChapter(chapterId);
    if (page > chapterInfo.pages_count) {
        page = 1;
    }

    const inLib = await fetch(`${CFG.BASE_API_URL}library/is-exists/${bookId}`, {
        headers: {
            Authorization: 'Bearer ' + userData.token
        }
    }).then(response => response.json());

    // fetch text
    const text = await fetchText(chapterId, page);

    // fetch toc
    const toc = await fetchToc(bookId);

    const readerData = {
        isInLibrary: inLib,
        chapter: {
            id: chapterInfo.id,
            title: chapterInfo.title
        },
        page: page,
        bookUrl: book.link,
    }

    const user = {
        jwt: userData.token,
        isUserLoggedIn: typeof userData !== undefined,
        ...userData.user
    }

    return {
        props: {
            user,
            readerData,
            chapterText: text.text,
            book,
            toc
        }
    }
}

function extractQueryParams(context) {
    return {
        bookId: Book.extractIdFromSlug(context.params?.slug),
        chapterId: context.query.c,
        page: context.query.p ? parseInt(context.query.p, 10) : 1
    };
}

function defineUser(context)  {
    const cookie = context.req ? context.req.headers.cookie : null;

    if (cookie) {
        return fetch(`${CFG.BASE_WEB_URL}auth/front`, {
            headers: {
                cookie
            }
        }).then(response => response.json());
    }

    return null;
}

function fetchBook(bookId, withFirstChapter)  {
    let url = `${CFG.BASE_API_URL}book/get/${bookId}?expand=link,coverUrl,author,status,paperPages`;

    if (withFirstChapter) {
        url += ',firstChapterId';
    }

    return ApiClient.call(url);
}

function fetchChapter(chapterId) {
    return ApiClient.call(`${CFG.BASE_API_URL}chapter/${chapterId}`);
}

function fetchText(chapterId, page) {
    return ApiClient.call(`${CFG.BASE_API_URL}read/${chapterId}?page=${page}`);
}

function fetchToc(bookId) {
    return ApiClient.call(`${CFG.BASE_API_URL}book/${bookId}/contents`);
}
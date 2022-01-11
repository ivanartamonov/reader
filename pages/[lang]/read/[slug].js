import Head from 'next/head'
import ReaderAppBar from "../../../components/reader/ReaderAppBar";
import Book from "../../../models/Book";
import ApiClient from "../../../queries/client/ApiClient";
import {CFG} from "../../../queries/config";
import ReaderText from "../../../components/reader/ReaderText";
import {useContext, useState} from "react";
import {ThemeContext} from "../../../components/ThemeProvider";

export default function Reader({user, readerData: readerInfo, chapterText, book, toc}) {
    const [readerData, setReaderData] = useState(readerInfo);
    const [text, setText] = useState(chapterText);
    const [page, setPage] = useState(readerInfo.page);
    const [prevChapter, setPrevChapter] = useState(definePrevChapterId(readerInfo.chapter.id, toc));
    const [nextChapter, setNextChapter] = useState(defineNextChapterId(readerInfo.chapter.id, toc));
    const [settings, setSettings] = useState({fontSize: 18});
    const {themeName} = useContext(ThemeContext);

    ApiClient._jwt = user.jwt;

    const getText = async (chapterId, page) => {
        return await ApiClient.call(`${CFG.BASE_API_URL}read/${chapterId}?page=${page}`);
    }

    function loadPage(page) {
        setPage(page);
        updateText(readerData.chapter.id, page);
    }

    function loadChapter (chapterId, page = 1) {
        let newChapter;

        for (let i=0; i < toc.length; i++) {
            if (toc[i].id == chapterId) {
                newChapter = {
                    id: parseInt(toc[i].id),
                    title: toc[i].title,
                    pages: parseInt(toc[i].pages_count)
                };
                break;
            }
        }

        if (newChapter !== undefined) {
            const newReaderData = {...readerData, chapter: newChapter, page: page};
            setReaderData(newReaderData);
            setPage(page);
            setPrevChapter(definePrevChapterId(newReaderData.chapter.id, toc));
            setNextChapter(defineNextChapterId(newReaderData.chapter.id, toc));
            updateText(newReaderData.chapter.id, page);
        }
    }

    function updateText(chapterId, page) {
        const promise = getText(chapterId, page);
        promise.then((res) => {
            setText(res.text);
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    const onTextSizeChange = (event, value) => {
        setSettings({...settings, fontSize: value});
    }

    return (
        <div className="container">
            <Head>
                <title>Reader</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="theme-color" content={themeName === 'DEFAULT' ? '#fff' : '#222'} />
            </Head>

            <main>
                <ReaderAppBar
                    readerData={readerData}
                    user={user}
                    book={book}
                    toc={toc}
                    loadChapter={loadChapter}
                    onTextSizeChange={onTextSizeChange}
                    settings={settings}
                />
                <ReaderText
                    readerData={readerData}
                    chapterText={text}
                    currentPage={page}
                    loadPage={loadPage}
                    loadChapter={loadChapter}
                    prevChapter={prevChapter}
                    nextChapter={nextChapter}
                    settings={settings}
                />
            </main>
        </div>
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
            title: chapterInfo.title,
            pages: chapterInfo.pages_count
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
    // Works on localhost
    return {"user":{"id":5,"name":"Ivan Artamonov","is_registered":1,"is_active":1,"avatar":"/uploads/user_avatars_new/160/1507201969_5.jpg"},"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImp0aSI6InRWUVFlZDVlNDdJOG15bEJNbTVoIn0.eyJpc3MiOiIiLCJhdWQiOiIiLCJqdGkiOiJ0VlFRZWQ1ZTQ3SThteWxCTW01aCIsImlhdCI6MTY0MTkzNDQ4NSwiZXhwIjoxNjQxOTM0Nzg1LCJ1aWQiOjV9.ufo2wDxUX2dIrnZg8GFfzCtsDbRdQ1sS2SnfH9Kn6So"};

    // Works only on domain: dev.litnet.com
    /*const cookie = context.req ? context.req.headers.cookie : null;

    if (cookie) {
        return fetch(`${CFG.BASE_WEB_URL}auth/front`, {
            headers: {
                cookie
            }
        }).then(response => response.json());
    }

    return null;
    */
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

function definePrevChapterId(currentChapterId, toc) {
    for (let i=0; i < toc.length; i++) {
        if (parseInt(toc[i].id) === currentChapterId && i > 0) {
            return {
                id: parseInt(toc[i-1].id),
                pages: parseInt(toc[i-1].pages_count)
            }
        }
    }

    return null;
}

function defineNextChapterId(currentChapterId, toc) {
    for (let i=0; i < toc.length; i++) {
        if (parseInt(toc[i].id) === currentChapterId && i < toc.length-1) {
            return {
                id: parseInt(toc[i+1].id),
                pages: parseInt(toc[i+1].pages_count)
            }
        }
    }

    return null;
}
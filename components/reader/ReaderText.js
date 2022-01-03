import React, {useState} from 'react';
import ReaderPagination from "./ReaderPagination";
import {Container} from "@mui/material";
import ApiClient from "../../queries/client/ApiClient";
import {CFG} from "../../queries/config";

const ReaderText = ({readerData, chapterText, currentPage}) => {
    const [text, setText] = useState(chapterText);
    const [page, setPage] = useState(currentPage);

    const getText = async (chapterId, page) => {
        return await ApiClient.call(`${CFG.BASE_API_URL}read/${chapterId}?page=${page}`);
    }

    function toPage(page) {
        setPage(page);

        const promise = getText(readerData.chapter.id, page);
        promise.then((res) => {
            setText(res.text);
            window.scrollTo({
                top: 0,
                //behavior: "smooth"
            });
        });
    }

    return (
        <Container sx={{ maxWidth:'800px'}} maxWidth={false}>
            {page === 1 ? <h1>{readerData.chapter.title}</h1> : ''}

            <div dangerouslySetInnerHTML={{__html:text}} />
            <ReaderPagination
                currentPage={page}
                totalPages={2}
                locked={false}
                onPageChange={toPage}
            />
        </Container>
    );
};

export default ReaderText;
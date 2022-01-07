import React from 'react';
import ReaderPagination from "./ReaderPagination";
import {Container} from "@mui/material";

const ReaderText = ({readerData, chapterText, currentPage, loadPage, loadChapter, prevChapter, nextChapter, settings}) => {
    return (
        <Container sx={{ maxWidth:'800px'}} maxWidth={false}>
            {currentPage === 1 ? <h1>{readerData.chapter.title}</h1> : ''}

            <div dangerouslySetInnerHTML={{__html:chapterText}} style={{fontSize: `${settings.fontSize}px`}} />

            <ReaderPagination
                currentPage={currentPage}
                totalPages={readerData.chapter.pages}
                locked={false}
                onPageChange={loadPage}
                loadChapter={loadChapter}
                prevChapter={prevChapter}
                nextChapter={nextChapter}
            />
        </Container>
    );
};

export default ReaderText;
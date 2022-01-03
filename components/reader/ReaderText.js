import React from 'react';
import ReaderPagination from "./ReaderPagination";
import {Container} from "@mui/material";

const ReaderText = ({readerData, chapterText, currentPage}) => {
    return (
        <Container sx={{ maxWidth:'800px'}} maxWidth={false}>
            <h1>{readerData.chapter.title}</h1>
            <div dangerouslySetInnerHTML={{__html:chapterText}} />
            <ReaderPagination
                currentPage={currentPage}
                totalPages={2}
                locked={false}
            />
        </Container>
    );
};

export default ReaderText;
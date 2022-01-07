import React from 'react';
import {AppBar, Box, IconButton, Toolbar, Typography} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {MoreVert, Settings} from "@mui/icons-material";
import ToLibraryButton from "../ToLibraryButton";
import TocPanel from "./TOCPanel";
import ReaderSettingsDialog from "./ReaderSettingsDialog";

const ReaderAppBar = ({user, readerData, book, toc, loadChapter, onTextSizeChange, settings}) => {
    return (
        <Box sx={{ flexGrow: 1}}>
            <AppBar
                position={"static"}
                color={'white'}
                sx={{
                    boxShadow: 'none',
                    borderBottom: '1px solid #f1f1f1'
                }}>
                <Toolbar>
                    <IconButton
                        size="medium"
                        edge="start"
                        color="inherit"
                        aria-label="back"
                        sx={{ mr: 2 }}
                        href={readerData.bookUrl}
                    >
                        <ArrowBackIcon />
                    </IconButton>

                    <Typography variant="p" component="div" sx={{ flexGrow: 1 }}>
                        {readerData.chapter.title}
                    </Typography>

                    <ToLibraryButton
                        isUserLoggedIn={user.isUserLoggedIn}
                        inLibrary={readerData.isInLibrary}
                    />

                    <TocPanel
                        book={book}
                        currentChapterId={readerData.chapter.id}
                        toc={toc}
                        loadChapter={loadChapter}
                    />

                    <ReaderSettingsDialog
                        settings={settings}
                        onTextSizeChange={onTextSizeChange}
                    />

                    <IconButton
                        size="medium"
                        color="inherit"
                        aria-label="More"
                        sx={{ ml: 1 }}
                    >
                        <MoreVert />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default ReaderAppBar;
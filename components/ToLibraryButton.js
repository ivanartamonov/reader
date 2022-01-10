import React, {useState} from 'react';
import {IconButton, Snackbar} from "@mui/material";
import {Bookmark, BookmarkBorder} from "@mui/icons-material";
import ApiClient from "../queries/client/ApiClient";
import {CFG} from "../queries/config";

const ToLibraryButton = ({isUserLoggedIn, inLibrary, bookId}) => {
    const [isInLibrary, setIsInLibrary] = useState(inLibrary);
    const [snack, setSnack] = useState({
        open: false,
        message: ''
    });

    async function toLibrary(bookId) {
        return await ApiClient.call(`${CFG.BASE_API_URL}library/add/${bookId}`);
    }

    async function fromLibrary(bookId) {
        return await ApiClient.call(`${CFG.BASE_API_URL}library/remove/${bookId}`);
    }

    function handleClick(isInLibrary) {
        if (!isUserLoggedIn) {
            console.log('Нужно залогиниться');
            return;
        }

        if (isInLibrary) {
            const promise = toLibrary(bookId);
            promise.then((res) => {
                if (res === true) {
                    setIsInLibrary(isInLibrary);
                    setSnack({open: true, message: 'Добавлено в библиотеку'});
                }
            });
        } else {
            const promise = fromLibrary(bookId);
            promise.then((res) => {
                if (res === true) {
                    setIsInLibrary(isInLibrary);
                    setSnack({open: true, message: 'Убрано из библиотеки'});
                }
            });
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnack({open: false, message: ''});
    };

    return (
        <>
            <IconButton
                size="medium"
                color="inherit"
                aria-label="To library"
                sx={{ ml: 'auto' }}
                onClick={() => handleClick(!isInLibrary)}
            >
                {
                    isInLibrary
                        ? <Bookmark color={'primary'} />
                        : <BookmarkBorder />
                }
            </IconButton>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                open={snack.open}
                autoHideDuration={2000}
                message={snack.message}
                onClose={handleClose}
                key={'library_snackbar'}
            />
        </>
    );
};

export default ToLibraryButton;
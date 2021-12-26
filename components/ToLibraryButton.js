import React, {useState} from 'react';
import {IconButton} from "@mui/material";
import {Bookmark, BookmarkBorder} from "@mui/icons-material";

const ToLibraryButton = ({isUserLoggedIn, inLibrary}) => {
    const [isInLibrary, setIsInLibrary] = useState(inLibrary);

    function handleClick(isInLibrary) {
        if (!isUserLoggedIn) {
            console.log('Нужно залогиниться');
            return;
        }

        setIsInLibrary(isInLibrary);

        if (isInLibrary) {
            console.log('Добавили в библиотеку');
        } else {
            console.log('Убрали из библиотеки');
        }
    }

    return (
        <IconButton
            size="medium"
            color="inherit"
            aria-label="To library"
            sx={{ ml: 1 }}
            onClick={() => handleClick(!isInLibrary)}
        >
            {
                isInLibrary
                    ? <Bookmark color={'primary'} />
                    : <BookmarkBorder />
            }
        </IconButton>
    );
};

export default ToLibraryButton;
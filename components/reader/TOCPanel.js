import React, {useState} from 'react';
import {Box, Drawer, IconButton, Link, List, ListItem, ListItemText, useTheme} from "@mui/material";
import {FormatListBulleted, Refresh} from "@mui/icons-material";
import {useMediaQuery} from "react-responsive";
import styles from './TOCPanel.module.scss';

const TocPanel = ({book, currentChapterId, toc, loadChapter}) => {
    const [panelState, setPanelState] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const theme = useTheme();

    const toggleDrawer = () => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setPanelState(!panelState);
    }

    function onSelectChapter(event, chapterId) {
        event.preventDefault();
        setPanelState(!panelState);
        loadChapter(chapterId);
    }

    const bookInfo = () => (
        <div className={styles.bookInfo}>
            <Box
                component="img"
                className={styles.bookCover}
                alt={book.title}
                src={book.coverUrl[isMobile ? 80 : 120]}
            />
            <div>
                <Link href={book.author.link} className={styles.authorLink}>{book.author.name}</Link>
                <h2 className={styles.bookTitle}>{book.title}</h2>
                <div className={styles.bookStatus}>
                    <Refresh />
                    {book.status.name}, {book.paperPages} стр.
                </div>
            </div>
        </div>
    );

    const tocItem = (chapter) => (
        <div className={styles.tocItem} key={chapter.id}>
            {currentChapterId === parseInt(chapter.id, 10)
                ? (
                    <span
                        className={styles.current}
                        style={{
                            borderBottom: '1px solid',
                            borderColor: theme.palette.divider,
                            color: theme.palette.link.accent
                        }}
                    >
                        {chapter.title}
                    </span>
                )
                : (
                    <Link
                        href={chapter.link}
                        onClick={event => onSelectChapter(event, chapter.id)}
                        variant={'secondary'}
                        style={{
                            borderBottom: '1px solid',
                            borderColor: theme.palette.divider
                        }}
                    >
                        {chapter.title}
                    </Link>
                )
            }
        </div>
    );

    const list = () => (
        <Box
            className={styles.panelBox}
            role="presentation"
        >
            {bookInfo()}
            <h3>Содержание</h3>
            <div className={styles.toc}>
                {toc.map((chapter) => (
                    tocItem(chapter)
                ))}
            </div>
        </Box>
    );

    return (
        <React.Fragment key={'right'}>
            <IconButton
                size="medium"
                color="inherit"
                aria-label="Chapters"
                sx={{ ml: 1 }}
                onClick={toggleDrawer()}
            >
                <FormatListBulleted />
            </IconButton>

            <Drawer
                anchor={'right'}
                open={panelState}
                onClose={toggleDrawer()}
            >
                {list()}
            </Drawer>

        </React.Fragment>
    );
};

export default TocPanel;
import React, {useState} from 'react';
import {Box, Drawer, IconButton, List, ListItem, ListItemText} from "@mui/material";
import {FormatListBulleted, Refresh} from "@mui/icons-material";
import {useMediaQuery} from "react-responsive";
import styles from './TOCPanel.module.scss';

const TocPanel = ({book}) => {
    const [panelState, setPanelState] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 767 });

    const toggleDrawer = () => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setPanelState(!panelState);
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
                <a href={book.author.link} className={styles.authorLink}>{book.author.name}</a>
                <h2 className={styles.bookTitle}>{book.title}</h2>
                <div className={styles.bookStatus}>
                    <Refresh />
                    {book.status.name}, {book.paperPages} стр.
                </div>
            </div>
        </div>
    );

    const list = () => (
        <Box
            className={styles.panelBox}
            role="presentation"
        >
            {bookInfo()}
            <h3>Содержание</h3>
            <List>
                {['Глава 1', 'Глава 2', 'Глава 3'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
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
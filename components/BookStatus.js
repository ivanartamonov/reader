import React from 'react';
import {Check, Refresh, ShortText} from "@mui/icons-material";
import {makeStyles} from "@mui/styles";

const BookStatus = ({book}) => {
    const useStyles = makeStyles(() => ({
        root: {
            display: 'flex',
            fontSize: '12px',
            alignItems: 'center',
            lineHeight: '28px',
            '& svg': {
                fontSize: '14px',
                marginRight: '3px'
            }
        }
    }));

    const styles = useStyles();

    const STATUS = {
        PREPARING: 1,
        IN_PROGRESS: 2,
        FINISHED: 3,
        FROZEN: 4,
        FRAGMENT: 5
    };

    const icon = (status) => {
        switch (status) {
            case STATUS.PREPARING: return <Refresh />;
            case STATUS.IN_PROGRESS: return <Refresh />;
            case STATUS.FINISHED: return <Check />;
            case STATUS.FROZEN: return <ShortText />;
            case STATUS.FRAGMENT: return <ShortText />;
        }
    };

    return (
        <div>
            <div className={styles.root}>
                {icon(book.status.code)}
                {book.status.name}, {book.paperPages} стр.
            </div>
        </div>
    );
};

export default BookStatus;
import React, {useState} from 'react';
import {Box, Button, IconButton, Pagination, useTheme} from "@mui/material";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";
import MediaQuery, {useMediaQuery} from "react-responsive";

const ReaderPagination = ({page, totalPages, locked}) => {
    const [page, setPage] = useState(page);
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const theme = useTheme();

    function back() {
        if (page === 1) {
            return;
        }

        setPage(page - 1);
    }

    function next() {
        if (page < totalPages) {
            setPage(page + 1);
        }
    }

    function toPage(page) {
        setPage(page);
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '20px',
                paddingBottom: '40px',
            }}
        >
            <MediaQuery maxWidth={767}>
                <IconButton
                    variant="outlined"
                    color="black"
                    size="large"
                    onClick={back}
                    disabled={page === 1 || locked}
                    sx={{
                        border: '1px solid',
                        borderColor: theme.palette.secondary
                    }}
                >
                    <KeyboardArrowLeft />
                </IconButton>
            </MediaQuery>

            <MediaQuery minWidth={768}>
                <Button
                    variant="outlined"
                    color="black"
                    size="large"
                    startIcon={<KeyboardArrowLeft />}
                    sx={{textTransform: 'none'}}
                    onClick={back}
                    disabled={page === 1 || locked}
                >
                    {isMobile ? '' : 'Назад'}
                </Button>
            </MediaQuery>

            <Pagination
                count={totalPages}
                page={page}
                hideNextButton={true}
                hidePrevButton={true}
                shape='rounded'
                disabled={locked}
                siblingCount={1}
                boundaryCount={1}
                size={isMobile ? 'small' : 'medium'}
                onChange={(data, page) => toPage(page)}
            />

            <MediaQuery maxWidth={767}>
                <IconButton
                    variant="outlined"
                    color="black"
                    size="large"
                    edge='end'
                    onClick={next}
                    disabled={page === totalPages || locked}
                    sx={{
                        border: '1px solid',
                        borderColor: theme.palette.secondary
                    }}
                >
                    <KeyboardArrowRight />
                </IconButton>
            </MediaQuery>
            <MediaQuery minWidth={768}>
                <Button
                    variant="outlined"
                    color="black"
                    size="large"
                    endIcon={<KeyboardArrowRight />}
                    sx={{textTransform: 'none'}}
                    onClick={next}
                    disabled={page === totalPages || locked}
                >
                    Далее
                </Button>
            </MediaQuery>
        </Box>
    );
};

export default ReaderPagination;
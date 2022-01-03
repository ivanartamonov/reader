import React from 'react';
import {Box, Button, IconButton, Pagination, useTheme} from "@mui/material";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";
import MediaQuery, {useMediaQuery} from "react-responsive";

const ReaderPagination = ({currentPage, totalPages, locked, onPageChange}) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const theme = useTheme();

    function back() {
        if (currentPage === 1) {
            return;
        }
        onPageChange(currentPage - 1);
    }

    function next() {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    }

    function toPage(page) {
        onPageChange(page);
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
                    disabled={currentPage === 1 || locked}
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
                    disabled={currentPage === 1 || locked}
                >
                    {isMobile ? '' : 'Назад'}
                </Button>
            </MediaQuery>

            <Pagination
                count={totalPages}
                page={currentPage}
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
                    disabled={currentPage === totalPages || locked}
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
                    disabled={currentPage === totalPages || locked}
                >
                    Далее
                </Button>
            </MediaQuery>
        </Box>
    );
};

export default ReaderPagination;
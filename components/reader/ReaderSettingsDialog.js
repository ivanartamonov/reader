import React, {useState} from 'react';
import {Settings} from "@mui/icons-material";
import {IconButton, Popover} from "@mui/material";
import ReaderSettingsControls from "./ReaderSettingsControls";

const ReaderSettingsDialog = ({settings, onTextSizeChange}) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const isOpen = Boolean(anchorEl);
    const id = isOpen ? 'settings-popover' : undefined;

    return (
        <div>
            <IconButton
                size="medium"
                color="inherit"
                aria-label="Settings"
                sx={{ ml: 1 }}
                onClick={handleClick}
            >
                <Settings />
            </IconButton>

            <Popover
                id={id}
                open={isOpen}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <ReaderSettingsControls
                    settings={settings}
                    onTextSizeChange={onTextSizeChange}
                />
            </Popover>
        </div>
    );
};

export default ReaderSettingsDialog;
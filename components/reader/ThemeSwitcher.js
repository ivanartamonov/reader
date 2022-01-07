import React from 'react';
import styles from './reader_settings.module.scss';
import {Box, Radio, Typography} from "@mui/material";
import {ColorLens} from "@mui/icons-material";

const ThemeSwitcher = () => {
    return (
        <Box
            className={styles.themeSizeRoot}
            width="100%"
            display="flex"
            justifyContent="center"
        >
            <Typography className={styles.label}>
                Цвет фона
            </Typography>

            <Box className={styles.control}>
                <Box mr={2}>
                    <ColorLens />
                </Box>

                <Box className={styles.group}>
                    <Radio
                        disableRipple
                        disableFocusRipple
                        disableTouchRipple
                        sx = {{padding: 0, marginRight: '5px'}}
                        classes={styles.radio}
                        checkedIcon={
                            <Box className={styles.icon}/>
                        }
                        icon={
                            <Box className={styles.icon}/>
                        }
                    />
                    <Radio
                        disableRipple
                        disableFocusRipple
                        disableTouchRipple
                        sx = {{padding: 0, marginRight: '5px'}}
                        classes={styles.radio}
                        checkedIcon={
                            <Box className={styles.icon}/>
                        }
                        icon={
                            <Box className={styles.icon}/>
                        }
                    />
                    <Radio
                        disableRipple
                        disableFocusRipple
                        disableTouchRipple
                        sx = {{padding: 0, marginRight: '5px'}}
                        classes={styles.radio}
                        checkedIcon={
                            <Box className={styles.icon}/>
                        }
                        icon={
                            <Box className={styles.icon}/>
                        }
                    />
                    <Radio
                        disableRipple
                        disableFocusRipple
                        disableTouchRipple
                        sx = {{padding: 0}}
                        classes={styles.radio}
                        checkedIcon={
                            <Box className={styles.icon}/>
                        }
                        icon={
                            <Box className={styles.icon}/>
                        }
                    />
                </Box>
            </Box>

        </Box>
    );
};

export default ThemeSwitcher;
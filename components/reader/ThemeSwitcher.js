import React, {useContext} from 'react';
import styles from './reader_settings.module.scss';
import {Box, Radio, Typography} from "@mui/material";
import {Check, ColorLens} from "@mui/icons-material";
import {ThemeContext} from "../ThemeProvider";

const ThemeSwitcher = () => {
    const {themeName, themes, setTheme} = useContext(ThemeContext);

    function changeTheme(newThemeName) {
        setTheme(newThemeName);
    }

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
                        sx = {{
                            padding: 0,
                            marginRight: '5px',

                        }}
                        classes={styles.radio}
                        checkedIcon={
                            <Box className={styles.icon} sx={{
                                background: '#fff',
                                border: '1px solid',
                                borderColor: '#f1f1f1',
                                textAlign: 'center'
                            }}>
                                <Check sx={{
                                    fontSize: '14px'
                                }} />
                            </Box>
                        }
                        icon={
                            <Box className={styles.icon} sx={{
                                background: '#fff',
                                border: '1px solid',
                                borderColor: '#ccc'
                            }} />
                        }
                        checked={themeName === 'DEFAULT'}
                        onClick={() => changeTheme('DEFAULT')}
                    />
                    <Radio
                        disableRipple
                        disableFocusRipple
                        disableTouchRipple
                        sx = {{padding: 0, marginRight: '5px'}}
                        classes={styles.radio}
                        checkedIcon={
                            <Box className={styles.icon} sx={{
                                background: '#333',
                                border: '1px solid',
                                borderColor: '#666',
                                textAlign: 'center'
                            }}>
                                <Check sx={{
                                    fontSize: '14px',
                                    color: '#fff'
                                }} />
                            </Box>
                        }
                        icon={
                            <Box className={styles.icon} sx={{
                                background: '#333',
                                border: '1px solid',
                                borderColor: '#333'
                            }} />
                        }
                        checked={themeName === 'DARK'}
                        onClick={() => changeTheme('DARK')}
                    />
                </Box>
            </Box>

        </Box>
    );
};

export default ThemeSwitcher;
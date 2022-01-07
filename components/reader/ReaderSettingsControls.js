import React from 'react';
import TextSizeSwitcher from "./TextSizeSwitcher";
import styles from './reader_settings.module.scss';
import ThemeSwitcher from "./ThemeSwitcher";

const ReaderSettingsControls = () => {
    return (
        <div className={styles.settings_container}>
            <TextSizeSwitcher />
            <ThemeSwitcher />
        </div>
    );
};

export default ReaderSettingsControls;
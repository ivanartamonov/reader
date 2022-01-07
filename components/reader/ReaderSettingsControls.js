import React from 'react';
import TextSizeSwitcher from "./TextSizeSwitcher";
import styles from './reader_settings.module.scss';
import ThemeSwitcher from "./ThemeSwitcher";

const ReaderSettingsControls = ({settings, onTextSizeChange}) => {
    return (
        <div className={styles.settings_container}>
            <TextSizeSwitcher onChange={onTextSizeChange} value={settings.fontSize} />
            <ThemeSwitcher />
        </div>
    );
};

export default ReaderSettingsControls;
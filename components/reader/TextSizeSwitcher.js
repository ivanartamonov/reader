import {Box, Slider, Typography} from "@mui/material";
import {FormatSize} from "@mui/icons-material";
import React from 'react';
import styles from './reader_settings.module.scss';

const TextSizeSwitcher = ({onChange, value}) => {
  return (
    <Box className={styles.fontSizeRoot}>
      <Typography
          vairant="body1"
          className={styles.label}
      >
        Размер текста
      </Typography>

      <Box className={styles.control}>
        <Box mr={2}>
          <FormatSize />
        </Box>

        <Slider
            defaultValue={18}
            size={'small'}
            ValueLabelComponent={Box}
            onChange={onChange}
            value={value}
            valueLabelDisplay="auto"
            step={0.5}
            min={12}
            max={24}
        />
      </Box>
    </Box>
  )
}

export default TextSizeSwitcher

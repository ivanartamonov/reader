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
            defaultValue={30}
            size={'small'}
            ValueLabelComponent={Box}
            onChange={onChange}
            value={value}
            marks
            valueLabelDisplay="auto"
            step={1}
            min={0}
            max={2}
        />
      </Box>
    </Box>
  )
}

export default TextSizeSwitcher

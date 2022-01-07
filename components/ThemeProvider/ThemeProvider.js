import {useMemo, useState} from "react"
import ThemeContext from "./context"
import ThemeDefault from "../../styles/ThemeDefault";
import ThemeDark from "../../styles/ThemeDark";
import {ThemeProvider as MaterialThemeProvider} from "@mui/material";
import {CssBaseline} from "@mui/material";

export const THEMES = Object.freeze({
  'DEFAULT': ThemeDefault,
  'DARK': ThemeDark,
})

const ThemeProvider = ({ children }) => {
    const [themeName, setTheme] = useState("DEFAULT")

    const theme = useMemo(_ => {
        return THEMES[themeName];
    }
    ,[themeName]);

    return (
        <MaterialThemeProvider theme={theme}>
          <CssBaseline />
          <ThemeContext.Provider
              value={{
                themeName,
                setTheme,
                themes: THEMES
              }}
          >
            { children }
          </ThemeContext.Provider>
        </MaterialThemeProvider>
    )
}

export default ThemeProvider

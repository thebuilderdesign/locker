import React from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import { useSelector } from "react-redux";

import "../assets/sass/index.scss";

// ** Declare Theme Provider
const MaterialThemeProvider = ({ children }) => {
    const { isDarkMode } = useSelector((state) => state.config);
    const mode = isDarkMode ? "dark" : "light";
    const themeConfig = {
        dark: {
            palette: {
                mode: "dark",
                primary: {
                    main: "#e55370",
                },
                secondary: {
                    main: "#455ee7"
                },
            },
            shape: {
                borderRadius: 8
            },
            typography: {
                fontFamily: "Inter,sans-serif",
                fontSize: 14,
                color: "rgb(122, 138, 160)"
            },
            custom: {
                boxShadow: "0 0 24px 2px rgb(0 0 0 / 15%)",
                spinner: "linear-gradient(90deg, #e55370, #435ee8)",
                appbar: "#17171a",
                footer: "#222222",
                hoverColor: "rgb(69 94 231 / 10%)"
            },
            components: {
                MuiTooltip: {
                    tooltip: {
                        fontSize: 12,
                    }
                }
            }
        },
        light: {
            palette: {
                mode: "light",
                primary: {
                    main: "#e55370",
                },
                secondary: {
                    main: "#455ee7"
                },
                background: {
                    default: "rgb(242 244 246)",
                    paper: "#fff"
                }
            },
            typography: {
                // fontFamily: "'Manrope', Poppins",
                fontFamily: "Inter,sans-serif",
                fontSize: 14,
                color: "rgb(122, 138, 160)"
            },
            shape: {
                borderRadius: 8
            },
            custom: {
                boxShadow: "0 0 25px 2px rgb(0 0 0 / 5%)",
                spinner: "linear-gradient(90deg, #e55370, #435ee8)",
                appbar: "linear-gradient(90deg, #e55370, #435ee8)",
                footer: "#fff",
                hoverColor: "rgb(229, 245, 255)"
            },
            components: {
                MuiTooltip: {
                    tooltip: {
                        fontSize: 12,
                    }
                }
            }
        },
    };

    const theme = createTheme(themeConfig[mode]);
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};
export default MaterialThemeProvider;

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(10, 0),
        "& .tools": {
            "&.mobile": {
                marginTop: theme.spacing(5),

                "& .card": {
                    "& > div": {
                        flexDirection: "column",
                        "& > div": {
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                        },
                        "& .search": {
                            marginTop: theme.spacing(2),
                            "& > div": {
                                width: "100%",
                                height: theme.spacing(6)
                            },
                            "& fieldset": {
                                borderColor: `${theme.palette.background.default} !important`
                            }
                        }
                    }
                }
            },

            marginTop: theme.spacing(10),
            "& .card": {
                boxShadow: theme.custom.boxShadow,
                borderRadius: theme.shape.borderRadius,

                "& > div": {
                    padding: theme.spacing(1.5, 2.5),
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",

                    "& button": {
                        textTransform: "capitalize"
                    },

                    "& .search": {
                        background: `${theme.palette.background.default} !important`,
                        borderRadius: theme.shape.borderRadius,
                        marginRight: theme.spacing(1),
                        "& > div": {
                            height: theme.spacing(4.5)
                        },
                        "& input": {
                            padding: theme.spacing(0.5)
                        },

                        "& fieldset": {
                            borderColor: `${theme.palette.background.default} !important`
                        }
                    },

                    "& > div": {
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                    },
                }
            }
        }
    },
    info: {
        "& .mobileGrid": {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            paddingTop: `${theme.spacing(1)} !important`,

            "&:nth-child(1)": {
                paddingTop: `${theme.spacing(4)} !important`,
            },

            "& .card": {
                width: "100%",
                boxShadow: theme.custom.boxShadow,
                borderRadius: theme.shape.borderRadius,
                "& > div": {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }
            },
            "& .title": {
                fontWeight: "bold",
                fontSize: theme.spacing(2),
            },
            "& .value": {
                fontWeight: "bold",
                fontSize: theme.spacing(2),
            },
        },
        "& .grid": {
            "& .card": {
                boxShadow: theme.custom.boxShadow,
                borderRadius: theme.shape.borderRadius,
                "& > div": {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column"
                }
            },
            "& .skelton": {
                fontSize: theme.spacing(3.25),
                width: "65%"
            },
            "& .title": {
                fontWeight: "bold",
                fontSize: theme.spacing(2),
            },
            "& .value": {
                fontWeight: "bold",
                fontSize: theme.spacing(3.25),
                textShadow: `0px 0px 8px ${theme.palette.primary.main}`,
                "&.big": {},
            },
        },
    },
    hide: {
        display: "none !important",
    },
    pools: {
        boxShadow: "none !important",
        overflow: "visible !important",
        background: `${theme.palette.background.default} !important`,
        "& > div": {
            padding: 0
        },

        paddingTop: theme.spacing(2),
        "& .MuiCardHeader-content": {
            "& span": {
                fontWeight: "bold",
                fontSize: theme.spacing(2.5),
            },
        },
        "& .grid": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            "& .title": {
                fontWeight: "bold",
                fontSize: theme.spacing(2),
            },
            "& .value": {
                fontWeight: "bold",
                fontSize: theme.spacing(3),
                "&.big": {},
            },
        },
        "& .wrap-info": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        "& .mobilePool": {
            "& > div": {
                padding: theme.spacing(2, 2),
            },
            "& .cell": {
                justifyContent: "space-between",
                "& p": {
                    fontWeight: 600,
                    padding: theme.spacing(0, 0.5),
                },
                "&:nth-child(3)": {
                    marginTop: theme.spacing(0),
                },
                "& .pool-title": {
                    flexGrow: 1,
                    paddingLeft: theme.spacing(0.5),
                    flexDirection: "column",
                    "& .title": {
                        lineHeight: "16px"
                    },
                    "& .description": {
                        fontSize: 12,
                    },
                },
            },
        },
        "& .pool": {
            width: "100%",
            cursor: "pointer",
            boxShadow: theme.custom.boxShadow,
            margin: theme.spacing(0, 0),
            borderRadius: theme.shape.borderRadius,
            "& > div": {
                padding: theme.spacing(2, 8),
            },
            "& .cell": {
                display: "flex",
                alignItems: "center",
                "& img": {
                    width: theme.spacing(6.5),
                    height: theme.spacing(6.5),
                    border: "1px solid rgba(32,114,214,74%)",
                    padding: theme.spacing(0.25),
                    borderRadius: 50,
                },
                "& p": {
                    fontWeight: 600,
                    padding: theme.spacing(0, 2),
                },
                "& .percentage": {
                    color: theme.palette.primary.main,
                    fontWeight: 700,
                    textShadow: "0px 0px 16px #e55370",
                    fontSize: theme.spacing(2.5),
                    display: "flex",
                    alignItems: "center"
                },
                "& .comment": {
                    fontSize: 16,
                },
                "& .pool-img": {
                    lineHeight: 0,
                },
                "& .pool-title": {
                    flexDirection: "column",
                    "& .description": {
                        fontSize: 16,
                    },
                },
                "&:nth-child(2)": {
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                },
                "&:nth-child(3)": {
                    flexDirection: "column",
                    justifyContent: "center",
                    "& p": {
                        fontWeight: 600,
                        padding: theme.spacing(0.5, 2),
                    },
                },
                "& .row": {
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                },
            },
            "& .target": {
                color: theme.palette.primary.main,
                marginLeft: "auto",
                fontSize: 12
            },
            "&:hover": {
                background: theme.custom.hoverColor,
                transition: ".2s",
            },
        },
        "& .lp-pools": {
            "& .vault-header": {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: theme.spacing(0, 0, 2, 0),

                "& > div": {
                    display: "flex"
                },

                "& .status": {
                    background: theme.palette.primary.main,
                    color: "white"
                },

                "& button": {
                    background: theme.palette.background.default,
                    borderRadius: theme.shape.borderRadius,
                    padding: theme.spacing(.4),
                    margin: theme.spacing(0, 0.5),
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: "transparent",

                    "&:hover": {
                        boxShadow: theme.custom.boxShadow,
                        borderColor: "rgba(0, 0, 0, .2)"
                    },
                    "& svg": {
                        height: 21
                    }
                },

                "& p": {
                    fontSize: theme.spacing(1.75),
                    background: theme.palette.background.default,
                    borderRadius: theme.shape.borderRadius,
                    padding: theme.spacing(0.5, 1)
                }
            },
            "& .lp-table": {
                "& td": {
                    padding: theme.spacing(1.5, 0.5)
                }
            },
            "& .card": {
                boxShadow: theme.custom.boxShadow,
                borderRadius: theme.shape.borderRadius,
                cursor: "pointer",
                "&:hover": {
                    background: theme.custom.hoverColor,
                    transition: ".2s",
                },
            },
            "& table": {
                "& tr": {
                    "& td": {
                        "&:nth-child(2)": {
                            textAlign: "right"
                        }
                    }
                }
            },
            "& .card-content": {
                display: "flex",
                flexDirection: "column",
                padding: theme.spacing(3, 6),
                "& .pool-img": {
                    display: "flex",
                    justifyContent: "center",
                    lineHeight: 0,
                    "& img": {
                        width: theme.spacing(6.5),
                        height: theme.spacing(6.5),
                        border: "1px solid rgba(32,114,214,20%)",
                        padding: theme.spacing(0.25),
                        borderRadius: 50,
                        background: theme.palette.background.default
                    },
                },
                "& .pool-title": {
                    flexDirection: "column",
                    padding: theme.spacing(1, 0),
                    textAlign: "center",
                    "& .description": {
                        fontSize: 16,
                    },
                },
                "& .percentage": {
                    color: theme.palette.primary.main,
                    fontWeight: 700,
                    textAlign: "center",
                    textShadow: "0px 0px 16px #e55370",
                    fontSize: theme.spacing(2.5),
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",

                    "& svg": {
                        marginLeft: theme.spacing(1)
                    }
                },
                "& .comment": {
                    textAlign: "center",
                    fontSize: theme.spacing(1.75),
                },
            }
        }
    },
    filterMenu: {
        "& li": {
            "& span": {
                padding: 5
            }
        },
    },
    sortMenu: {
        "& button": {
            marginLeft: theme.spacing(2),

            "& svg": {
                width: theme.spacing(2.5),
                height: theme.spacing(2.5)
            }
        }
    },
    tabs: {
        "& button": {
            fontSize: 18,
            fontWeight: 600,
            border: "1px solid #2b81eb",
            borderRadius: 4,
            margin: theme.spacing(2),
        },
        "& .Mui-selected": {
            boxShadow: theme.shadows[4],
            color: "#fff",
        },
        "& .MuiTabs-indicator": {
            height: "calc(100% - 32px)",
            zIndex: -1,
            borderRadius: 4,
            top: theme.spacing(2),
        },
    },
}));
export default useStyles;

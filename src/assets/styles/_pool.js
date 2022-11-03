import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "auto",
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
        padding: theme.spacing(5, 5),
        maxWidth: theme.spacing(500 / 8),
        borderRadius: `${theme.shape.borderRadius}px !important`,
        boxShadow: `${theme.custom.boxShadow} !important`,
        "& .aumi_reward_btn": {
            width: "100% !important",
            minWidth: theme.spacing(15),
            alignItems: "flex-end",
            "& button": {
                maxwidth: theme.spacing(15)
            }
        },
        "& .apr_value": {
            "& > div": {
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center"
            }
        },
        "& .table": {
            "& > tbody": {
                "& > tr": {
                    "& > td": {
                        fontWeight: 500,
                        fontSize: 16,
                        "& p": {
                            fontWeight: 500,
                            padding: theme.spacing(0, 2),
                            fontSize: 16,
                            textTransform: "uppercase",
                            display: "flex",
                            justifyContent: "center",
                            "& b": {
                                fontWeight: 600,
                            },
                        },
                    },
                    "& > td:nth-child(2)": {
                        fontWeight: 600,
                        textAlign: "center",
                        paddingLeft: 0,
                        paddingRight: 0
                    },
                    "& > td:nth-child(3)": {
                        textAlign: "right",
                        padding: 0,
                        "& button": {
                            padding: theme.spacing(0.5, 1),
                        },
                    },
                },
            },
        },
        "& .max-pattern": {
            "& > p": {
                padding: theme.spacing(0, 2),
                fontWeight: 600,
            },
            "& button": {
                margin: theme.spacing(0, 1),
            },
        },
        "& > button": {
            margin: theme.spacing(1, 0),
        },
        "& .input": {
            marginTop: theme.spacing(2.5),
            "& input": {
                textAlign: "right",
                fontWeight: 600,
            },
            "& > p": {
                fontWeight: 600,
                fontSize: 16,
                textAlign: "right",
            },
        },
        "& .feeDescription": {
            marginTop: theme.spacing(2.5),
            fontWeight: 600,
            fontSize: 16,
            textAlign: "center",
        },
        "& .tabs": {
            marginTop: theme.spacing(5),
            "& .Mui-selected": {
                fontWeight: 600,
            },
        },
        "& .checkout": {
            paddingTop: theme.spacing(3),
            "& button": {
                width: "100%",
                minHeight: 48,
            },
            "& .buttonGroup": {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                "& button": {
                    width: "calc(50% - 16px)",
                },
            },
        },
        "& .balance": {
            marginTop: theme.spacing(3),
            textAlign: "center",
            "& .title": {
                fontWeight: 600,
            },
            "& .value": {
                fontSize: 22,
                color: theme.palette.primary.main,
                fontWeight: 700,
            },
        },
        "& .compare-table": {
            margin: theme.spacing(1, 0),
            "& td": {
                verticalAlign: "top",
                textAlign: "center"
            },
            "& td:nth-child(2)": {
                textAlign: "right",
            }
        },
        "& > .title": {
            fontWeight: "bold",
            fontSize: 22,
            textAlign: "center",
            padding: theme.spacing(2, 0),
            paddingBottom: 0,
        },
        "& > .subtitle": {
            fontWeight: 600,
            fontSize: 16,
            textAlign: "center",
            paddingBottom: theme.spacing(1),
        },
    },
    lockingSelect: {
        "& > div": {
            padding: theme.spacing(1.5, 4)
        }
    },
    reforgedText: {
        display: "flex",
        justifyContent: "space-between",
        "& p": {
            padding: "0px !important"
        }
    },
    vhide: {
        visibility: "hidden"
    }
}));
export default useStyles;

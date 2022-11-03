import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    
    root: {
        display: "flex",
        flexDirection: "column",
    },
    content: {
        minHeight: "calc(100% - 152px)",
        overflow: "hidden",
    },
    mobileContent: {
        "& > div": {
            padding: theme.spacing(3, 1),
        },
    },
    spinRoot: {
        position: "fixed",
        zIndex: 2000,
        top: 88,
        left: 0,
        bottom: 0,
        right: 0,
        background: theme.custom.spinner,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        "& img": {
            height: 168,
            marginBottom: -32,
        },
        "& .progress": {
            width: theme.spacing(20),
            marginTop: theme.spacing(4),
            backgroundColor: "rgba(0,0,0,.2)",
            borderRadius: 8,
            "& > div": {
                background: "#fff",
            },
        },
    },
    btnText: {
        color:'#e55370',
    },
    hide: {
        display: "none",
    },
    coinList: {
        maxWidth: "480px !important",
        "& .action": {
            "& h2": {
                padding: theme.spacing(1.5, 2),
                paddingBottom: 0,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            },
        },
        "& .title": {
            fontSize: 24,
            textAlign: "center",
            fontWeight: "bold",
            color: theme.palette.primary.main,
        },
        "& .coin-list": {
            maxHeight: 600,
            overflow: "auto",
            padding: theme.spacing(0, 0),
            "& .item": {
                padding: theme.spacing(1, 5),
                "& .rank": {
                    minWidth: 40,
                    fontWeight: 600,
                    fontSize: 18,
                    color: theme.palette.primary.main,
                },
                "& .symbol": {
                    "& img": {
                        width: 36,
                        height: 36,
                    },
                },
                "& .name": {
                    "& > span": {
                        fontWeight: 600,
                        fontSize: 18,
                    },
                    "& > p": {
                        fontSize: 16,
                        "& > span": {
                            margin: theme.spacing(0, 1.5),
                            fontSize: 16,
                        },
                        "& .bad": {
                            color: "red",
                        },
                        "& .good": {
                            color: "green",
                        },
                    },
                    padding: theme.spacing(0, 2),
                },
            },
        },
        "& .progress": {
            height: 6,
        },
        "& .hide": {
            visibility: "hidden",
            transition: 0.25,
        },
    },
    connectWalletButton: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: theme.spacing(2, 2),
        paddingTop: 0,
        "& > button": {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: theme.spacing(1),
            marginBottom: theme.spacing(2),
            "& span": {
                margin: 0,
            },
            "& img": {
                width: theme.spacing(3),
                height: theme.spacing(3),
            },
        },
        borderRadius: theme.shape.borderRadius,
        "& .buttonGroup": {
            marginTop: theme.spacing(2),
            padding: theme.spacing(1),
        },
        "& .MuiInputBase-formControl": {
            "& input": {
                padding: theme.spacing(1),
            },
            "&:before": {
                display: "none",
            },
            "&:after": {
                display: "none",
            },
        },
        "& p": {
            fontSize: 13,
            fontWeight: "bold",
        },
        "& > span": {
            fontSize: 16,
            marginBottom: theme.spacing(2),
        },
    },
    deactivateButton: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 4),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(8),
        "& button": {
            width: "100%",
            height: theme.spacing(5),
            color: "white",
            fontSize: 13,
            fontWeight: 600,
            textTransform: "none",
            boxShadow: theme.shadows[0],
            "&:hover": {
                boxShadow: theme.shadows[1],
            },
        },
    },
    connectWallet: {
        maxWidth: "420px !important",
        minWidth: "360px !important",
        padding: theme.spacing(2, 2),
        paddingBottom: theme.spacing(1),
        paddingTop: 8,
        width: "inherit",
        "& .action": {
            padding: theme.spacing(2, 2),
            paddingLeft: theme.spacing(3),
            "& h2": {
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            },
            "& button": {
                marginTop: 6,
                marginBottom: 6,
                padding: "0px",
            },
        },
        "& .title": {
            fontSize: 20,
            textAlign: "center",
            fontWeight: "bold",
            marginLeft: 0,
            margin: "auto",
            color: theme.palette.primary.main,
        },
        "& .subtitle": {
            fontWeight: 600,
            textAlign: "center",
            "& b": {
                padding: theme.spacing(0, 2),
            },
        },
        "& .wallet-list": {
            padding: theme.spacing(4, 0),
            "& .item": {
                padding: theme.spacing(1, 4),
                borderRadius: 16,
                border: "none",
                "& .symbol": {
                    "& img": {
                        width: 42,
                        height: 42,
                    },
                },
                "& .name": {
                    "& > span": {
                        fontWeight: 600,
                    },
                    "& > p": {
                        fontWeight: 600,
                    },
                    padding: theme.spacing(0, 2),
                },
            },
        },
    },
}));
export default useStyles;

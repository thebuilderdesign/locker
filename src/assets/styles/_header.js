import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
    appbar: {
        height: theme.spacing(11),
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: `${theme.custom.appbar} !important`,
    },
    networkSelector: {
        "&:hover": {
            cursor: "pointer",
        },
    },
    animatedText : {
        textAlign:'center',
    },
    switchNetworkModal : {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    },
    "@keyframes opacityOn": {
        "0%" :{
            opacity: 0,
        },
        "100%": {
            opacity: 1,
        }
    },
    "@keyframes opacityOff": {
        "0%": {
            opacity: 1,
        },
        "100%": {
            opacity: 0,
        }
    },
    toolbar: {
        width: "100%",
        padding: theme.spacing(0, 6),
        minHeight: 74,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",

        "& .hacken": {
            padding: theme.spacing(3, 5),
            "& button": {
                color: "rgb(44 226 179)"
            },
            "& img": {
                margin: theme.spacing(0, 1),
                marginBottom: 0.75,
                height: theme.spacing(1.625)
            },
            "& p": {
                fontWeight: "bold",
                color: "#eee"
            },
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end"
        }
    },
    logo: {
        height: 72,
    },
    logo_mobile: {
        height: 30,
    },
    hide: {
        display: "none !important",
    },
    tabs: {
        minHeight: "0px !important",
        "& button": {
            height: theme.spacing(5),
            minHeight: 0,
            minWidth: "unset",
            textTransform: "none",
            fontWeight: 700,
            margin: theme.spacing(0, 1),
            padding: theme.spacing(0, 2),
            letterSpacing: "2px",
        },
        "& .Mui-selected": {
            color: "#fff",
        },
        "& .MuiTabs-indicator": {
            background: "#e55370",
            height: "100%",
            zIndex: -1,
            borderRadius: theme.spacing(2),
            "&:hover": {
                backgroundColor: "#da012c",
            },
        },
    },
    btnHeader:{
        padding:"10px 20px",
        color:"white",
        transition: "ease-in-out .3s",
        '&:hover': {
            color: "#e55370",
         },
    },
    actionGroup: {
        display: "flex",
        alignItems: "center",

        "& button": {
            boxShadow: theme.custom.boxShadow,
            borderRadius: theme.shape.borderRadius,
        }
    },
    actionGroupState: {
        display: "flex",
        alignItems: "center",
    },
    actionGroupSymbol: {
        "& img": {
            height: 32,
            borderRadius: 50,
            padding: theme.spacing(0.5),
            border: "1px solid #2072d6",
        },
    },
    actionGroupPrice: {
        color: "#fff",
        fontWeight: "bold !important",
        textShadow: "0 0 12px #fff",
        minWidth: 80,
    },
    connectWallet: {
        display: "flex",
        background: "#e55370",
        alignItems: "center",
        borderRadius: 18,
        marginLeft: theme.spacing(1),
        "& p": {
            fontSize: 13,
            fontWeight: "bold",
        },
        "& button": {
            boxShadow: "0 0 25px 2px rgb(0 0 0 / 15%)",
            textTransform: "none"
        },
    },
    darkModeButton: {
        padding: "8px !important",
        marginLeft: `${theme.spacing(2)} !important`,
    },
    drawerButton: {
        padding: "8px !important",
        marginLeft: `${theme.spacing(2)} !important`,
    },
    drawer: {
        "& .connectButton": {
            width: "100%",
            height: theme.spacing(6),
            margin: theme.spacing(2, 0),
            background: "linear-gradient(90deg, #e55370, #435ee8)",
        },
        "& ul": {
            paddingTop: theme.spacing(3),
            "& > a": {
                color: "unset",
                "& > div": {
                    padding: theme.spacing(1, 4),
                }
            },
            "& > div": {
                padding: theme.spacing(1, 4),
            },
        },
        "& .MuiListItemIcon-root": {
            minWidth: "unset",
        },
    },
}));
export default useStyles;

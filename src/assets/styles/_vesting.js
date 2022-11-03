import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
    appbar: {
        height: theme.spacing(11),
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: `${theme.custom.appbar} !important`,
    }
}));
export default useStyles;

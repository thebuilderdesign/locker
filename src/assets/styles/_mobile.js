import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: "0!important",
        paddingRight: "0!important"
    },
    button: {
        fontSize: '12px !important',
        padding: '8px 8px !important'
    },
    balanceContainer: {
        borderRadius:10, 
        border:"1px solid #e55370", 
        padding:"10px 5px",
    },
    datetimepicker: {
        width: '70%'
    }
}));
export default useStyles;

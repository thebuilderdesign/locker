import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
    appbar: {
        height: theme.spacing(11),
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: `${theme.custom.appbar} !important`,
    },
    networkImage:{
        height:'40px',
    },
    cardHeader: {
        backgroundColor:"#565656",
    },
    networkTitle: {
        fontWeight:'bold',
        margin:0,
    },
    mobileStepper: {
        marginTop:30,
        backgroundColor:"transparent",
    },
    networkDes: {
        fontSize:12,
        color:'grey',
        marginTop:5,
        marginBottom:0,
    },
    fillCircle: {
        width:"20px", 
        height:'20px', 
        borderRadius:"10px", 
        backgroundColor:'#e55370', 
        display:'inline-block',
    },
    emptyCircle: {
        width:"20px", 
        height:'20px', 
        borderRadius:"10px", 
        border:'1px solid #e55370', 
        display:'inline-block',
    },
    tokenImage: {
        height:30,
    },
    textRight: {
        textAlign:'right',
    },
    textLeft: {
        textAlign:'left',
    },
    balanceContainer:{
        borderRadius:10, 
        border:"1px solid #e55370", 
        padding:"10px 15px",
    },
    tokenTitle: {
        fontWeight:'bold', 
        marginTop:0, 
        marginBotton:0, 
        marginLeft:10, 
        display:"inline", 
        position:'relative', 
        top:'-8px'
    },
    myLockContainer: {
        borderRadius:'10px',
        background: 'white'
    }
}));
export default useStyles;

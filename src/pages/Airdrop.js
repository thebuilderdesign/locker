import React, { useEffect, useState, useRef } from "react";

import { useTheme } from '@mui/material/styles';
import {connect, useSelector, useDispatch} from 'react-redux';
import {useWeb3React} from "@web3-react/core";
import * as XLSX from 'xlsx';

// ** Import Material UI Components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import Container from "@mui/material/Container";

import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import useMediaQuery from "@mui/material/useMediaQuery";
import Modal from '@mui/material/Modal';
import {  RadioGroup } from "@mui/material";
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Search from '@mui/icons-material/Search';
import { Snackbar } from "@mui/material";
import { Box, IconButton } from "@mui/material";
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowDown';
import Link from "@mui/material/Link";

import useStyles from "../assets/styles";

import { TOKENDATA, USERBALANCE } from "../redux/constants";

import {  CHAINDATA } from "../constants";
import { getTokenMetadata } from "../api";
import { allowance, getTokenBalance, checkWalletAddress, approveToken, airdrop, explorer } from "../web3"
import { airdropAddress } from '../constants'

const Airdrop = (props) => {

    const [activeStep, setActiveStep] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [snackbar, setSnackbar] = React.useState(false);
    const [network, setNetwork] = useState("Avalanche");
    const [csvData, setCsvData] = useState([]);
    const [isCsvSelected, setIsCsvSelected] = useState(false);
    const [fileName, setFileName] = useState('');
    const [modalTitle, setModalTitle] = useState("");
    const [modalDes, setModalDes] = useState("");
    const [isAllowed, setIsAllowed] = useState(0);// 0: checking, 1: not allowed, 2: allowed

    const maxSteps = 4;
    const theme = useTheme();
    const classes = useStyles.pools();
    const mobileClasses = useStyles.mobile();
    const dashboardClasses = useStyles.dashboard();
    const isMobile = useMediaQuery("(max-width:600px)");
    const token = useSelector(state => state.tokenData);

    const dispatch = useDispatch();

    let fileInput = useRef();

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #fff',
        borderRadius:'10px',
        boxShadow: 24,
        p: 4,
    };

    const { account, connector } = useWeb3React();

    const [values, setValues] = React.useState({
        tokenAddress:"",
    });

    const selectToken = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    const fileSelect = (e) => {
        const _filePath = e.target.value.split('\\');
        const _fileName = _filePath[_filePath.length - 1];
        setFileName(_fileName);
        setIsCsvSelected(false);
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (evt) => {
            /* Parse data */
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
            processData(data);
        };
        reader.readAsBinaryString(file);
    }

    const processData = (dataString) => {
        dataString = dataString.trim('\r\n|\n');
        const dataStringLines = dataString.split(/\r\n|\n/);
        const newCsvData = [];
        let isValid = true;
        dataStringLines.map(each => {
            each = each.trim();
            const splitLine = each.split(',');
            const newAddress = splitLine[0];
            const amount = splitLine[1];
            if (!checkWalletAddress(newAddress, network)) isValid = false;
            newCsvData.push({
                address: newAddress,
                amount: amount
            })
        })
        if (!isValid) {
            console.log("invalid");
            return;
        } else {
            setCsvData(newCsvData);
            setIsCsvSelected(true);
        }
    }

    const handleNext = async () => {
        const provider = window.ethereum;
        const currentNetworkData =  networkData.filter((each)=>each.name === network);
        try {
            await provider.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: currentNetworkData[0].chainData.chainId}],
            });
            console.log("You have succefully switched to Binance Test network")
            if (activeStep === 0) {
                if (!account) {
                    setModalTitle("Please connect Wallet");
                    setModalDes(`Before you can create a lock on ${network}, you must connect your wallet to ${network} network on your wallet. Use testnet for test transactions, and mainnet for real token locks.`);
                    handleOpen();
                }else {
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                }
            } else if (activeStep === 1 ) {
                if (!token.symbol) {
                    setModalTitle("Please select Token");
                    setModalDes(`Before you can create a lock on ${network}, you must select token on your wallet. Use testnet for test transactions, and mainnet for real token locks.`);
                    handleOpen();
                }else {
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                }
            } else if (activeStep === 2 ) {
                if (!isCsvSelected) {
                    setModalTitle("Please select csv file");
                    handleOpen();
                } else {
                    connector.getProvider().then((provider) => {
                        approveToken(provider, token.address, account, airdropAddress[network]).then((state) => {
                            airdrop(provider, csvData, token.address, account, network).then((state) => {
                                setActiveStep(0);
                            })
                        })
                    })
                }
            }
        } catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 4902) {
             console.log("This network is not available in your metamask, please add it")
             provider
                .request({
                    method: 'wallet_addEthereumChain',
                    params: [{...currentNetworkData[0].chainData}]
                })
                .catch((error) => {
                    console.log(error)
                })
            } else if (switchError.code === 4001) {
                console.log("Switch Request has rejected")
            }
        }

        
    };

    useEffect(async () => {
        setIsAllowed(0);
        if (!account || !token.address) return;
        const tokenBalance = await getTokenBalance(token, account, network);
        dispatch({type:USERBALANCE, payload: tokenBalance});
        const allowanceAmount = await allowance(token, account, network);
        if (allowanceAmount < 115792089237316195423570985008687907853269984665640564039457584007913129639935) setIsAllowed(1);
        else setIsAllowed(2);
    }, [account, token, connector])

    const handleChange = async (event) => {
        setValues({ tokenAddress: event.target.value });
        if (event.target.value.length == 42) {
            const address = event.target.value;
            try {
                const tokenData = await getTokenMetadata(CHAINDATA.find((item)=>item.name==network).chain, address);
                dispatch({
                    type:TOKENDATA,
                    payload: tokenData[0]
                })
            } catch(e) {
                dispatch({
                    type:TOKENDATA,
                    payload: {}
                })
            }
        }else {
            dispatch({
                type:TOKENDATA,
                payload: {}
            })
        }
    };
    
    const handleClickSearch = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    
    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSnackbarClose = () => setSnackbar(false);

    const changeNetwork = (name) => {
        setNetwork(name);
        dispatch({
            type:TOKENDATA,
            payload: {}
        })
    }

    const networkData= [
        {name:"Ethereum", subtitle:"Choose if your coin is built on ETH", url:"/networks/eth.svg", subData:[{name:"Project Tokens", subTitle:"Regular ERC-20 Project Token", url:"/project.png"}], chainData:{chainId:'0x1', chainName:"Ethereum", rpcUrls:["https://mainnet.infura.io/v3/"], blockExplorerUrls:['https://etherscan.io'], nativeCurrency: { symbol:'MATIC', decimals: 18} }},
        {name:"Binance Smart Chain", subtitle:"Choose if your coin is built on BSC", url:"/networks/bsc.png", subData:[{name:"Project Tokens", subTitle:"Regular BEP-20 Project Token", url:"/project.png"}], chainData:{chainId:'0x38', chainName:"Binance Smart Chain", rpcUrls:["https://bsc-dataseed1.ninicoin.io"], blockExplorerUrls:['https://bscscan.com/'], nativeCurrency: { symbol:'BNB', decimals: 18} }},
        {name:"Avalanche", subtitle:"Choose if your coin is built on AVAX", url:"/networks/avalanche.png", subData:[{name:"Project Tokens", subTitle:"Regular ERC-20 Project Token", url:"/project.png"}], chainData:{chainId:'0xa86a', chainName:"Avalanche Mainnet", rpcUrls:["https://api.avax.network/ext/bc/C/rpc"], blockExplorerUrls:['https://snowtrace.io/'], nativeCurrency: { symbol:'AVAX', decimals: 18} }},
        {name:"Avalanche_testnet", subtitle:"Choose if your coin is built on AVAX", url:"/networks/avalanche.png", subData:[{name:"Project Tokens", subTitle:"Regular ERC-20 Project Token", url:"/project.png"}], chainData:{chainId:'0xa869', chainName:"Avalanche Testnet", rpcUrls:["https://api.avax-test.network/ext/bc/C/rpc"], blockExplorerUrls:['https://testnet.snowtrace.io/'], nativeCurrency: { symbol:'AVAX', decimals: 18} }},
    ]
    return (
        <Container className={classes.root} maxWidth="lg" style={{paddingLeft:20, paddingRight:20}}>
            <Box className={classes.info}>
                <Grid container direction="row" justifyContent="space-evenly" alignItems="center" >
                    <Grid className={isMobile ? `${mobileClasses.root} grid text-center`  : "grid text-center"} style={{marginTop:40}} item xs={12} sm={12} md={6} >
                        <div style={{maxWidth:400, display:'inline-block', textAlign:'left'}}>
                            <h1>Airdrop your token to multi address.</h1>
                            <p>All tokens are immediately sent to multi users in one transaction.</p>
                            <Link
                                href={`https://app.snow-burn.com`}
                                target="_blank"
                                color="blue"
                                underline="none"
                                className={classes.button}
                            ><Button variant="contained">Powered by SnowBurn</Button></Link>
                        </div>
                    </Grid>
                    <Grid className={isMobile ? `${mobileClasses.root} grid`  : "grid"} style={{marginTop:40, wordBreak: "break-all"}} item xs={12} sm={12} md={6} >
                        <Card className="card">
                            <CardHeader
                                className={dashboardClasses.cardHeader}
                                title="Token Airdrop"
                            />
                            <CardContent >
                                <img src="/lock.png" />
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                >
                                    <SwipeableViews
                                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                        index={activeStep}
                                        onChangeIndex={handleStepChange}
                                    >
                                       
                                        <div key={1} style={{paddingLeft:1, paddingRight:1}}>
                                            <p style={{textAlign:'center'}} color="textSecondary">
                                                Choose the blockchain network.
                                            </p>
                                            {
                                                networkData.map((item)=>
                                                <Grid
                                                    className={classes.networkSelector}
                                                    container
                                                    direction="row"
                                                    justifyContent="space-evenly"
                                                    alignItems="center"
                                                    style={{padding:"10px 0px", border:item.name==network?"1px solid #e55370":"1px solid transparent", borderRadius:'5px'}}
                                                    key={item.name}
                                                    onClick = {()=>changeNetwork(item.name)}
                                                >
                                                    <Grid item  xs={10} sm={11} md={11}>
                                                        <Grid 
                                                            container
                                                            direction="row"
                                                            
                                                            alignItems="center"
                                                        >
                                                            <Grid item className="text-center" xs={3} sm={2} md={2}>
                                                                <img className={dashboardClasses.networkImage} src={item.url} alt="network" />
                                                            </Grid>
                                                            <Grid item   xs={9} sm={10} md={10}>
                                                                <p  color="textSecondary" className={dashboardClasses.networkTitle}>
                                                                    {item.name}
                                                                </p>
                                                                <p color="textSecondary" className={dashboardClasses.networkDes}>
                                                                    {item.subtitle}
                                                                </p>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item  className="text-center" xs={2} sm={1} md={1}>
                                                        {item.name==network ? <div style={{width:"20px", height:'20px', borderRadius:"10px", backgroundColor:'#e55370', display:'inline-block'}} />: <div style={{width:"20px", height:'20px', borderRadius:"10px", border:'1px solid #e55370', display:'inline-block'}} />}
                                                    </Grid>
                                                </Grid>
                                                )
                                            }
                                        </div>
                                        <div key={2} style={{paddingLeft:1, paddingRight:1, overflow: "hidden"}}>
                                            <p className="text-center" color="textSecondary">
                                                Please insert the token contract address.
                                            </p>
                                            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" style={{width:'-webkit-fill-available'}}>
                                                <InputLabel htmlFor="outlined-adornment-password">Address</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-password"
                                                    type="text"
                                                    value={values.tokenAddress}
                                                    onChange={handleChange}
                                                    // onKeyDown={handleChange}
                                                    endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                        aria-label="toggle search"
                                                        onClick={handleClickSearch}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                        >
                                                        <Search />
                                                        </IconButton>
                                                    </InputAdornment>
                                                    }
                                                    label="Password"
                                                />
                                            </FormControl>
                                            
                                            {
                                                token != undefined && token.symbol !=undefined && token.symbol !="" &&
                                                <div style={{paddingLeft:20, paddingRight:20}}>
                                                    <p style={{margin:"0px"}}>Token Found</p>
                                                    <Grid 
                                                        container
                                                        direction="row"
                                                        justifyContent="space-between"
                                                        alignItems="center"
                                                    >
                                                        <Grid item className={dashboardClasses.textLeft} xs={6} sm={6} md={6}>
                                                            <img className={dashboardClasses.tokenImage} src="/lock.png" alt="network" />
                                                            <p  color="textSecondary" className={dashboardClasses.tokenTitle}>
                                                                {token.symbol}
                                                            </p>
                                                        </Grid>
                                                        <Grid item className={dashboardClasses.textRight}  xs={6} sm={6} md={6}>
                                                            <Button variant="contained" color="error" sm={12} onClick={selectToken}>Select</Button>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            }
                                            
                                        </div>
                                        <div key={3} style={{paddingLeft:1, paddingRight:1}}>
                                            <p className="text-center">Click the button below to upload a CSV from your device</p>
                                            <div className="text-center">
                                                <Button variant="contained" onClick={()=>fileInput.current.click()}>Upload CSV</Button>
                                                <input 
                                                    ref={fileInput} 
                                                    type="file" 
                                                    style={{ display: 'none' }} 
                                                    onChange = {(e)=>fileSelect(e)}
                                                />
                                            </div>
                                            { fileName ? <div className="text-center" style={{margin:"10px"}}>
                                                {fileName}
                                            </div> :
                                            <div className="text-center" style={{margin:"10px"}}>
                                                <a  href="/Airdrop.csv" style={{color:"#e55370"}} download>Click here to download sample CSV</a>
                                            </div>}
                                            <Grid 
                                                container
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                className={dashboardClasses.balanceContainer}
                                            >
                                                <Grid item className={dashboardClasses.textLeft} xs={4} sm={4} md={4}>
                                                   <p style={{margin:0}}>Address</p>
                                                </Grid>
                                                <Grid item className={dashboardClasses.textRight}  xs={4} sm={4} md={4}>
                                                    <p style={{margin:0}}>Amount</p>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </SwipeableViews>
                                    <MobileStepper
                                        className={dashboardClasses.mobileStepper}
                                        steps={maxSteps}
                                        position="static"
                                        activeStep={activeStep}
                                        nextButton={
                                        <Button
                                            size="small"
                                            onClick={handleNext}
                                            disabled={activeStep === maxSteps - 1}
                                        >
                                            Next
                                            {theme.direction === 'rtl' ? (
                                            <KeyboardArrowLeft />
                                            ) : (
                                            <KeyboardArrowRight />
                                            )}
                                        </Button>
                                        }
                                        backButton={
                                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                            {theme.direction === 'rtl' ? (
                                            <KeyboardArrowRight />
                                            ) : (
                                            <KeyboardArrowLeft />
                                            )}
                                            Back
                                        </Button>
                                        }
                                    />
                                </RadioGroup>
                            </CardContent>
                        </Card>
                    </Grid>
                    
                </Grid>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    
                    {networkData.find((item)=>item.name==network) && <div style={{textAlign:'center'}}><img style={{width:"50px"}} src={networkData.find((item)=>item.name==network).url} alt="network" /></div>}
                    <h3 id="modal-modal-title" variant="h6" component="h2" style={{textAlign:'center', marginTop:0}}>
                        {modalTitle}
                    </h3>
                    <p id="modal-modal-description" sx={{ mt: 2 }} style={{textAlign:'center', fontSize:12, color:'grey'}}>
                        {modalDes}
                    </p>
                    <Button variant="contained" color="error" style={{width:'100%'}} onClick={handleClose}>Close</Button>
                </Box>
            </Modal>
            <Snackbar
                open={snackbar}
                autoHideDuration={600}
                style={{width:100}}
                onClose={handleSnackbarClose}
                message="Successfully Copied to Clipboard"
            />
        </Container >
    )
}
const mapStateToProps = state => ({
    statistics: state.statistics,
})

export default connect(mapStateToProps)(Airdrop);

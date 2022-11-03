import React, { useEffect, useState } from 'react';

import { connect, useSelector, useDispatch } from 'react-redux';
import {useWeb3React} from '@web3-react/core';
import { styled } from '@mui/material/styles';

// ** Import Material UI Components
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
// ** Import Assets
import useStyles from '../assets/styles';
import { TOKENLISTS } from "../redux/constants";

import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { getData, withdraw, explorer } from '../web3'

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
  }));

const LockUp = (props) => {

    const {wallet, token} = props.match.params;
    const { account, connector } = useWeb3React();
    const [network, setNetwork] = useState("")

    connector.getChainId().then((chainId) => {
        if (Number(chainId) === 1) setNetwork("Ethereum");
        if (Number(chainId) === 56) setNetwork("Binance Smart Chain");
        if (Number(chainId) === 43114) setNetwork("Avalanche");
        if (Number(chainId) === 43113) setNetwork("Avalanche_testnet");
    });

    const [currentTimestamp, setCurrentTimestamp] = useState(Math.round(Date.now() / 1000));
    const dispatch = useDispatch();
    const data = useSelector(state => state.tokenLists);
    let tokenDataIndex = data.findIndex(each => each.token.address === token.toLowerCase());
    let tokenData = undefined;
    if (tokenDataIndex !== -1) tokenData = data[tokenDataIndex];
    useEffect(() => {
        if (!wallet) return;
        if (!network) return;
        getData(wallet, network).then(newData => {
            dispatch({type:TOKENLISTS, payload: newData});
        });
        let timer = setInterval(() => {
            getData(wallet, network).then(newData => {
                console.log(newData)
                dispatch({type:TOKENLISTS, payload: newData});
            });
        }, 5000);
        return () => clearInterval(timer);
    }, [wallet, network])

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTimestamp(Math.round(Date.now() / 1000));
        }, 1000)
        return () => clearInterval(timer);
    }, [])

    const classes = useStyles.pools();
    const mobileClasses = useStyles.mobile();
    const isMobile = useMediaQuery('(max-width:600px)');

    const fn = (val, decimal = 4) => {
        if (!isNaN(Number(val))) {
            const trimVal = Number(Number(val).toFixed(decimal));
            const decimalVal = trimVal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            return decimalVal;
        } else {
            return Number(0);
        }
    }
    
    const withdrawToken = async (id) => {
        if (!account) return;
        let provider = await connector.getProvider()
        withdraw(provider, id, account, network).then(async (status) => {
            if (status) console.log("withdrawed");
            const newData = JSON.parse(JSON.stringify(data));
            newData.map(each => {
                each.data.map(eachData => {
                    if (eachData.id === id) eachData.isWithdrawn = true;
                })
            })
        })
    }

    const LockedEvent = (props) => {
        const { index, event } = props
        const withdrawDate = new Date(event.timestamp * 1000);
        const isWithdrawable = event.timestamp < currentTimestamp;
        const isWithdrawn = event.isWithdrawn;
        const lockedTokenAmount = event.amount/ Math.pow(10, event.decimals)
        const getTokenSymbol = event.symbol;
        const owner = event.owner;
        const lockedTime = new Date(event.depositEvent.timestamp * 1000);
        const countdownPercent = event.timestamp > currentTimestamp ? Math.ceil((event.timestamp - currentTimestamp) / (event.timestamp - event.depositEvent.timestamp) * 100) : 0;
        const getRemainTime = () => {
            if (event.timestamp < currentTimestamp) return `00D-00H-00M-00S`;
            return `${Math.floor((event.timestamp - currentTimestamp) / 86400)}D-${Math.floor(((event.timestamp - currentTimestamp) % 86400) / 3600)}H-${Math.floor(((event.timestamp - currentTimestamp) % 3600) / 60)}M-${(event.timestamp - currentTimestamp) % 60}S`
        }

        return (
                <Grid 
                container
                direction='row'
                justifyContent='space-between'
                alignItems='center'
                style={{borderBottom:'2px solid #e55370', fontSize: '13px'}}
                >
                    <Grid item  xs={2} sm={2} md={1} style={{textAlign:'center'}}>
                        <img src='/lock.png' style={{width:40}} alt='token image' />
                    </Grid>
                    <Grid item  xs={10} sm={10} md={5}>
                        <p>Lock Tokens - {fn(lockedTokenAmount, 2)} {getTokenSymbol}</p>
                        {!isWithdrawable ? <p><span><button>Locked</button></span> Locked {lockedTime.toDateString()} - unlocks {withdrawDate.toDateString()}</p>: 
                        (!isWithdrawn ? <p><span><button>Withdrawable</button></span> Locked {lockedTime.toDateString()} - unlocks {withdrawDate.toDateString()}</p>:
                        <p><span><button>Withdrawn</button></span> Locked {lockedTime.toDateString()} - unlocks {withdrawDate.toDateString()}</p>)}
                        <p>Owner: {owner}</p>
                    </Grid>

                    <Grid item  xs={12} sm={8} md={3} style={{textAlign:'center'}}>
                        <p >UNLOCK COUNTDOWN</p>
                        <BorderLinearProgress variant='determinate' value={countdownPercent} />
                        <p >{getRemainTime()}</p>
                    </Grid>
                    <Grid item  xs={12} sm={4} md={3} style={{textAlign:'center'}}>
                        {!isWithdrawable? <Link style={{textDecoration: 'none'}} href={`${explorer[network]}/tx/${event.depositEvent.transactionHash}`} target='_blank' rel='noreferrer'>VIEW TX</Link>: (
                            !isWithdrawn ? (account && account.toLowerCase() === owner.toLowerCase() ? <Button onClick={() => withdrawToken(event.id)} >WITHDRAW</Button> : <Link style={{textDecoration: 'none'}} href={`${explorer[network]}/tx/${event.depositEvent.transactionHash}`} target='_blank' rel='noreferrer'>VIEW TX</Link>) :
                            <Link style={{textDecoration: 'none'}} href={`${explorer[network]}/tx/${event.withdrawEvent.transactionHash}`} target='_blank' rel='noreferrer'>VIEW TX</Link>
                        )}
                        
                    </Grid>
                </Grid>
        )
    }

    let lockedTokenAmount = 0, lockedLiquidity = [];
    if (tokenData) tokenData.data.map(each => {
        if (!each.isWithdrawn && !each.isLiquidity) lockedTokenAmount += each.amount / Math.pow(10, each.decimals);
        if (!each.isWithdrawn && each.isLiquidity) {
            let index = lockedLiquidity.findIndex(eachLiquidity => eachLiquidity.token0.address === each.token0.address && eachLiquidity.token1.address === each.token1.address);
            if (index !== -1) lockedLiquidity.locked += each.amount * 100 / each.totalSupply;
            else lockedLiquidity.push({ token0: each.token0, token1: each.token1, locked: each.amount * 100 / each.totalSupply });
        }
    })
    return (
        <Container className={classes.root} maxWidth='lg'>
            <Box className={classes.info}>
                <Grid container spacing={3}>
                    <Grid className={isMobile ? `${mobileClasses.root} grid`  : 'grid'} item xs={12} sm={12} md={12} >
                        <Card className='card'>
                            <CardContent>
                                <Typography className='title' color='textSecondary'>
                                    LockUp Overview
                                </Typography>
                                <Grid 
                                    container
                                    direction='row'
                                    justifyContent='space-between'
                                    alignItems='center'
                                >
                                    <Grid item  xs={6} sm={6} md={6} style={{textAlign:'center'}}>
                                        <span>Liquidity Locked</span>
                                    </Grid>
                                    <Grid item  xs={6} sm={6} md={6} style={{textAlign:'center'}}>
                                        {lockedLiquidity.length ? lockedLiquidity.map((each, index) => (
                                            <span className='value big' color='textSecondary' key={`liquidity-${index}`} style={{ padding: 10  }}>
                                                {`${fn(each.locked, 2)}% ${each.token0.symbol}/${each.token1.symbol}`}
                                            </span>
                                        )) : <span className='value big' color='textSecondary' style={{ padding: 10  }}>
                                            0
                                        </span>}
                                    </Grid>
                                </Grid>
                                <Grid 
                                    container
                                    direction='row'
                                    justifyContent='space-between'
                                    alignItems='center'
                                >
                                    <Grid item  xs={6} sm={6} md={6} style={{textAlign:'center'}}>
                                        <span>Token Locked</span>
                                    </Grid>
                                    <Grid item  xs={6} sm={6} md={6} style={{textAlign:'center'}}>
                                        {(() => {
                                            if (lockedTokenAmount !== 0) {
                                                return (
                                                    <span className='value big' color='textSecondary' style={isMobile ? { padding: 10 } : { padding: 20 }}>
                                                        {`${fn(lockedTokenAmount, 2)} ${tokenData.token.symbol}`}
                                                    </span>
                                                )
                                            } else {
                                                return <span className='value big' color='textSecondary' style={{ padding: 10  }}>
                                                0
                                            </span>
                                            }
                                        })()}
                                    </Grid>
                                </Grid>
                                <Grid 
                                    container
                                    direction='row'
                                    justifyContent='space-between'
                                    alignItems='center'
                                >
                                    <Grid item  xs={6} sm={6} md={6} style={{textAlign:'center'}}>
                                        <span>Total Supply</span>
                                    </Grid>
                                    <Grid item  xs={6} sm={6} md={6} style={{textAlign:'center'}}>
                                        {(() => {
                                            if (tokenData !== undefined) {
                                                return (
                                                    <span className='value big' color='textSecondary' style={isMobile ? { padding: 10 } : { padding: 20 }}>
                                                        {`${fn(tokenData.token.totalSupply / Math.pow(10, tokenData.token.decimals), 2)} ${tokenData.token.symbol}`}
                                                    </span>
                                                )
                                            } else {
                                                return <span className='value big' color='textSecondary' style={{ padding: 10  }}>
                                                0
                                            </span>
                                            }
                                        })()}
                                    </Grid>
                                </Grid>
                                
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid className={isMobile ? `${mobileClasses.root} grid`  : 'grid'} item xs={12} sm={12} md={12} >
                        <Card className='card'>
                            <CardContent>
                                <Typography className='title' color='textSecondary'>
                                    Lock Events
                                </Typography>
                                {tokenData && tokenData.data.map((each, index) => (
                                    <LockedEvent key={`event-${index}`} index={index} event={each} />
                                ))}
                            </CardContent>
                        </Card>
                    </Grid>
                    
                    
                </Grid>
            </Box>
        </Container >
    )
}
// export default Portfolio
const mapStateToProps = state => ({
    statistics: state.statistics,
    walletAddress: state.walletAddress
})

//connect function INJECTS dispatch function as a prop!!
export default connect(mapStateToProps)(LockUp);

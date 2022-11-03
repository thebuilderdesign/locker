import React, { useEffect, useState } from 'react';

import {useWeb3React} from '@web3-react/core';
import { styled } from '@mui/material/styles';

// ** Import Material UI Components
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import CardContent from '@mui/material/CardContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, Button } from "@mui/material";

// ** Import Assets
import useStyles from '../assets/styles';

import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { getClaimTokenList, claimToken } from '../web3'

const Claim = () => {

    const [tokenList, setTokenList] = useState([]);
    const { account, connector } = useWeb3React();
    const [network, setNetwork] = useState("");

    useEffect(() => {
        connector.getChainId().then((chainId) => {
            if (Number(chainId) === 1) setNetwork("Ethereum");
            if (Number(chainId) === 56) setNetwork("Binance Smart Chain");
            if (Number(chainId) === 43114) setNetwork("Avalanche");
        });
    }, [connector.getChainId()])

    useEffect(() => {
        if (!network) return;
        if (!account) {
            setTokenList([]);
            return;
        }
        getClaimTokenList(account, network).then(_list => {
            _list.map(each => {
                each.nextClaim = 'now available';
                if (Number(each.amount) > Number(each.claimedAmount)) {
                    if (Date.now() / 1000 - each.lastUpdated < 3600) each.nextClaim = new Date(each.lastUpdated * 1000 + 3600000).toUTCString();
                    each.availableAmount = BigInt((each.amount / each.lockHours * Math.floor((Date.now() / 1000 - each.lockTimestamp) / 3600) - each.claimedAmount)).toString();
                }
            })
            setTokenList(_list);
        })
        const timer = setInterval(() => {
            getClaimTokenList(account, network).then(_list => {
                _list.map(each => {
                    each.nextClaim = 'now available';
                    if (Number(each.amount) > Number(each.claimedAmount)) {
                        if (Date.now() / 1000 - each.lastUpdated < 3600) each.nextClaim = new Date(each.lastUpdated * 1000 + 3600000).toUTCString();
                        each.availableAmount = BigInt((each.amount / each.lockHours * ((Date.now() / 1000 - each.lockTimestamp) / 3600) - each.claimedAmount)).toString();
                    }
                })
                setTokenList(_list);
            })
        }, 10000);
        return () => clearInterval(timer);
    }, [account, network])

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
    
    const claim = async (index) => {
        if (!account) return;
        let provider = await connector.getProvider();
        claimToken(provider, tokenList[index], account).then(async (response) => {
            console.log("Claimed");
            console.log(response);
        })
    }

    return (
        <Container className={classes.root} maxWidth='lg'>
            <Box className={classes.info}>
                <Grid container spacing={3}>
                    <Grid className={isMobile ? `${mobileClasses.root} grid`  : 'grid'} item xs={12} sm={12} md={12} >
                        <Card className='card'>
                            <CardContent>
                                <TableContainer component={Paper}>
                                    <Table  aria-label="collapsible table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Token</TableCell>
                                                <TableCell>Allocation</TableCell>
                                                <TableCell align="right">Time to next claim</TableCell>
                                                <TableCell align="right">Available to claim</TableCell>
                                                <TableCell align="right">Claimed so far</TableCell>
                                                <TableCell align="right">Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {tokenList.map((each, index) => (
                                            <TableRow key={`tokenList-${index}`}>
                                                <TableCell>{each.token.symbol}</TableCell>
                                                <TableCell>{fn(each.amount / Math.pow(10, each.token.decimals), 2)}</TableCell>
                                                <TableCell align="right">{each.nextClaim}</TableCell>
                                                <TableCell align="right">{fn(each.availableAmount / Math.pow(10, each.token.decimals), 2)}</TableCell>
                                                <TableCell align="right">{fn(each.claimedAmount / Math.pow(10, each.token.decimals), 2)}</TableCell>
                                                <TableCell align="right">
                                                <Button variant="contained" color="secondary" style={{width: '100%'}}  onClick={() => claim(index)}>Claim</Button>
                                                </TableCell>
                                            </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Container >
    )
}

//connect function INJECTS dispatch function as a prop!!
export default Claim;

import Web3 from "web3"
import {
    Multicall
  } from 'ethereum-multicall';

import lockerContractAbi from "./locker_abi.json"
import erc20Abi from "./erc20_abi.json"
import liquidityPoolAbi from "./liquidityPool_abi.json"
import axios from 'axios'
import { maxTxLimit, lockerAddress, swapTokenLockerFactory, airdropAddress } from './constants'


const provider = {
    "Ethereum": "https://mainnet.infura.io/v3/3587df9c45a740f9812d093074c6a505",
    "Binance Smart Chain": "https://data-seed-prebsc-1-s1.binance.org:8545",
    "Avalanche": "https://api.avax.network/ext/bc/C/rpc",
    "Avalanche_testnet": "https://api.avax-test.network/ext/bc/C/rpc"
};

const serverApi = 'http://localhost:5000/api';
// const serverApi = 'https://localhost:5000/api';
// const serverApi = 'https://app.snowprotocol.io/api';

export const explorer = {
    "Ethereum": "https://etherscan.io",
    "Binance Smart Chain": "https://bscscan.com",
    "Avalanche": "https://snowtrace.io",
    "Avalanche_test": "https://testnet.snowtrace.io"
};

export const deposit = async (provider, token, amount, date, account, network) => {
    let unlockDate = new Date(date);
    let UTCTimestamp = Math.round(unlockDate.getTime() / 1000)
    let web3 = new Web3(provider);
    let contract = new web3.eth.Contract(lockerContractAbi, lockerAddress[network]);
    let feeInETH = await contract.methods.feesInETH().call();
    let result = await contract.methods["lockTokens"](token.address, account, BigInt(amount), UTCTimestamp).send({from: account, value: network === "Avalanche" || network === "Avalanche_testnet" ? BigInt(feeInETH * Math.pow(10, 18)).toString() : feeInETH});
    return result.status;
}

export const withdraw = async (provider, id, account, network) => {
    let web3 = new Web3(provider);
    let contract = new web3.eth.Contract(lockerContractAbi, lockerAddress[network]);
    let result = await contract.methods["withdrawTokens"](id).send({
        from: account
    });
    return result.status;
}

export const approve = async (provider, token, account, network) => {
    let web3 = new Web3(provider);
    let contract = new web3.eth.Contract(erc20Abi, token.address);
    let result = await contract.methods["approve"](lockerAddress[network], web3.utils.toBN("115792089237316195423570985008687907853269984665640564039457584007913129639935")).send({from: account});
    return result.status;
}

export const approveToken = async (provider, token, account, deployedContract) => {
    let web3 = new Web3(provider);
    let contract = new web3.eth.Contract(erc20Abi, token);
    let result = await contract.methods["approve"](deployedContract, web3.utils.toBN("115792089237316195423570985008687907853269984665640564039457584007913129639935")).send({from: account});
    return result.status;
}

export const allowance = async (token, account, network) => {
    let web3 = new Web3(provider[network]);
    let contract = new web3.eth.Contract(erc20Abi, token.address);
    let result = await contract.methods["allowance"](account, lockerAddress[network]).call();
    return result;
}

export const getTokenBalance = async (token, account, network) => {
    let web3 = new Web3(provider[network]);
    let contract = new web3.eth.Contract(erc20Abi, token.address);
    let result = await contract.methods["balanceOf"](account).call();
    return result;
}

export const getRawData = async (account, network) => {
    let web3 = new Web3(provider[network]);
    let contract = new web3.eth.Contract(lockerContractAbi, lockerAddress[network]);
    let depositIds = await contract.methods["getAllDepositIds"]().call();
    if (!depositIds.length) return []
    const multicall = new Multicall({ web3Instance: web3, tryAggregate: true });
    let contractCallContext = {
        reference: "lockedToken",
        contractAddress: lockerAddress[network],
        abi: lockerContractAbi,
        calls: depositIds.map(each => {
            return { reference: 'lockedTokensCall', methodName: 'lockedToken', methodParameters: [each] }
        })
    }
    let response = await multicall.call(contractCallContext);
    const returnValues = [];
    response.results.lockedToken.callsReturnContext.map(each => {
        const returnValue = {
            id: each.methodParameters[0],
            token: each.returnValues[0],
            owner: each.returnValues[1],
            amount: BigInt(parseInt(each.returnValues[2].hex, 16)).toString(),
            timestamp: parseInt(each.returnValues[3].hex, 16),
            isWithdrawn: each.returnValues[4]
        }
        if (returnValue.owner.toLowerCase() === account.toLowerCase()) returnValues.push(returnValue);
    })
    return returnValues;

        // let lockedTokenLists = [];
        // for (const [key, value] of Object.entries(response.results)) {
        //     lockedTokenLists.push(value.callsReturnContext[0]["returnValues"][0]);
        // }
        // contractCallContext = [];
        // for (let i = 0; i < length; i++) {
        //     contractCallContext.push({
        //         reference: i,
        //         contractAddress: lockerAddress,
        //         abi: lockerContractAbi,
        //         calls: [{ reference: 'lockedTokensCall', methodName: 'getUserTokenInfo', methodParameters: [lockedTokenLists[i], account] }]
        //     })
        // }
        // response = await multicall.call(contractCallContext);
        // let userInfo = [];
        // for (const [key, value] of Object.entries(response.results)) {
        //     if (web3.utils.hexToNumberString(value.callsReturnContext[0].returnValues[2].hex) == '0') continue;
        //     userInfo.push({token: lockedTokenLists[key], deposited: web3.utils.hexToNumberString(value.callsReturnContext[0].returnValues[0].hex), withdrawed: web3.utils.hexToNumberString(value.callsReturnContext[0].returnValues[1].hex), vestLength: web3.utils.hexToNumberString(value.callsReturnContext[0].returnValues[2].hex)})
        // }
        // if (!userInfo.length) return [];
        // contractCallContext = [];
        // for (let i = 0; i < userInfo.length; i++) {
        //     let context = {
        //         reference: i,
        //         contractAddress: lockerAddress,
        //         abi: lockerContractAbi,
        //         calls: []
        //     }
        //     for (let j = 0; j < userInfo[i]["vestLength"]; j++) {
        //         context.calls.push({ reference: 'getUserVestingAtIndexCall', methodName: 'getUserVestingAtIndex', methodParameters: [userInfo[i].token, account, j] });
        //     }
        //     contractCallContext.push(context)
        // }
        // response = await multicall.call(contractCallContext);
        // for (const [key, value] of Object.entries(response.results)) {
        //     userInfo[key]["vesting"] = value.callsReturnContext.map(each => {
        //         return each.returnValues.map(data => {
        //             return web3.utils.hexToNumberString(data.hex)
        //         })
        //     })
        // }
        // contractCallContext = [];
        // for (let i = 0; i < userInfo.length; i++) {
        //     let context = {
        //         reference: i,
        //         contractAddress: userInfo[i]["token"],
        //         abi: erc20Abi,
        //         calls: [{ reference: 'decimalsCall', methodName: 'decimals' }, { reference: 'symbolCall', methodName: 'symbol'}]
        //     }
        //     contractCallContext.push(context);
        // }
        // response = await multicall.call(contractCallContext);
        // for (const [key, value] of Object.entries(response.results)) {
        //     userInfo[key]["decimals"] = value.callsReturnContext[0]["returnValues"][0];
        //     userInfo[key]["symbol"] = value.callsReturnContext[1]["returnValues"][0];
        // }
        // let currentTime = Math.round(Date.now() / 1000);
        // // console.log(userInfo)
        // userInfo = userInfo.map(each => {
        //     console.log(each);
        //     let withdrawable = web3.utils.toBN(0);
        //     each.vesting.map((eachVest) => {
        //         if (Number(eachVest[0]) < currentTime) withdrawable = withdrawable.add(web3.utils.toBN(eachVest[1]));
        //     })
        //     withdrawable = withdrawable.sub(web3.utils.toBN(each.withdrawed));
        //     each.withdrawable = withdrawable.toString();
        //     return each;
        // })
    }
    
export const getData = async (account, network) => {
    const response = await axios.get(`${serverApi}/locker/lockedtokens/${network}/${account}`);
    const lockerDataByWallet = response.data;
    return lockerDataByWallet;
}

export const getLockedTokenDetails = async (tokenAddress, account, network) => {

    // const tokenData = data.find(each => each.address === tokenAddress);
    
    const rawData = await getRawData(account, network);
    let web3 = new Web3(provider[network]);

    let tokenLocked = BigInt(0);
    rawData.map(each => {
        if (each.token === tokenAddress && !each.isWithdrawn) tokenLocked = tokenLocked + BigInt(each.amount);
    });
    // console.log(rawData)
    const tokenContract = new web3.eth.Contract(erc20Abi, tokenAddress);
    let symbol = await tokenContract.methods.symbol().call();
    let decimals = await tokenContract.methods.decimals().call();
    let totalSupply = await tokenContract.methods.totalSupply().call();
    let liquidityLocked = BigInt(0);
    let tokenLockHistory = [];

    const multicall = new Multicall({ web3Instance: web3, tryAggregate: true });
    let contractCallContext = rawData.map((each, index) => {
        return {
            reference: index,
            contractAddress: each.token,
            abi: erc20Abi,
            calls: [{ reference: 'symbolsCall', methodName: 'symbol' }]
        }
    })
    let response = await multicall.call(contractCallContext);
    let symbols = [];
    for (const [key, value] of Object.entries(response.results)) {
        symbols.push(value.callsReturnContext[0].returnValues[0]);
    }
    // console.log(rawData)
    for (let i = 0; i < rawData.length; i++) {
        let each = rawData[i];
        let address = each.token;
        let ownerAddress = each.owner;
        let tokenAmount = each.amount;
        let timestamp = each.timestamp;
        let isWithdrawn = each.isWithdrawn;
        //default token
        if (address.toLowerCase() === tokenAddress.toLowerCase()) tokenLockHistory.push({id: each.id, address: address, owner: ownerAddress, tokenAmount: tokenAmount, timestamp: timestamp, isWithdrawn: isWithdrawn});
        //pool token
        else if (symbols[i] === 'HUL') {
            let poolContract = new web3.eth.Contract(liquidityPoolAbi, each.token);
            let token0 = await poolContract.methods.token0().call();
            let token1 = await poolContract.methods.token1().call();
            if (token0.toLowerCase() === tokenAddress.toLowerCase() || token1.toLowerCase() === tokenAddress.toLowerCase()) {
                let totalSupply = await poolContract.methods.totalSupply().call();
                let baseTokenTotalAmount = await tokenContract.methods.balanceOf(address).call();
                let baseTokenAmount = BigInt(baseTokenTotalAmount) * BigInt(tokenAmount) / BigInt(totalSupply);
                if (!each.isWithdrawn) liquidityLocked = liquidityLocked + baseTokenAmount;
                tokenLockHistory.push({id: each.id, isPool: true, address: address, owner: ownerAddress, tokenAmount: tokenAmount, baseTokenAmount: baseTokenAmount.toString(), timestamp: timestamp, isWithdrawn: isWithdrawn});
            }
        }
    }
    // let tokenSymbol = await tokenContract.methods.symbol().call();
    // let tokenDecimals = await tokenContract.methods.decimals().call();
    // let tokenLocked = await tokenContract.methods.balanceOf(lockerAddress).call();
    // let tokenTotalSupply = await tokenContract.methods.totalSupply().call();

    let lockerContract = new web3.eth.Contract(lockerContractAbi, lockerAddress[network]);
    let depositEvents = await lockerContract.getPastEvents("LogLocking", {
        fromBlock: 0
    })
    let withdrawEvents = await lockerContract.getPastEvents("LogWithdrawal", {
        fromBlock: 0
    })

    // let tokenTransferEvents = await tokenContract.getPastEvents("Transfer",{
    //     fromBlock: 0,
    //     toBlock: "latest",
    //     filter: {
    //         to: lockerAddress
    //     }
    // })
    // let tokenTransferTransactions = await Promise.all(tokenTransferEvents.map(each => web3.eth.getTransaction(each.transactionHash)))
    // tokenTransferTransactions = tokenTransferTransactions.filter(each => each.input.length === 266);
    
    
    for(let i=0; i<depositEvents.length; i++) {
        let blockDetail = await web3.eth.getBlock(depositEvents[i].blockNumber);
        depositEvents[i].timestamp = blockDetail.timestamp;
    }
    for(let i=0; i<withdrawEvents.length; i++) {
        let blockDetail = await web3.eth.getBlock(withdrawEvents[i].blockNumber);
        withdrawEvents[i].timestamp = blockDetail.timestamp;
    }
    let events = [], j = 0;
    for(let i=0; i<depositEvents.length;i++) {
        if(withdrawEvents[j] && withdrawEvents[j].returnValues.index === depositEvents[i].returnValues.index) {
            events.push({deposit: depositEvents[i], withdraw: withdrawEvents[j]});
            j++;
        } else {
            events.push({deposit: depositEvents[i]});
        }
    }

    return {
        address: tokenAddress,
        symbol: symbol,
        decimals: decimals,
        totalSupply: totalSupply,
        liquidityLocked: liquidityLocked,
        tokenLocked: tokenLocked,
        history: tokenLockHistory,
        events: events
    }
}

export const checkWalletAddress = (walletAddress, network) => {
    let web3 = new Web3(provider[network]);
    return web3.utils.isAddress(walletAddress);
}

export const getLastDeployedContract = async (account, network) => {
    const response = await axios.get(`${serverApi}/vesting/lastDeployed/${network}/${account}`);
    const lastDeployedAddress = response.data;
    return lastDeployedAddress;
}

export const deployContract = async (provider, account, token, network) => {
    const web3 = new Web3(provider);
    const abi = [{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"createTokenLocker","outputs":[{"internalType":"address","name":"locker","type":"address"}],"stateMutability":"payable","type":"function"}]
    const contract = new web3.eth.Contract(abi, swapTokenLockerFactory[network]);
    let result = contract.methods.createTokenLocker(token).send({
        from: account
    })
    return result;
}

export const sendTokenVesting = async (provider, deployedContract, csvData, token, account, network) => {
    let _users = [], _amounts = [], _lockHours = [], _sendAmount = BigInt(0);
    const web3 = new Web3(provider);
    let abi = [{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"}];
    let contract = new web3.eth.Contract(abi, token);
    let decimals = await contract.methods.decimals().call();
    csvData.map(each => {
        _users.push(each.address);
        _amounts.push(BigInt(each.amount * Math.pow(10, decimals)).toString());
        switch(each.period[each.period.length - 1]) {
            case 'M':
                _lockHours.push(each.period.slice(0, each.period.length - 1) * 30 * 24);
                break;
            case 'W':
                _lockHours.push(each.period.slice(0, each.period.length - 1) * 7 * 24);
                break;
            case 'D':
                _lockHours.push(each.period.slice(0, each.period.length - 1) * 24);
                break;
            case 'h':
                _lockHours.push(each.period.slice(0, each.period.length - 1));
                
        }
        _sendAmount += BigInt(each.amount * Math.pow(10, decimals));
    })
    _sendAmount = _sendAmount.toString();
    abi = [{"inputs":[{"internalType":"address[]","name":"_users","type":"address[]"},{"internalType":"uint128[]","name":"_amounts","type":"uint128[]"},{"internalType":"uint32[]","name":"_lockHours","type":"uint32[]"},{"internalType":"uint256","name":"_sendAmount","type":"uint256"}],"name":"sendLockTokenMany","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"feesInETH","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]
    
    contract = new web3.eth.Contract(abi, deployedContract)
    let feesInETH = await contract.methods.feesInETH().call();
    console.log(_users, _amounts, _lockHours, _sendAmount, account)
    let result = await contract.methods.sendLockTokenMany(_users, _amounts, _lockHours, _sendAmount).send({
        from: account,
        value: network === "Avalanche" || network === "Avalanche_testnet" ? BigInt(feesInETH * Math.pow(10, 18)).toString(): feesInETH
    });
    return result;
}

export const getClaimTokenList = async (address, network) => {
    const web3 = new Web3(provider[network]);
    let factoryContract, abi, erc20Abi, allContracts, response, multicall, contractCallContext;
    abi = [{"inputs":[],"name":"getAllContracts","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"}];
    factoryContract = new web3.eth.Contract(abi, swapTokenLockerFactory[network]);
    allContracts = await factoryContract.methods.getAllContracts().call();
    console.log(allContracts)
    multicall = new Multicall({ web3Instance: web3, tryAggregate: true });
    abi = [{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getLockData","outputs":[{"internalType":"uint128","name":"","type":"uint128"},{"internalType":"uint128","name":"","type":"uint128"},{"internalType":"uint64","name":"","type":"uint64"},{"internalType":"uint64","name":"","type":"uint64"},{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}];
    erc20Abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}]
    contractCallContext = allContracts.map((each, index) => {
        return {
            reference: index,
            contractAddress: each,
            abi: abi,
            calls: [
                { reference: 'getLockDataCall', methodName: 'getLockData', methodParameters: [address] },
                { reference: 'getTokenCall', methodName: 'getToken'}
            ]
        }
    })
    response = await multicall.call(contractCallContext);
    let returnData = [];
    contractCallContext = [];
    for (const [key, value] of Object.entries(response.results)) {
        let amount = BigInt(value.callsReturnContext[0].returnValues[0].hex).toString();
        let claimedAmount = BigInt(value.callsReturnContext[0].returnValues[1].hex).toString();
        let lockTimestamp = BigInt(value.callsReturnContext[0].returnValues[2].hex).toString();
        let lastUpdated = BigInt(value.callsReturnContext[0].returnValues[3].hex).toString();
        let lockHours = value.callsReturnContext[0].returnValues[4];
        let contract = allContracts[key];
        let token = value.callsReturnContext[1].returnValues[0];
        if (amount !== '0') {
            contractCallContext.push({
                reference: returnData.length,
                contractAddress: token,
                abi: erc20Abi,
                calls: [
                    { reference: 'nameCall', methodName: 'name' },
                    { reference: 'decimalsCall', methodName: 'decimals' },
                    { reference: 'symbolCall', methodName: 'symbol' }
                ]
            })
            returnData.push({
                amount: amount,
                claimedAmount: claimedAmount,
                lockTimestamp: lockTimestamp,
                lastUpdated: lastUpdated,
                lockHours: lockHours,
                contract: contract,
                token: {
                    address: token
                }
            })
        }
    }

    response = await multicall.call(contractCallContext);
    for (const [key, value] of Object.entries(response.results)) {
        let name = value.callsReturnContext[0].returnValues[0];
        let symbol = value.callsReturnContext[2].returnValues[0];
        let decimals = value.callsReturnContext[1].returnValues[0];
        returnData[key].token.name = name;
        returnData[key].token.symbol = symbol;
        returnData[key].token.decimals = decimals;
    }
    return returnData;
}

export const claimToken = async (provider, tokenDetail, account) => {
    let currentTimestamp = Math.floor(Date.now() / 1000);
    if (currentTimestamp - tokenDetail.lastUpdated < 3600) return {state: false, reason: 'Wait to next claim available'};
    const passedHours = Math.floor((currentTimestamp - tokenDetail.lockTimestamp) / 3600);
    let availableAmount = BigInt(Math.floor(tokenDetail.amount * passedHours / tokenDetail.lockHours) - tokenDetail.claimedAmount).toString();
    if (Number(availableAmount) > maxTxLimit) availableAmount = maxTxLimit.toString();
    const web3 = new Web3(provider);
    const abi = [{"inputs":[{"internalType":"uint128","name":"_amount","type":"uint128"}],"name":"claimToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"}]
    const contract = new web3.eth.Contract(abi, tokenDetail.contract);
    const response = await contract.methods.claimToken(availableAmount).send({
        from: account
    });
    console.log(response);
}

export const airdrop = async (provider, csvData, token, account, network) => {
    let _users = [], _amounts = [];
    const web3 = new Web3(provider);
    let abi = [{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"}];
    // console.log(token)
    let contract = new web3.eth.Contract(abi, token);
    let decimals = await contract.methods.decimals().call();
    csvData.map(each => {
        _users.push(web3.utils.toChecksumAddress(each.address));
        _amounts.push(BigInt(each.amount * Math.pow(10, decimals)).toString());
    })
    // console.log(_users)
    // console.log(_amounts)
    abi = [{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address[]","name":"_users","type":"address[]"},{"internalType":"uint128[]","name":"_amounts","type":"uint128[]"}],"name":"airdrop","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"companyWallet","outputs":[{"internalType":"addresspayable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feesInETH","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]
    contract = new web3.eth.Contract(abi, airdropAddress[network]);
    let feeInETH = await contract.methods.feesInETH().call();
    let result = await contract.methods.airdrop(token, _users, _amounts).send({
        from: account,
        value: network === "Avalanche" || network === "Avalanche_testnet" ? BigInt(feeInETH * Math.pow(10, 18)).toString() : feeInETH
    });
    return result;
}
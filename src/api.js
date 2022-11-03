import axios from 'axios';
import { walletAddress } from './redux/reducers';

const apiKey = 'SvMhtTsmQ239NmpwWjnnLWXtag5Jt8wYp7NF8F3Tear1QSaDRl9gnM34JZVXdLFV';
const apiConfig = {
    headers: {
        'x-api-key': apiKey
    }
}
const serverUrl = 'https://deep-index.moralis.io/api/v2';

export const getTokenPrice = async function (_chain, _tokenAddress) {
    let price;
    try {
        price = await axios.get(`${serverUrl}/erc20/${_tokenAddress}/price?chain=${_chain}`, apiConfig);
    } catch (e) {
        price = 0;
    }
    return price && price.data;
}

export const getTokenMetadata = async function (_chain, _tokenAddress) {
    const tokenMetadata = await axios.get(`${serverUrl}/erc20/metadata?chain=${_chain}&addresses=${_tokenAddress}`, apiConfig);
    return tokenMetadata.data;
}

export const getTokenBalance = async function (_chain, _tokenAddress, _walletAddress) {
    const balances = await axios.get(`${serverUrl}/${_walletAddress}/erc20?chain=${_chain}&token_addresses=${_tokenAddress}`, apiConfig);
    return balances.data;
}

export const runContractFunction = async function (_chain, _contractAddress, _functionName, _abi, _params) {
    let result;
    try {
        result = await axios.post(`${serverUrl}/${_contractAddress}/function?chain=${_chain}&function_name=${_functionName}`, {
            "abi": _abi,
            "params": _params
        }, apiConfig);
    } catch (e) {
        result = null;
    }
    return result ? result.data : result;
}

export const getCurrentFee = async function (_chain, _tokenAddress, _walletAddress) {
    const dynamicFeeAbi = [{"inputs":[{"internalType":"address","name":"from","type":"address"}],"name":"getDynamicFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
    if (await isExcludedFromFee(_chain, _tokenAddress, _walletAddress)) return 0;
    const dynamicFee = await runContractFunction(_chain, _tokenAddress, 'getDynamicFee', dynamicFeeAbi, {from:_walletAddress});
    return dynamicFee;
}

export const isExcludedFromFee = async function (_chain, _tokenAddress, _walletAddress) {
    const isExcludedFromFeeAbi = [{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isExcludedFromFee","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}];
    return await runContractFunction(_chain, _tokenAddress, 'isExcludedFromFee', isExcludedFromFeeAbi, {account:_walletAddress});
}

export const getCommonFee = async function (_chain, _tokenAddress) {
    const liquidityAndMarketingFeeAbi = [{"inputs":[],"name":"_liquidityAndMarketingFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
    const taxFeeAbi = [{"inputs":[],"name":"_taxFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
    let commonFee = 0;
    await Promise.all([
        runContractFunction(_chain, _tokenAddress, '_liquidityAndMarketingFee', liquidityAndMarketingFeeAbi, {}),
        runContractFunction(_chain, _tokenAddress, '_taxFee', taxFeeAbi, {})
    ]).then(results => results.map(each => commonFee += Number(each)));
    return commonFee;
}

export const burntAndLeftTokenPercent = async function (_chain, _tokenAddress) {
    const burntVsCirculatingSupplyAbi = [{"inputs":[],"name":"burntVsCirculatingSupply","outputs":[{"internalType":"uint256","name":"burnt","type":"uint256"},{"internalType":"uint256","name":"circulating","type":"uint256"}],"stateMutability":"view","type":"function"}];
    const data = await runContractFunction(_chain, _tokenAddress, 'burntVsCirculatingSupply', burntVsCirculatingSupplyAbi);
    return {burnt: Number(data[0]), left: Number(data[1]), leftPercent: data[1] / (Number(data[0]) + Number(data[1])) * 100};
}

export const totalFees = async function (_chain, _tokenAddress) {
    const totalFeesAbi = [{"inputs":[],"name":"totalFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
    const data = await runContractFunction(_chain, _tokenAddress, 'totalFees', totalFeesAbi);
    return data;
}

export const getTransactions = async function (_chain, _walletAddress) {
    const transactions = await axios.get(`${serverUrl}/${_walletAddress}/erc20/transfers?chain=${_chain}&offset=0&oder=desc`, apiConfig);
    return transactions.data;
}

export const getLogsByAddress = async function (_chain, _tokenAddress) {
    let offset = 0;
    const response = await axios.get(`${serverUrl}/${_tokenAddress}/logs?chain=${_chain}&topic0=0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef&offset=${offset}&oder=desc`, apiConfig);
    let logs = response.data.result;
    const total = response.data.total;
    const pages = Math.ceil(total / 500);
    let page = 1;
    let getLogFunctions = [];
    while (page < pages) {
        offset = page * 500;
        getLogFunctions.push(axios.get(`${serverUrl}/${_tokenAddress}/logs?chain=${_chain}&topic0=0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef&offset=${offset}&oder=desc`, apiConfig));
        page++;
    }
    if (getLogFunctions.length) {
        await Promise.all(getLogFunctions).then(results => {
            results.map(each => {
                logs = logs.concat(each.data.result);
            })
        })
    }
    return logs;
}

function getAddress(topic) {
    if (topic === null || topic === '') return '';
    return `0x${topic.substring(topic.length - 40)}`;
}

function filterLogs (logs, _walletAddress) {
    return logs.filter(each => getAddress(each.topic1) === _walletAddress.toLowerCase() || getAddress(each.topic2) === _walletAddress.toLowerCase());
}

function getValue(topic) {
    return parseInt(topic, 16);
}

async function calculateBuySell(logs, _chain, _tokenAddress, _walletAddress) {
    let buy = 0, sell = 0, isFee = true;
    if (await isExcludedFromFee(_chain, _tokenAddress, _walletAddress)) isFee = false;
    logs.map(each => {
        if (getAddress(each.topic1) === _walletAddress.toLowerCase()) {
            if (isFee) {
                sell += getValue(each.data) / 97 * 100;
            } else {
                sell += getValue(each.data);
            }
        } else buy += getValue(each.data);
    })
    let result = {buy: buy, sell: sell};
    return result;
}

export const walletExchange = async function(_chain, _tokenAddress, _walletAddress) {
    let logs;
    await getLogsByAddress(_chain, _tokenAddress).then(data=> {
        logs = filterLogs(data, _walletAddress);
    })
    return await calculateBuySell(logs, _chain, _tokenAddress, _walletAddress);
}
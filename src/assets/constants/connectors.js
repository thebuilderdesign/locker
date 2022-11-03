import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

const POLLING_INTERVAL = 12000;

export const injected = new InjectedConnector({
    // supportedChainIds: [1, 56, 43114],
    supportedChainIds: [1, 3, 56, 97, 43113, 43114],
});

export const walletconnect = new WalletConnectConnector({
    rpc: { 
        1: "https://mainnet.infura.io/v3/3587df9c45a740f9812d093074c6a505",
        3: "https://ropsten.infura.io/v3/3587df9c45a740f9812d093074c6a505",
        56: "https://bsc-dataseed1.binance.org",
        97: "https://data-seed-prebsc-1-s1.binance.org:8545",
        43113: "https://api.avax.network/ext/bc/C/rpc",
        43114: "https://api.avax-test.network/ext/bc/C/rpc",
    },
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
    pollingInterval: POLLING_INTERVAL,
});

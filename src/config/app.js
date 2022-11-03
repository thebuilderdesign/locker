import abi from "./abi";

export default {
    netId: 1,
    updateTime: 35000,
    swapFee: 0.0025,
    base: {
        mint: {
            rate: "0.3"
        },
        reward: {
            address: {
                "AUMI-MATIC": "0x7549bD32cAbA7bdeb4d7bcAF3f7Ff8bed13577Bc",
                "QUICK": "0xf28164A485B0B2C90639E47b0f377b4a438a16B1",
                "MATIC-QUICK": "0xd26E16f5a9dfb9Fe32dB7F6386402B8AAe1a5dd7",
                "MATIC-ETH": "0x3c1f53fed2238176419F8f897aEc8791C499e3c8",
                "WBTC-ETH": "0x2972175e1a35C403B5596354D6459C34Ae6A1070",
                "ETH-QUICK": "0x5BcFcc24Db0A16b1C01BAC1342662eBd104e816c",
                "D-QUICK": "0xf28164A485B0B2C90639E47b0f377b4a438a16B1"
            },
            abi: {
                reward: {
                    aumi: abi.reward.aumi,
                    single: abi.reward.single,
                    double: abi.reward.double
                },
                dquick: abi.dquick
            }
        },
        origin: {
            quick: "0.2408",
            aumi_lock: 200
        }
    },
    aumi: {
        price: 74.11,
        address: "0x3eB177A6693eC81d1E170136f8AD02fffBE172a7",
        abi: abi.aumi.lock.self,
        symbol: "AUMI",
        img: "https://app.automatic.network/favicon.png"
    },
    tokens: [
        "automatic-network",
        "matic-network",
        "quick",
        "wrapped-bitcoin",
        "weth"
    ],
    contracts: [
        {
            id: "aumi-stake",
            name: "AUMI VAULT",
            sub_title: "AutoMatic",
            vault_token: {
                name: "AUMI",
                address: "0x3eB177A6693eC81d1E170136f8AD02fffBE172a7",
                abi: abi.aumi.lock.self
            },
            ap: {
                title: "APR",
                key: ""
            },
            tags: [
                "AUMI",
                "STAKE",
                "AUMI-STAKE"
            ],
            description: "Redistribution Fees",
            fee_description: "Early withdrawals before 3 months are charged a 50% penalty fee.",
            icons: [
                require("../assets/img/tokens/mati.jpg").default
            ],
            rewards: [
                "WMATIC",
                "AUMI"
            ],
            status: {
                active: false,
                status: "Retired"
            },
            mint: {
                rate: 0.3
            },
            base_token: {
                id: "automatic-network",
                name: "AUMI",
                address: "0x3eB177A6693eC81d1E170136f8AD02fffBE172a7",
                abi: abi.erc20
            },
            vault: {
                address: "0x82AeCa6D5fDAC30DEAE7D278aab2E70a7AC05193",
                abi: abi.aumi.stake.vault
            },
            rewarder: {
                address: "0x13F697b4cfae360C56a6695e7F06Ae1260f5b5Ba",
                abi: abi.aumi.stake.rewarder
            },
            aumi: {
                address: "0x3eB177A6693eC81d1E170136f8AD02fffBE172a7",
                abi: abi.aumi.stake.self
            },
            buy: "",
            buy_tooltip: "Acquire LP tokens on QuickSwap",
            filter: "aumi-vaults"
        },
        {
            id: "aumi-matic-lp",
            name: "AUMI-MATIC LP",
            sub_title: "AutoMatic",
            vault_token: {
                name: "AUMI-MATIC",
                address: "0x3A2Fe73866Bac2D28501e4E6149Ef9057463C365",
                abi: abi.lp.self
            },
            ap: {
                title: "APR",
            },
            tags: [
                "LP",
                "COMPOUND",
                "AUMI-MATIC"
            ],
            description: "Earn AUMI",
            fee_description: "0.5% fee for withdrawals within 3 days",
            icons: [
                "https://assets.coingecko.com/coins/images/19413/small/automatic.PNG?1635212504",
                "https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png?1624446912"
            ],
            rewards: [
                "",
                "AUMI"
            ],
            status: {
                active: false,
                status: "Retired"
            },
            mint: {
                rate: 0.3
            },
            base_token: {
                id: "matic-network",
                name: "MATIC",
                address: "0x0000000000000000000000000000000000001010",
                abi: abi.erc20
            },
            vault: {
                address: "0xa5AeC61F1b5a6edcad2cE45e3A5abd9Deff70582",
                abi: abi.lp.vault
            },
            lp: {
                address: "0x3A2Fe73866Bac2D28501e4E6149Ef9057463C365",
                abi: abi.lp.self,
            },
            buy: "https://quickswap.exchange/#/add/0x3eB177A6693eC81d1E170136f8AD02fffBE172a7/ETH",
            buy_tooltip: "Acquire LP tokens on QuickSwap",
            filter: "liquidity-pools"
        },
        {
            id: "aumi-matic-lp-compounding",
            name: "AUMI-MATIC LP",
            sub_title: "QuickSwap",
            vault_token: {
                name: "AUMI-MATIC",
                address: "0x3A2Fe73866Bac2D28501e4E6149Ef9057463C365",
                abi: abi.lp.self
            },
            ap: {
                title: "APY",
            },
            tags: [
                "LP",
                "COMPOUND",
                "AUMI-MATIC"
            ],
            description: "Auto Compounding LP",
            fee_description: "0.5% fee for withdrawals within 3 days",
            icons: [
                "https://assets.coingecko.com/coins/images/19413/small/automatic.PNG?1635212504",
                "https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png?1624446912"
            ],
            rewards: [
                "LP",
                "AUMI"
            ],
            status: {
                active: false,
                status: "Retired"
            },
            mint: {
                rate: 1.316
            },
            base_token: {
                id: "matic-network",
                name: "MATIC",
                address: "0x0000000000000000000000000000000000001010",
                abi: abi.erc20
            },
            vault: {
                address: "0x88F781F2321E5F6754bc3172C01852bDD65496cF",
                abi: abi.lp.vault
            },
            lp: {
                address: "0x3A2Fe73866Bac2D28501e4E6149Ef9057463C365",
                abi: abi.lp.self,
            },
            buy: "https://quickswap.exchange/#/add/0x3eB177A6693eC81d1E170136f8AD02fffBE172a7/ETH",
            buy_tooltip: "Acquire LP tokens on QuickSwap",
            filter: "liquidity-pools",
            fee: 0
        },
        {
            id: "quick-farming-compounding",
            name: "QUICK",
            sub_title: "QuickSwap",
            vault_token: {
                name: "QUICK",
                address: "0x831753dd7087cac61ab5644b308642cc1c33dc13",
                abi: abi.quick.self
            },
            ap: {
                title: "APY",
                key: ""
            },
            tags: [
                "QUICK",
                "COMPOUND",
                "QUICK"
            ],
            description: "Auto Compounding QUICK",
            fee_description: " 0.5% fee for withdrawals within 3 days",
            icons: [
                "https://assets.coingecko.com/coins/images/13970/large/1_pOU6pBMEmiL-ZJVb0CYRjQ.png?1613386659"
            ],
            rewards: [
                "QUICK",
                "AUMI"
            ],
            status: {
                active: false,
                status: "Retired"
            },
            mint: {
                rate: 0.3
            },
            base_token: {
                id: "quick",
                name: "QUICK",
                address: "0x831753dd7087cac61ab5644b308642cc1c33dc13",
                abi: abi.erc20
            },
            vault: {
                address: "0xC5110E8808562944833bFe9bbFFC5C89be1AacF9",
                abi: abi.quick.vault
            },
            quick: {
                address: "0x831753DD7087CaC61aB5644b308642cc1c33Dc13",
                abi: abi.quick.self
            },
            buy: "https://quickswap.exchange/#/swap?outputCurrency=0x831753DD7087CaC61aB5644b308642cc1c33Dc13",
            buy_tooltip: "Buy QUICK on QuickSwap",
            filter: "single-assets"
        },
        {
            id: "matic-quick-lp-compounding",
            name: "MATIC-QUICK LP",
            sub_title: "QuickSwap",
            vault_token: {
                name: "MATIC-QUICK",
                address: "0x019ba0325f1988213D448b3472fA1cf8D07618d7",
                abi: abi.lp.self
            },
            ap: {
                title: "APY",
                key: "quick-quick-matic"
            },
            tags: [
                "LP",
                "COMPOUND",
                "MATIC-QUICK"
            ],
            description: "Auto Compounding LP",
            fee_description: "0.5% fee for withdrawals within 3 days",
            icons: [
                "https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png?1624446912",
                "https://assets.coingecko.com/coins/images/13970/large/1_pOU6pBMEmiL-ZJVb0CYRjQ.png?1613386659"
            ],
            rewards: [
                "LP",
                "AUMI"
            ],
            status: {
                active: false,
                status: "Retired"
            },
            mint: {
                rate: 0.3
            },
            base_token: {
                id: "matic-network",
                name: "MATIC",
                address: "0x0000000000000000000000000000000000001010",
                abi: abi.erc20
            },
            vault: {
                address: "0x44Cd408C0fbBb0779F2A2F7e51A4967b0997E247",
                abi: abi.lp.vault
            },
            lp: {
                address: "0x019ba0325f1988213D448b3472fA1cf8D07618d7",
                abi: abi.lp.self,
            },
            buy: "https://quickswap.exchange/#/add/ETH/0x831753DD7087CaC61aB5644b308642cc1c33Dc13",
            buy_tooltip: "Acquire LP tokens on QuickSwap",
            filter: "liquidity-pools",
            fee: 0.4,
        },
        {
            id: "matic-quick-lp-maximizer",
            name: "MATIC-QUICK LP",
            sub_title: "QuickSwap",
            vault_token: {
                name: "MATIC-QUICK",
                address: "0x019ba0325f1988213D448b3472fA1cf8D07618d7",
                abi: abi.lp.self
            },
            ap: {
                title: "APY",
                key: "quick-quick-matic"
            },
            tags: [
                "LP",
                "MAX",
                "MATIC-QUICK"
            ],
            description: "QUICK Maximizer",
            fee_description: "0.5% fee for withdrawals within 3 days",
            icons: [
                "https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png?1624446912",
                "https://assets.coingecko.com/coins/images/13970/large/1_pOU6pBMEmiL-ZJVb0CYRjQ.png?1613386659"
            ],
            rewards: [
                "QUICK",
                "AUMI"
            ],
            status: {
                active: false,
                status: "Retired"
            },
            mint: {
                rate: 0.3
            },
            base_token: {
                id: "matic-network",
                name: "MATIC",
                address: "0x0000000000000000000000000000000000001010",
                abi: abi.erc20
            },
            vault: {
                address: "0xD69FDcc73c1023F3dEea286b383300aef31127F0",
                abi: abi.lp.vault
            },
            lp: {
                address: "0x019ba0325f1988213D448b3472fA1cf8D07618d7",
                abi: abi.lp.self,
            },
            buy: "https://quickswap.exchange/#/add/ETH/0x831753DD7087CaC61aB5644b308642cc1c33Dc13",
            buy_tooltip: "Acquire LP tokens on QuickSwap",
            filter: "liquidity-pools",
            fee: 0.4,
        },
        {
            id: "matic-eth-lp-compounding",
            name: "MATIC-ETH LP",
            sub_title: "QuickSwap",
            vault_token: {
                name: "MATIC-ETH",
                address: "0xadbF1854e5883eB8aa7BAf50705338739e558E5b",
                abi: abi.lp.self
            },
            ap: {
                title: "APY",
                key: "quick-eth-matic"
            },
            tags: [
                "LP",
                "COMPOUND",
                "MATIC-ETH"
            ],
            description: "Auto Compounding LP",
            fee_description: "0.5% fee for withdrawals within 3 days",
            icons: [
                "https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png?1624446912",
                "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880"
            ],
            rewards: [
                "LP",
                "AUMI"
            ],
            status: {
                active: false,
                status: "Retired"
            },
            mint: {
                rate: 0.3
            },
            base_token: {
                id: "matic-network",
                name: "MATIC",
                address: "0x0000000000000000000000000000000000001010",
                abi: abi.erc20
            },
            vault: {
                address: "0x2CcA9E3F8eBBC70d87285e9aC27A16e8b8E4f2B0",
                abi: abi.lp.vault
            },
            lp: {
                address: "0xadbF1854e5883eB8aa7BAf50705338739e558E5b",
                abi: abi.lp.self,
            },
            buy: "https://quickswap.exchange/#/add/ETH/0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
            buy_tooltip: "Acquire LP tokens on QuickSwap",
            filter: "liquidity-pools",
            fee: 0.25,
        },
        {
            id: "matic-eth-lp-maximizer",
            name: "MATIC-ETH LP",
            sub_title: "QuickSwap",
            vault_token: {
                name: "MATIC-ETH",
                address: "0xadbF1854e5883eB8aa7BAf50705338739e558E5b",
                abi: abi.lp.self
            },
            ap: {
                title: "APY",
                key: "quick-eth-matic"
            },
            tags: [
                "LP",
                "MAX",
                "MATIC-ETH"
            ],
            description: "QUICK Maximizer",
            fee_description: "0.5% fee for withdrawals within 3 days",
            icons: [
                "https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png?1624446912",
                "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880"
            ],
            rewards: [
                "QUICK",
                "AUMI"
            ],
            status: {
                active: false,
                status: "Retired"
            },
            mint: {
                rate: 0.3
            },
            base_token: {
                id: "matic-network",
                name: "MATIC",
                address: "0x0000000000000000000000000000000000001010",
                abi: abi.erc20
            },
            vault: {
                address: "0x0698ae1ea5E3c9974c344f4935bb24e5ae040291",
                abi: abi.lp.vault
            },
            lp: {
                address: "0xadbF1854e5883eB8aa7BAf50705338739e558E5b",
                abi: abi.lp.self,
            },
            buy: "https://quickswap.exchange/#/add/ETH/0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
            buy_tooltip: "Acquire LP tokens on QuickSwap",
            filter: "liquidity-pools",
            fee: 0.25,
        },
        {
            id: "wbtc-eth-lp-compounding",
            name: "WBTC-ETH LP",
            sub_title: "QuickSwap",
            vault_token: {
                name: "WBTC-ETH",
                address: "0xdC9232E2Df177d7a12FdFf6EcBAb114E2231198D",
                abi: abi.lp.self
            },
            ap: {
                title: "APY",
                key: "quick-eth-btc"
            },
            tags: [
                "LP",
                "COMPOUND",
                "WBTC-ETH"
            ],
            description: "Auto Compounding LP",
            fee_description: "0.5% fee for withdrawals within 3 days",
            icons: [
                "https://assets.coingecko.com/coins/images/7598/large/wrapped_bitcoin_wbtc.png?1548822744",
                "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880"
            ],
            rewards: [
                "LP",
                "AUMI"
            ],
            status: {
                active: false,
                status: "Retired"
            },
            mint: {
                rate: 0.3
            },
            base_token: {
                id: "wrapped-bitcoin",
                name: "WBTC",
                address: "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
                abi: abi.erc20
            },
            vault: {
                address: "0x8Ae231f5ee57A6b6DE080Ed06399D38C77e271CB",
                abi: abi.lp.vault
            },
            lp: {
                address: "0xdC9232E2Df177d7a12FdFf6EcBAb114E2231198D",
                abi: abi.lp.self,
            },
            buy: "https://quickswap.exchange/#/add/0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6/0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
            buy_tooltip: "Acquire LP tokens on QuickSwap",
            filter: "liquidity-pools",
            fee: 0.05,
        },
        {
            id: "wbtc-eth-lp-maximizer",
            name: "WBTC-ETH LP",
            sub_title: "QuickSwap",
            vault_token: {
                name: "WBTC-ETH",
                address: "0xdC9232E2Df177d7a12FdFf6EcBAb114E2231198D",
                abi: abi.lp.self
            },
            ap: {
                title: "APY",
                key: "quick-eth-matic"
            },
            tags: [
                "LP",
                "MAX",
                "WBTC-ETH"
            ],
            description: "QUICK Maximizer",
            fee_description: "0.5% fee for withdrawals within 3 days",
            icons: [
                "https://assets.coingecko.com/coins/images/7598/large/wrapped_bitcoin_wbtc.png?1548822744",
                "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880"
            ],
            rewards: [
                "QUICK",
                "AUMI"
            ],
            status: {
                active: false,
                status: "Retired"
            },
            mint: {
                rate: 0.3
            },
            base_token: {
                id: "wrapped-bitcoin",
                name: "WBTC",
                address: "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
                abi: abi.erc20
            },
            vault: {
                address: "0x110e68584535686379cDe53Dc92f0643fc090B21",
                abi: abi.lp.vault
            },
            lp: {
                address: "0xdC9232E2Df177d7a12FdFf6EcBAb114E2231198D",
                abi: abi.lp.self,
            },
            buy: "https://quickswap.exchange/#/add/0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6/0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
            buy_tooltip: "Acquire LP tokens on QuickSwap",
            filter: "liquidity-pools",
            fee: 0.05,
        },
        {
            id: "eth-quick-compounding",
            name: "ETH-QUICK",
            sub_title: "QuickSwap",
            vault_token: {
                name: "ETH-QUICK",
                address: "0x1bd06b96dd42ada85fdd0795f3b4a79db914add5",
                abi: abi.lp.self
            },
            ap: {
                title: "APY",
                key: "quick-quick-eth"
            },
            tags: [
                "LP",
                "COMPOUND",
                "ETH-QUICK"
            ],
            description: "Auto Compounding LP",
            fee_description: "0.5% fee for withdrawals within 3 days",
            icons: [
                'https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880',
                "https://assets.coingecko.com/coins/images/13970/large/1_pOU6pBMEmiL-ZJVb0CYRjQ.png?1613386659"
            ],
            rewards: [
                "LP",
                "AUMI"
            ],
            status: {
                active: false,
                status: "Retired"
            },
            mint: {
                rate: 0.3
            },
            base_token: {
                id: "weth",
                name: "WETH",
                address: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
                abi: abi.erc20
            },
            vault: {
                address: "0xE8d17fC627dC87033Fc6e17D7Baea17AdEDEA9Ce",
                abi: abi.lp.vault
            },
            lp: {
                address: "0x1bd06b96dd42ada85fdd0795f3b4a79db914add5",
                abi: abi.lp.self,
            },
            buy: "https://quickswap.exchange/#/add/0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619/0x831753DD7087CaC61aB5644b308642cc1c33Dc13",
            buy_tooltip: "Acquire LP tokens on QuickSwap",
            filter: "liquidity-pools",
            fee: 0.3,
        },
    ]
}

export default {
    aumi: {
        lock: {
            vault: require("./abi/aumi-lock.json"),
            self: require("./abi/aumi.json"),
            lp: ""
        },
        stake: {
            vault: require("./abi/aumi-stack-v2.json"),
            self: require("./abi/aumi.json"),
            lp: "",
            rewarder: require("./abi/aumi-reward.json")
        },

    },
    quick: {
        vault: require("./abi/vault.json"),
        self: require("./abi/quick.json")
    },
    lp: {
        vault: require("./abi/vault.json"),
        self: require("./abi/lp.json")
    },
    erc20: require("./abi/ERC20.json"),
    reward: {
        aumi: require('./abi/reward-pool-aumi.json'),
        single: require("./abi/reward-pool-single.json"),
        double: require("./abi/reward-pool-double.json")
    },
    dquick: require("./abi/d-quick.json")
}
require('babel-register');
require('babel-polyfill');
require("dotenv").config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
	networks: {
		development: {
			host: "127.0.0.1",
			port: 7545,
			network_id: "*" // Match any network id
		},

		rinkeby: {
			provider: function () {
				return new HDWalletProvider(
					[process.env.DEPLOYER_PRIVATE_KEY],
					`wss://rinkeby.infura.io/ws/v3/${process.env.INFURA_API_KEY}` // URL to Ethereum Node
				)
			},
			network_id: 4
		},

		mumbai: {
			provider: function () {
				return new HDWalletProvider(
					[process.env.REACT_APP_DEPLOYER_PRIVATE_KEY],
					`wss://polygon-mumbai.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_MUMBAI_API_KEY}` // URL to Polygon Mumbai Node
					// `wss://sparkling-holy-forest.matic-testnet.discover.quiknode.pro/${process.env.REACT_APP_QUICK_NODE_API_KEY}/` // URL to Polygon Mumbai Node via Quicknode
					// `https://sparkling-holy-forest.matic-testnet.discover.quiknode.pro/64c0e8b0bf72e8da9dabc50889b2638125b84032/`
					// "wss://sparkling-holy-forest.matic-testnet.discover.quiknode.pro/64c0e8b0bf72e8da9dabc50889b2638125b84032"
				)
			},
			network_id: 80001
		},

		matic: {
			provider: function () {
				return new HDWalletProvider(
					[process.env.DEPLOYER_PRIVATE_KEY],
					`https://polygon-rpc.com`
				)
			},
			network_id: 137
		}
	},

	contracts_directory: './src/contracts/',
	contracts_build_directory: './src/abis/',

	compilers: {
		solc: {
			version: '0.8.9',
			optimizer: {
				enabled: true,
				runs: 200
			}
		}
	}
}

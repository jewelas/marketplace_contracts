require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("@openzeppelin/hardhat-upgrades");

const { API_URL_MUMBAI, PRIVATE_KEY, POLYGON_API_KEY, API_URL_POLYGON, URL_MUMBAI, URL_DOGE_CHAIN_TEST } = process.env;
module.exports = {
  // solidity: {
  //   version: "0.7.6",
  //   settings: {
  //     optimizer: {
  //       enabled: true,
  //       runs: 1,
  //     },
  //   },
  // },
  solidity: {
    compilers: [
      {
        version: "0.7.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1,
          },
        },
      },
      // {
      //   version: "0.8.2",
      //   settings: {},
      // },
    ],
    // settings: {
    //   optimizer: {
    //     enabled: true,
    //     runs: 1,
    //   },
    // },
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    polygon: {
      url: API_URL_POLYGON,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    mumbai: {
      url: URL_MUMBAI,
      // url: API_URL_MUMBAI,
      accounts: [`0x${PRIVATE_KEY}`],
      // gasPrice: 250000000000,
    },
    doge_testnet: {
      url: URL_DOGE_CHAIN_TEST,
      // url: API_URL_MUMBAI,
      accounts: [`0x${PRIVATE_KEY}`],
      // gasPrice: 250000000000,
    },
  },
  etherscan: {
    apiKey: POLYGON_API_KEY,
  },
};

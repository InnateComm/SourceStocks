import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  defaultNetwork: 'polygon',
  networks: {
    hardhat: {
      chainId: 1337
    },
    'polygon-mumbai': {
      url: "https://rpc-mumbai.matic.today",
      //@ts-ignore 2322
      accounts: [process.env.PRIVATE_KEY]
    },
    polygon: {
      url: "https://polygon-rpc.com/",
      //@ts-ignore 2322
      accounts: [process.env.PRIVATE_KEY]
    },
    localhost: {
      url: "http://127.0.0.1:8545"
    }
  },
  solidity: {
    version: "0.8.11",
    settings: {
      optimizer: {
        enabled: true
      }
    }
  }
};

export default config;

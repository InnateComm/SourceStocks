import '../styles/globals.css'

import type { AppProps } from 'next/app'
import { useState } from "react";
import Head from "next/head";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Navigation from "../components/Global/Navigation";
import { AccountContext } from "../util/context";

function MyApp({ Component, pageProps }: AppProps) {
  const [account, setAccount] = useState(null);

  async function getWeb3Modal() {
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: false,
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
        },
      },
    });
    return web3Modal;
  }

  async function connect() {
    try {
      const web3Modal = await getWeb3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const accounts = await provider.listAccounts();
      setAccount(accounts[0]);
    } catch (err) {
      console.log("error:", err);
    }
  }

  return (
    <div>
      <Head>
        <title>SourceStacks</title>
        <meta
          name="description"
          content="A platform for supporters to support their favourite creators"
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Poppins:wght@400;600;700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>

      <main>
        <Navigation account={account} connect={connect} />
        <AccountContext.Provider value={account}>
          <Component {...pageProps} connect={connect} />
        </AccountContext.Provider>
      </main>
    </div>
  );
}

export default MyApp

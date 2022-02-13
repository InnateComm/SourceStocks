import "../styles/globals.css";

import type { AppProps } from "next/app";
import { useState } from "react";
import Head from "next/head";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Popover, Menu, Transition } from "@headlessui/react";
import {
  UserCircleIcon,
  MenuAlt3Icon,
  XIcon,
  CogIcon,
  EyeIcon,
  ExternalLinkIcon,
  ViewGridAddIcon,
} from "@heroicons/react/outline";
import { Fragment } from "react";
import { AccountContext } from "../util/context";

function MyApp({ Component, pageProps }: AppProps) {
  const [account, setAccount] = useState(null);

  function getWeb3Modal() {
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
      const web3Modal = getWeb3Modal();
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
        <Popover
          as="header"
          className={({ open }) =>
            `${
              open ? "fixed inset-0 z-40 overflow-y-auto" : ""
            } bg-white shadow-sm lg:static lg:overflow-y-visible`
          }
        >
          {({ open }) => (
            <>
              <nav className="w-full shadow-md flex justify-between items-center px-2 md:px-4 lg:px-10 xl:px-20 h-16">
                <div className="mx-4">
                  <a
                    href="#"
                    className="font-display font-bold text-lg md:text-xl transition-colors hover:text-blue-700"
                  >
                    SourceStocks
                  </a>
                </div>

                <div className="hidden sm:flex mx-2 lg:mx-4 items-center justify-between">
                  <a className="mx-2 lg:mx-4 cursor-pointer p-2 font-display transition-colors font-semibold md:text-lg text-gray-500 hover:text-gray-700">
                    Explore
                  </a>
                  <a className="mx-2 lg:mx-4 cursor-pointer p-2 font-display transition-colors font-semibold md:text-lg text-gray-500 hover:text-gray-700">
                    Create
                  </a>
                  {!account && (
                    <div onClick={connect} className="mx-2 lg:mx-4 cursor-pointer py-2 px-4 rounded-md font-display font-semibold text-white bg-blue-500 transition-colors hover:bg-blue-700">
                      Connect Wallet
                    </div>
                  )}

                  {account && (
                    <div className="mx-2 lg:mx-4 cursor-pointer p-2 flex items-center transition-colors text-gray-500 hover:text-gray-700">
                      <Menu as="div" className="flex-shrink-0 relative">
                        <div>
                          <Menu.Button className="bg-white rounded-full flex focus:outline-none">
                            <span className="sr-only">Open user menu</span>
                            <UserCircleIcon className="w-10 h-10" />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="max-w-3xl mx-auto pt-2 pb-3 space-y-2 px-4 origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
                            <a
                              href="#"
                              className={
                                "text-gray-900 hover:bg-gray-100 flex rounded-md py-2 px-3 font-display text-base font-semibold"
                              }
                            >
                              Profile
                            </a>
                            <a
                              href="#"
                              className={
                                "text-gray-900 hover:bg-gray-100 flex rounded-md py-2 px-3 font-display text-base font-semibold"
                              }
                            >
                              Watchlist
                            </a>
                            <a
                              href="#"
                              className={
                                "text-gray-900 hover:bg-gray-100 flex rounded-md py-2 px-3 font-display text-base font-semibold"
                              }
                            >
                              Settings
                            </a>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  )}
                </div>

                <Popover.Button className="inline-flex mx-2 rounded-md p-2 sm:hidden items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-700">
                  <span className="sr-only">Open menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuAlt3Icon
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                  )}
                </Popover.Button>
              </nav>

              <Popover.Panel as="nav" className="sm:hidden" aria-label="Global">
                <div className="shadow-lg max-w-3xl mx-auto pt-2 pb-3 space-y-2 px-4">
                  <a
                    href="#"
                    className={
                      "text-gray-900 hover:bg-gray-100 flex rounded-md py-2 px-3 font-display text-base font-semibold"
                    }
                  >
                    <ExternalLinkIcon className="h-6 w-6 mx-2" /> Explore
                  </a>
                  <a
                    href="#"
                    className={
                      "text-gray-900 hover:bg-gray-100 flex rounded-md py-2 px-3 font-display text-base font-semibold"
                    }
                  >
                    <ViewGridAddIcon className="h-6 w-6 mx-2" /> Create
                  </a>
                  {account && (
                    <div className="border-t-2 border-gray-100 w-full">
                      <a
                        href="#"
                        className={
                          "text-gray-900 hover:bg-gray-100 flex rounded-md py-2 px-3 font-display text-base font-semibold"
                        }
                      >
                        <UserCircleIcon className="h-6 w-6 mx-2" /> Profile
                      </a>
                      <a
                        href="#"
                        className={
                          "text-gray-900 hover:bg-gray-100 flex rounded-md py-2 px-3 font-display text-base font-semibold"
                        }
                      >
                        <EyeIcon className="h-6 w-6 mx-2" /> Watchlist
                      </a>
                      <a
                        href="#"
                        className={
                          "text-gray-900 hover:bg-gray-100 flex rounded-md py-2 px-3 font-display text-base font-semibold"
                        }
                      >
                        <CogIcon className="h-6 w-6 mx-2" /> Settings
                      </a>
                    </div>
                  )}
                  {!account && (
                    <div onClick={connect} className="cursor-pointer py-2 px-4 rounded-md font-display font-semibold text-white bg-blue-500 transition-colors hover:bg-blue-700">
                      Connect Wallet
                    </div>
                  )}
                </div>
              </Popover.Panel>
            </>
          )}
        </Popover>
        <AccountContext.Provider value={account}>
          <Component {...pageProps} connect={connect} accounts={account} />
        </AccountContext.Provider>
      </main>
    </div>
  );
}

export default MyApp;

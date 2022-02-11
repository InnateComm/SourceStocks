import { Popover } from "@headlessui/react";
import { UserCircleIcon, MenuAlt3Icon, XIcon } from "@heroicons/react/outline";

export default function Navigation({ account, connect }) {
  return (
    <>
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
            <nav className="w-full shadow-md flex justify-between items-center px-2 md:px-4 lg:px-10 xl:px-20 h-20">
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
                  <div className="mx-2 lg:mx-4 cursor-pointer py-2 px-4 rounded-md font-display font-semibold text-white bg-blue-500 transition-colors hover:bg-blue-700">
                    <a onClick={connect}>Connect Wallet</a>
                  </div>
                )}

                {account && (
                  <a className="mx-2 lg:mx-4 cursor-pointer p-2 flex items-center transition-colors text-gray-500 hover:text-gray-700">
                    <UserCircleIcon className="h-10 w-10" aria-hidden="true" />
                  </a>
                )}
              </div>

              <Popover.Button className="inline-flex mx-2 rounded-md p-2 sm:hidden items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-700">
                <span className="sr-only">Open menu</span>
                {open ? (
                  <XIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <MenuAlt3Icon
                    className="block h-6 w-6 rotate-[360deg]"
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
                    "text-gray-900 hover:bg-gray-100 block rounded-md py-2 px-3 font-display text-base font-semibold"
                  }
                >
                  Explore
                </a>
                <a
                  href="#"
                  className={
                    "text-gray-900 hover:bg-gray-100 block rounded-md py-2 px-3 font-display text-base font-semibold"
                  }
                >
                  Create
                </a>
              <div className="border-t border-gray-200 pt-4 pb-3">
                <div className="max-w-3xl flex items-center sm:px-6">
                  {!account && (
                    <div className="cursor-pointer my-2 py-2 px-4 rounded-md font-display font-semibold text-white bg-blue-500 transition-colors hover:bg-blue-700">
                      <a onClick={connect}>Connect Wallet</a>
                    </div>
                  )}
                  {account && (
                    <>
                      <UserCircleIcon
                        className="h-10 w-10"
                        aria-hidden="true"
                      />
                      <div className="ml-3">
                        <div className="font-display text-base font-semibold text-gray-500 hover:text-gray-700">
                          Profile
                        </div>
                        <div className="font-display text-base font-semibold text-gray-500 hover:text-gray-700">
                          Watchlist
                        </div>
                        <div className="font-display text-base font-semibold text-gray-500 hover:text-gray-700">
                          Settings
                        </div>
                        <div className="font-display text-base font-semibold text-gray-500 hover:text-gray-700">
                          Logout
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>
    </>
  );
}

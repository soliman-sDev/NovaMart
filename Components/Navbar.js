import React, { Fragment, useState, useEffect, useContext } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Cookies from "js-cookie";
import { ToastContainer } from "react-toastify";
import { useTheme } from "next-themes";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { Store } from "@/Utils/Store";
import Loading from "./Loading";
import { Menu, Transition } from "@headlessui/react";
import { FaMoon, FaSun, FaShoppingCart, FaChevronDown } from "react-icons/fa";
import { IoIosSearch, IoIosMenu } from "react-icons/io";
import { FaRegUser } from "react-icons/fa6";
import Cart from "@/Components/Cart";
import axios from "axios";

const Header = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <FaSun
          className="w-5 h-5 pl-1 ml-2 text-white"
          role="button"
          onClick={() => setTheme("light")}
        />
      );
    } else {
      return (
        <FaMoon
          className="w-5 h-5 pl-1 ml-2 text-black "
          role="button"
          onClick={() => setTheme("dark")}
        />
      );
    }
  };
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);
  const logoutClickHandler = () => {
    Cookies.remove("cart");
    dispatch({ type: "CART_RESET" });
    signOut({ callbackUrl: "/" });
  };
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [autoComplete, setAutoComplete] = useState([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  useEffect(() => {
    (async () => {
      if (debouncedSearchTerm.length) {
        try {
          const { data } = await axios.get(
            `/api/products?search=${debouncedSearchTerm}`
          );
          setAutoComplete(data);
        } catch (error) {
          console.error(error);
          setAutoComplete([]);
        }
      } else {
        setAutoComplete([]);
      }
    })();
  }, [debouncedSearchTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setSearchTerm("");
    router.push({
      pathname: `/search/${searchTerm}`,
    });
  };

  const handleSelect = (id) => {
    setSearchTerm("");
    router.push({
      pathname: `/products/${id}`,
    });
  };

  const handleKeyDown = (event, id) => {
    if (event.key === "Enter") {
      setSearchTerm("");
      router.push({
        pathname: `/products/${id}`,
      });
    }
  };

  return (
    <>
      <header>
        <div className="dark:bg-black container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="w-full text-black dark:text-white text-2xl font-semibold cursor-pointer">
                NovaMart
              </div>
            </Link>
            <div className="flex items-center justify-end w-full">
              {status === "loading" ? (
                <Loading />
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex w-full justify-center px-4 py-2 text-sm font-medium text-black dark:text-white focus:outline-none ">
                      {session.user.name}
                      <FaChevronDown
                        className="-mr-1 ml-2 h-5 w-5"
                        aria-hidden="true"
                      />
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right dark:bg-[#0d0d0d] rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1 ">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => router.push("/profile")}
                              className={`${
                                active
                                  ? "dark:bg-white  bg-black text-white dark:text-black"
                                  : "text-black dark:text-white"
                              } group flex w-full items-center rounded-md px-2 py-1 text-sm`}
                            >
                              Profile
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => router.push("/order-history")}
                              className={`${
                                active
                                  ? "dark:bg-white  bg-black text-white dark:text-black"
                                  : "text-black dark:text-white"
                              } group flex w-full items-center rounded-md px-2 py-1 text-sm`}
                            >
                              Order History
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={logoutClickHandler}
                              className={`${
                                active
                                  ? "dark:bg-white  bg-black text-white dark:text-black"
                                  : "text-black dark:text-white"
                              } group flex w-full items-center rounded-md px-2 py-1 text-sm`}
                            >
                              Sign Out
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              ) : (
                <Link href="/login">
                  <span>
                    <FaRegUser className="h-5 w-5 dark:text-white mr-3" />
                  </span>
                </Link>
              )}
              <button className="text-black focus:outline-none  mx-4 sm:mx-0 dark:text-white">
                <FaShoppingCart
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className="h-5 w-5"
                />
              </button>
              {cartItemsCount > 0 && (
                <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                  {cartItemsCount}
                </span>
              )}
              <div className="flex sm:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  type="button"
                  className="text-gray-600 hover:text-gray-500 focus:outline-none focus:text-gray-500"
                  aria-label="toggle menu"
                >
                  <IoIosMenu className="h-5 w-5 dark:text-white" />
                </button>
              </div>
              {renderThemeChanger()}
            </div>
          </div>

          <nav
            className={`${
              isMenuOpen ? "" : "hidden"
            } sm:flex sm:justify-center sm:items-center mt-4`}
          >
            <div className="flex flex-col sm:flex-row">
              <div className="dark:text-gray-300 mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0">
                <Link href="/">Home</Link>
              </div>
              <div className="dark:text-gray-300 mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0">
                <Link href="/products">Shop</Link>
              </div>
              <div className="dark:text-gray-300 mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0">
                <Link href="/category">Categories</Link>
              </div>
              <div className="dark:text-gray-300 mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0">
                <Link href="https://soliman.vercel.app/" target="_blank">About</Link>
              </div>
            </div>
          </nav>

          <div className="relative mt-6 max-w-lg mx-auto">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <IoIosSearch className="h-5 w-5 dark:text-white" />
            </span>
            <form onSubmit={handleSubmit}>
              <input
                className="w-full dark:border-gray-900 border rounded-md pl-10 pr-4 py-2 focus:border-black dark:focus:border-white focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Search"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
            </form>
            {autoComplete.length > 0 && (
              <ul className="absolute inset-x-0 top-full dark:bg-[#0d0d0d] bg-gray-50 border border-black rounded-md z-20">
                {autoComplete.map((item) => {
                  return (
                    <li
                      key={item._id}
                      className="px-4 py-2 dark:hover:bg-[hsl(0,0%,15%)] hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSelect(item._id)}
                      onKeyDown={(event) => handleKeyDown(event, item._id)}
                      tabIndex={0}
                      role="button"
                    >
                      {item.name}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </header>
      <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
      <ToastContainer theme="colored" position="bottom-center" limit={1} />
    </>
  );
};

export default Header;

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Head from "next/head";
import Pheader from "@/Components/Pheader";
import Container from "@/Components/Container";
import Footer from "@/Components/Footer";
import { getError } from "@/Utils/error";
import { Store } from "@/Utils/Store";
import { getSession } from "next-auth/react";


export default function PlaceOrderScreen() {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress, paymentMethod } = cart;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );

  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  const router = useRouter();
  useEffect(() => {
    if (!paymentMethod) {
      router.push("/payment");
    }
  }, [paymentMethod, router]);

  const [loading, setLoading] = useState(false);

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const session = await getSession(); 
      const token = session?.token || session?.accessToken;

      const { data } = await axios.post("/api/orders", {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      dispatch({ type: "CART_CLEAR_ITEMS" });
      Cookies.set(
        "cart",
        JSON.stringify({
          ...cart,
          cartItems: [],
        })
      );
      router.push(`/order/${data._id}`);
    } catch (err) {
      setLoading(false);
      toast.error(getError(err));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <Head>
        <title>E-commerce - Place Order</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="dark:bg-black bg-[#e4ebf5] w-full min-h-screen">
        <Pheader />
        <Container>
          <h1 className="mb-4 text-xl">Place Order</h1>
          {cartItems.length === 0 ? (
            <div>
              Cart is empty.{" "}
              <Link
                className="mt-3 text-blue-600 hover:underline sm:mx-3 sm:mt-0"
                href="/"
              >
                Go shopping
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-4 md:gap-5">
              <div className="overflow-x-auto md:col-span-3">
                <div className="rounded-lg w-full dark:bg-[#0d0d0d] shadow-lg p-5">
                  <h2 className="mb-2 text-lg">Shipping Address</h2>
                  <div className="my-3">
                    {shippingAddress.fullName}, {shippingAddress.address},{" "}
                    {shippingAddress.city}, {shippingAddress.postalCode},{" "}
                    {shippingAddress.country}
                  </div>
                  <div className="mt-3 text-white dark:text-black font-medium sm:mr-3 sm:mt-0">
                    <Link
                      href="/shipping"
                      className="bg-black dark:bg-white py-1 px-3 rounded-sm"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
                <div className="rounded-lg w-full dark:bg-[#0d0d0d] shadow-lg p-5 my-3">
                  <h2 className="mb-2 text-lg ">Payment Method</h2>
                  <div className="mb-3">{paymentMethod}</div>
                  <div className="mt-3 dark:text-black text-white font-medium  sm:mr-3 sm:mt-0">
                    <Link
                      href="/payment"
                      className="bg-black dark:bg-white py-1 px-3 rounded-sm"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
                <div className="rounded-lg w-full dark:bg-[#0d0d0d] shadow-xl overflow-x-auto p-5">
                  <h2 className="mb-2 text-lg ">Order Items</h2>
                  <table className="min-w-full mb-3">
                    <thead className="border-b  border-black dark:border-white">
                      <tr>
                        <th className="px-5 text-left">Item</th>
                        <th className="    p-5 text-right">Quantity</th>
                        <th className="  p-5 text-right">Price</th>
                        <th className="p-5 text-right">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => (
                        <tr
                          key={item._id}
                          className="border-b border-black dark:border-white"
                        >
                          <td>
                            <Link
                              href={`/product/${item._id}`}
                              className="flex items-center"
                            >
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={50}
                                height={50}
                              ></Image>
                              &nbsp;
                              {item.name}
                            </Link>
                          </td>
                          <td className=" p-5 text-right">{item.quantity}</td>
                          <td className="p-5 text-right">${item.price}</td>
                          <td className="p-5 text-right">
                            ${item.quantity * item.price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="mt-3 text-white dark:text-black font-medium sm:mr-3 sm:mt-0">
                    <Link
                      href="/cart"
                      className="bg-black dark:bg-white py-1 px-3 rounded-sm"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
              <div>
                <div className="rounded-lg w-full shadow-lg p-5 dark:bg-[#0d0d0d]">
                  <h2 className="mb-2 text-lg">Order Summary</h2>
                  <ul>
                    <li>
                      <div className="mb-2 flex justify-between">
                        <div>Items</div>
                        <div>${itemsPrice}</div>
                      </div>
                    </li>
                    <li>
                      <div className="mb-2 flex justify-between">
                        <div>Tax</div>
                        <div>${taxPrice}</div>
                      </div>
                    </li>
                    <li>
                      <div className="mb-2 flex justify-between">
                        <div>Shipping</div>
                        <div>${shippingPrice}</div>
                      </div>
                    </li>
                    <li>
                      <div className="mb-2 flex justify-between">
                        <div>Total</div>
                        <div>${totalPrice}</div>
                      </div>
                    </li>
                    <li>
                      <button
                        disabled={loading}
                        onClick={placeOrderHandler}
                        className="ml-3 flex items-center px-3 py-2 bg-black dark:bg-white dark:text-black text-white text-sm uppercase font-medium rounded focus:outline-none"
                      >
                        {loading ? "Loading..." : "Place Order"}
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </Container>
        <Footer />
      </div>
    </div>
  );
}

PlaceOrderScreen.auth = true;

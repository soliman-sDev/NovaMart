import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Head from "next/head";
import Pheader from "@/components/Pheader";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import { Store } from "@/utils/store";

export default function PaymentScreen() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;

  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return toast.error("Payment method is required");
    }
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: selectedPaymentMethod });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    );

    router.push("/placeorder");
  };
  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push("/shipping");
    }
    setSelectedPaymentMethod(paymentMethod || "");
  }, [paymentMethod, router, shippingAddress.address]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>E-commerce - Payment</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="dark:bg-black bg-[#e4ebf5] w-full min-h-screen">
        <Pheader />
        <Container>
          <form className="mx-auto max-w-screen-md" onSubmit={submitHandler}>
            <h1 className="mb-4 text-xl">Payment Method</h1>
            {["PayPal", "Stripe", "Cash On Delivery"].map((payment) => (
              <div key={payment} className="mb-4">
                <input
                  name="paymentMethod"
                  className="p-2 outline-none focus:ring-0"
                  id={payment}
                  type="radio"
                  checked={selectedPaymentMethod === payment}
                  onChange={() => setSelectedPaymentMethod(payment)}
                />

                <label className="p-2" htmlFor={payment}>
                  {payment}
                </label>
              </div>
            ))}
            <div className="mb-4 flex justify-between">
              <button
                onClick={() => router.push("/shipping")}
                type="button"
                className="ml-3 flex items-center px-3 py-2 bg-black dark:bg-white dark:text-black text-white text-sm uppercase font-medium rounded  focus:outline-none"
              >
                Back
              </button>
              <button className="ml-3 flex items-center px-3 py-2 bg-black dark:bg-white dark:text-black text-white text-sm uppercase font-medium rounded  focus:outline-none ">
                Next
              </button>
            </div>
          </form>
        </Container>
        <Footer />
      </div>
    </div>
  );
}

PaymentScreen.auth = true;
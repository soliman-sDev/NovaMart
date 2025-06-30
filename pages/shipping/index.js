import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import Head from "next/head";
import Pheader from "@/Components/Pheader";
import Container from "@/Components/Container";
import Footer from "@/Components/Footer";
import { Store } from "@/Utils/Store";
import { useRouter } from "next/router";

export default function ShippingScreen() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;
  const router = useRouter();

  useEffect(() => {
    setValue("fullName", shippingAddress.fullName);
    setValue("address", shippingAddress.address);
    setValue("city", shippingAddress.city);
    setValue("postalCode", shippingAddress.postalCode);
    setValue("country", shippingAddress.country);
  }, [setValue, shippingAddress]);

  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: { fullName, address, city, postalCode, country },
    });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,
          city,
          postalCode,
          country,
        },
      })
    );

    router.push("/payment");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>E-commerce - Shipping</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="dark:bg-black bg-[#e4ebf5] w-full min-h-screen">
        <Pheader />
        <Container>
          <form
            className="mx-auto max-w-screen-md"
            onSubmit={handleSubmit(submitHandler)}
          >
            <h1 className="mb-4 text-xl">Shipping Address</h1>
            <div className="mb-4">
              <label htmlFor="fullName">Full Name</label>
              <input
                placeholder="Enter your name"
                className="w-full border rounded-md dark:border-gray-700 pl-10 pr-4 py-2 "
                id="fullName"
                autoFocus
                {...register("fullName", {
                  required: "Please enter full name",
                })}
              />
              {errors.fullName && (
                <div className="text-red-500">{errors.fullName.message}</div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="address">Address</label>
              <input
                placeholder="Enter your address"
                className="w-full border dark:border-gray-700 rounded-md pl-10 pr-4 py-2 "
                id="address"
                {...register("address", {
                  required: "Please enter address",
                  minLength: {
                    value: 3,
                    message: "Address should be more than 2 chars",
                  },
                })}
              />
              {errors.address && (
                <div className="text-red-500">{errors.address.message}</div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="city">City</label>
              <input
                placeholder="Enter your city"
                className="w-full border dark:border-gray-700 rounded-md pl-10 pr-4 py-2 "
                id="city"
                {...register("city", {
                  required: "Please enter city",
                })}
              />
              {errors.city && (
                <div className="text-red-500 ">{errors.city.message}</div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="postalCode">Postal Code</label>
              <input
                type="number"
                placeholder="Enter your postal code"
                className="w-full border dark:border-gray-700 rounded-md pl-10 pr-4 py-2"
                id="postalCode"
                {...register("postalCode", {
                  required: "Please enter postal code",
                })}
              />
              {errors.postalCode && (
                <div className="text-red-500 ">{errors.postalCode.message}</div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="country">Country</label>
              <input
                placeholder="Enter your country"
                className="w-full border dark:border-gray-700 rounded-md pl-10 pr-4 py-2"
                id="country"
                {...register("country", {
                  required: "Please enter country",
                })}
              />
              {errors.country && (
                <div className="text-red-500 ">{errors.country.message}</div>
              )}
            </div>
            <div className="mb-4 flex justify-between">
              <button className="ml-3 flex  items-center px-3 py-2 bg-black dark:bg-white dark:text-black text-white text-sm uppercase font-medium rounded hover:bg-black focus:outline-none focus:bg-black">
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

ShippingScreen.auth = true;
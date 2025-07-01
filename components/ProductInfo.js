import React, { useState, useContext } from "react";
import Image from "next/image";
import { Store } from "@/utils/storee;
import { LuCirclePlus, LuCircleMinus } from "react-icons/lu";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductInfo = ({ product }) => {
  const { state, dispatch } = useContext(Store);
  const[ count, setCount ] = useState(1);

  if (!product) {
    return <div> Product NOT Found </div>;
  }

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + count : count;

    if (product.countInStock < quantity) {
      return toast.error("out of stock");
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
  };

  const handleup = () => {
    setCount(count + 1);
  };
  const handledown = () => {
    if (count > 0) setCount(count - 1);
  };

  return (
    <div className="md:flex md:items-center bg-[#d4dae3] dark:bg-[#0d0d0d]">
      <div className="w-full h-64 md:w-1/2 lg:h-96 relative">
        <Image
          src={product.image}
          alt={product.name}
          fill
          style={{ objectFit: "cover" }}
          className="absolute z-0 rounded"
        />
      </div>
      <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
        <h3 className="dark:text-gray-200 text-gray-700 uppercase text-lg">
          {product.name}
        </h3>
        <span className="dark:text-gray-300 text-gray-500 mt-3">
          ${product.price}
        </span>
        <hr className="my-3 border-black dark:border-white" />
        <div className="mt-2">
          <label
            className="dark:text-gray-200 text-gray-700 text-sm"
            htmlFor="count"
          >
            Count:
          </label>
          <div className="flex items-center mt-1">
            <button
              className="text-gray-500 focus:outline-none focus:text-gray-600"
              onClick={handleup}
            >
              <LuCirclePlus className="w-5 h-5 dark:text-gray-200" />
            </button>
            <span className="dark:text-gray-200 text-gray-700 text-lg mx-2">
              {count}
            </span>
            <button
              className="text-gray-500 focus:outline-none focus:text-gray-600"
              onClick={handledown}
            >
              <LuCircleMinus className="w-5 h-5 dark:text-gray-200" />
            </button>
          </div>
        </div>
        <div className="flex items-center mt-6">
          <button
            className="px-8 py-2 bg-black text-white dark:bg-white dark:text-black text-sm font-medium rounded hover:bg-[#0d0d0d] focus:outline-none focus:bg-[#0d0d0d]"
            onClick={addToCartHandler}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;

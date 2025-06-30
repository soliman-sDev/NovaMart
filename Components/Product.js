import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/outline";

const Product = ({ product }) => {
  return (
    <Link href={`/products/${product._id}`}>
      <div className="dark:hover:shadow-slate-700 w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden cursor-pointer hover:shadow-2xl transition">
        <div className="flex items-end justify-end h-56 w-full bg-cover relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            style={{ objectFit: "cover" }}
            className="absolute z-0"
          />
          <button className="absolute z-10 p-2 rounded-full bg-black dark:bg-white dark:text-black dark:hover:bg-[#e6e6e6] text-white mx-5 -mb-4 hover:bg-[#1a1a1a] focus:outline-none focus:bg-[#1a1a1a]">
            <ShoppingCartIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="px-5 py-3 dark:bg-[#0d0d0d]">
          <h3 className="dark:text-gray-200 text-gray-700 uppercase">
            {product.name}
          </h3>
          <span className="dark:text-gray-300 text-gray-500 mt-2">
            ${product.price}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Product;
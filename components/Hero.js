import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowNarrowRightIcon } from "@heroicons/react/outline";

const Hero = () => {
  const images = [
    "https://img.freepik.com/free-photo/straw-hat-man_1203-7257.jpg",
    "https://img.freepik.com/free-photo/portrait-happy-handsome-young-man-posing-isolated-background_1150-63507.jpg",
    "https://img.freepik.com/free-photo/young-handsome-man-walking-down-street_1303-24594.jpg",
  ];
  

  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
        setCount((pv) => (pv + 1) % images.length);
    }, 1500);
    return () => clearInterval(timer);
  },[images]);

  return (
    <div className=" h-96 rounded-md overflow-hidden bg-cover bg-center relative">
        <Image 
        src={images[count]}
        alt="Hero Image"
        fill
        style={{objectFit: "cover"}}
        className="absolute z-0"
        />

        <div className="text-gray-900 bg-opacity-60 flex items-center h-full absolute w-full z-10">
            <div className="px-10 max-w-xl">
                <h2 className="text-2xl text-white font-semibold">Tech Shirts</h2>
                <p className="mt-2 text-gray-400">
                    Get your fashionable geek mode from here!
                </p>
                <Link href={`/products`}>
                    <button className="flex items-center mt-4 px-3 py-2 bg-gray-300 text-balck text-sm uppercase font-medium rounded  focus:outline-none focus:bg-gray-700">
                        <span>Shop Now</span>
                        <ArrowNarrowRightIcon className="w-5 h-5" />
                    </button>
                </Link>
            </div>
        </div>
    </div>
  )

  }

  export default Hero
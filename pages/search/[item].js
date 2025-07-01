import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Products from "@/components/Products";
import axios from "axios";

export default function Home() {
  const [products, setProducts] = useState([]);
  const { query } = useRouter();

  useEffect(() => {
    (async () => {
      if (query.term) {
        try {
          const { data } = await axios.get(`/api/products?search=${query.term}`);
          setProducts(data);
        } catch (error) {
          console.error(error);
          setProducts([]);
        }
      }
    })();
  }, [query]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <Head>
        <title>E-commerce - Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="dark:bg-black bg-[#e4ebf5] w-full min-h-screen">
        <Navbar />
        <Container>
          <Products products={products} />
        </Container>
        <Footer />
      </div>
    </div>
  );
}
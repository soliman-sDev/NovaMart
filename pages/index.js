import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Container from "@/components/Container";
import Products from "@/components/Products";
import Pagination from "@/components/Pagination";
import { useState } from "react";
import db from "@/utils/db";
import Product from "@/models/Product";

export default function Home({products = []}) {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 7;
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = products.slice(firstPostIndex, lastPostIndex);
  return (
    <div className=" flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>NovaMart 🔥</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" bg-[#E4EBF5] dark:bg-black w-full min-h-screen">
        <Navbar />
        <Container>
          <Hero />
          <Products products={currentPosts} />
          <Pagination
            totalPosts={products.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </Container>
        <Footer />
      </div>
    </div>
  );
}


export async function getStaticProps() {
  await db.connect();
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
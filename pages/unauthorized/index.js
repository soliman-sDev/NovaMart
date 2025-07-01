import { useRouter } from "next/router";
import React from "react";
import Head from "next/head";
import Pheader from "@/components/Pheader";
import Container from "@/components/Container";
import Footer from "@/components/Footer";

export default function Unauthorized() {
  const router = useRouter();
  const { message } = router.query;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>E-commerce- Shipping</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="dark:bg-black bg-[#e4ebf5] w-full min-h-screen">
        <Pheader />
        <Container>
          <h1 className="text-xl">Access Denied</h1>
          {message && <div className="mb-4 text-red-500">{message}</div>}
        </Container>
        <Footer />
      </div>
    </div>
  );
}
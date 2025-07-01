import Head from "next/head";
import Categories from "@/components/Categories";
import Nabar from "@/components/Navbar";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import db from "@/utils/db";
import Product from "@/models/Product";

export default function Category({categories= []}) {

  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>E-Commerce - Categories</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="dark:bg-black bg-[#e4ebf5] w-full min-h-screen">
        <Nabar />
        <Container>
          <Categories
            categorys={categories}
            categoryCount={`${categories.length} Categories available`}
          />
        </Container>
        <Footer />
      </div>
    </div>
  );
}


export async function getServerSideProps() {
  await db.connect();
  const categories = await Product.distinct("category");
  
  return {
    props: {
      categories: categories
    },
  };
}
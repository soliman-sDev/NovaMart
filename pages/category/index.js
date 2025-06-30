import Head from "next/head";
import Categories from "@/Components/Categories";
import Nabar from "@/Components/Navbar";
import Container from "@/Components/Container";
import Footer from "@/Components/Footer";
import db from "@/Utils/db";
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


export async function getStaticProps() {
  await db.connect();
  const categories = await Product.distinct("category");
  
  return {
    props: {
      categories: categories
    },
  };
}
import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar"
import Container from "@/components/Container";
import Products from "@/components/Products";
import Footer from "@/components/Footer";
import Product from "@/models/Product";
import db from "@/utils/db";
const CategoryDetails = ({products}) => {
  const { query } = useRouter();

  return (
    <>
      {query.category && (
        <>
          <Head>
            <title>E-Commerce - {query.category}</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className="dark:bg-black bg-[#e4ebf5] w-full min-h-screen">
            <Navbar />
            <Container>
              <Products products={products} />
            </Container>
            <Footer />
          </div>
        </>
      )}
    </>
  );
};

export default CategoryDetails;


export async function getServerSideProps(context) {
  const { category } = context.params;
  await db.connect();
  const products = await Product.find({ category }).lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}

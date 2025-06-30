import Head from "next/head";
import Navbar from "@/Components/Navbar";
import ProductInfo from "@/Components/ProductInfo";
import Footer from "@/Components/Footer";
import Container from "@/Components/Container";
import Products from "@/Components/Products";
import db from "@/Utils/db";
import Product from "@/models/Product";

const ProductDetails = ({product}) => {
  return (
    <>
      {product && (
        <>
          <Head>
            <title>{`E-Commerce- ${product.name}`}</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className="dark:bg-black bg-[#e4ebf5] w-full min-h-screen">
            <Navbar />
            <Container>
              <ProductInfo product={product} />
            </Container>
            <Footer />
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;


export async function getServerSideProps(context) {
  const { id } = context.params;
  await db.connect();
  const product = await Product.findById(id).lean();
  return {
    props: {
      product: db.convertDocToObj(product),
    },
  };
}


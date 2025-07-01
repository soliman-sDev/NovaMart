import Head from "next/head";
import Navbar from "@/components/Navbar";
import ProductInfo from "@/components/ProductInfo";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import Products from "@/components/Products";
import db from "@/utils/db";
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


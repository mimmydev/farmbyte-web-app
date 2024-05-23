'use client'

import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface ProductPageProps {
  product: Product;
}

const ProductPage: NextPage<ProductPageProps> = ({ product }) => {
  return (
    <>
    <Head>
      <title>{product.name} product</title>
      <meta name="description" content="Farm products." />
      <meta property="og:title" content="Welcome to Farm Byte" />
    </Head>
    <div className="flex min-h-screen flex-col items-center justify-between p-24 bg-farm-beige">
      <h1 className="text-3xl font-semibold mb-4 text-black">
        Name product:  &nbsp;
        <span className='underline text-farm-green-dark font-bold'>{product.name}</span>
      </h1>
      <Image
        src={product.image}
        alt={product.name}
        width={500}
        height={500}
        objectFit="cover"
        className="rounded-t-lg shadow-md p-8"
        // NOTE: This is not the best practice it's recommended to explicitly list the domains in next config but its an alternative for now
        unoptimized={true}
      />
      <p className="text-2xl font-semibold text-black pt-12">
          Price: RM{product.price}
        </p>
    </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const products: Product[] = require('../../products.json');
  const paths = products.map((product) => ({ params: { id: product.id.toString() } }));
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<ProductPageProps> = async ({ params }) => {
  const products: Product[] = require('../../products.json');
  const product = products.find((p) => p.id.toString() === params?.id);
  if (!product) {
    return { notFound: true };
  }
  return { props: { product } };
};

export default ProductPage;
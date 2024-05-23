import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';

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
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="relative h-80">
          <img
            src={product.image}
            alt={product.name}
            className="rounded-t-lg object-cover"
          />
        </div>
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-semibold text-gray-600 mb-6">
            Price: RM{product.price}
          </p>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const products: Product[] = require('../../products.json');
  const paths = products.map((product) => ({ params: { id: product.id.toString() } }));
  return { paths, fallback: false };
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
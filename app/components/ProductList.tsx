'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import AddProductForm from './AddProductForm';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddProduct = (newProduct: Product) => {
    setProducts([...products, newProduct]);
  };

  return (
    <div className="container mx-auto">
      <AddProductForm onAddProduct={handleAddProduct} />
      <h1 className="text-2xl font-bold mb-4 mt-12">Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          // <Link  href={`/product/${product.id}`}>
            <div key={product.id} className="bg-white shadow-md rounded-lg p-4">
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-2" />
              <h2 className="text-lg font-semibold text-black">{product.name}</h2>
              <p className="text-gray-500">RM{product.price.toFixed(2)}</p>
            </div>
          // </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

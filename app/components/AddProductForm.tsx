import React, { useState } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface AddProductFormProps {
  onAddProduct: (newProduct: Product) => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onAddProduct }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('/api/products', { name, price, image });
      const newProduct = response.data;
      onAddProduct(newProduct);
  
      setName('');
      setPrice(0);
      setImage('');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const isFormValid = name.trim() !== '' && price > 0 && image.trim() !== '';

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block mb-1">
          Name product
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded px-2 py-1 text-black"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block mb-1">
          Price
        </label>
        <input
          type="number"
          id="price"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          className="w-full border border-gray-300 rounded px-2 py-1 text-black"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="image" className="block mb-1">
          Image URL
        </label>
        <input
          type="url"
          id="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full border border-gray-300 rounded px-2 py-1 text-black"
          required
        />
      </div>
      <button
        type="submit"
        className={`bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 ${
          !isFormValid ? 'pointer-events-none opacity-75' : ''
        }`}
      >
        Add Product
      </button>
    </form>
  );
};

export default AddProductForm;
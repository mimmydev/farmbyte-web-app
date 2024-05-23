import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const productsFilePath = path.join(process.cwd(), 'products.json');

function readProductsFromFile(): Product[] {
  if (fs.existsSync(productsFilePath)) {
    const fileData = fs.readFileSync(productsFilePath, 'utf-8');
    return JSON.parse(fileData);
  }
  return [];
}

function writeProductsToFile(products: Product[]) {
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const products = readProductsFromFile();
    res.status(200).json(products);
  } else if (req.method === 'POST') {
    const { name, price, image } = req.body;
    const products = readProductsFromFile();
    const newProductId = products.length + 1;
    const newProduct: Product = { id: newProductId, name, price, image };
    products.push(newProduct);
    writeProductsToFile(products);
    res.status(201).json(newProduct);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
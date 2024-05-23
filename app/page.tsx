import Image from "next/image";
import ProductList from "./components/ProductList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ProductList />
    </main>
  );
}

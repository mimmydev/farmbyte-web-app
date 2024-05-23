import Image from "next/image";
import ProductList from "@/app/components/ProductList";
import homeIcon from "@/public/home.png"
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Welcome to Farm Byte</title>
        <meta property="og:title" content="Welcome to Farm Byte" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Image src={homeIcon} alt="Homepage icon" height={150} />
        <h1 className="text-4xl font-bold mb-8">Welcome to the Farm Byte Web App</h1>
        <ProductList />
      </main>
    </>
  );
}

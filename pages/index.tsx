import { Center } from "@mantine/core";
import type { NextPage } from "next";
import Image from "next/image";
import Layout from "../components/layout";

const Home: NextPage = () => {
  return (
    <Layout home>
      <Center>
        <Image
          src="/mformant-logo.png"
          alt="mFormant Logo"
          width={571}
          height={138}
        />
      </Center>
    </Layout>
  );
};

export default Home;

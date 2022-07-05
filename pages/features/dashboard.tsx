import Head from "next/head";
import Link from "next/link";
import useSWR from "swr";
import Layout from "../../components/layout";
import fetcher from "../../lib/fetcher";
import { NcdcNoaaApi, StatesData } from "../../lib/types";

export default function Dashboard() {
  const { data } = useSWR<NcdcNoaaApi<StatesData>>("/api/states", fetcher);

  const states = data?.metadata?.resultset?.count;

  return (
    <Layout>
      <Head>
        <title>Dashboard</title>
      </Head>
      <>{states} States</>
    </Layout>
  );
}

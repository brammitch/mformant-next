import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout from "../components/layout";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <Layout home>
      <main className={styles.main}>
        <div className={styles.grid}>
          <Link href="/features/dashboard">
            <a className={styles.card}>
              <h2>Dashboard &rarr;</h2>
              <p>Built with Plotly.js</p>
            </a>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </Layout>
  );
};

export default Home;

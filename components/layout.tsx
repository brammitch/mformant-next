import { ActionIcon } from "@mantine/core";
import { useTheme } from "next-themes";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Moon, Sun } from "tabler-icons-react";
import utilStyles from "../styles/utils.module.css";
import styles from "./layout.module.css";

const name = "mFormant Consulting";

interface LayoutProps {
  children: React.ReactNode;
  home?: boolean;
}

export default function Layout({ children, home }: LayoutProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const dark = theme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>mFormant Consuting homepage</title>
      </Head>
      <header className={styles.header}>
        <ActionIcon
          variant="outline"
          color={dark ? "yellow" : "gray"}
          onClick={() => setTheme(dark ? "light" : "dark")}
          title="Toggle color scheme"
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </ActionIcon>
        {home ? (
          <Image
            className={styles.title}
            src="/mformant.png"
            alt="mFormant Logo"
            width={571}
            height={138}
          />
        ) : (
          <>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  );
}

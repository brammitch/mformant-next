import {
  ActionIcon,
  AppShell,
  Burger,
  Container,
  Footer,
  Header,
  MediaQuery,
  Navbar,
} from "@mantine/core";
import { useTheme } from "next-themes";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Moon, Sun } from "tabler-icons-react";
import { useAppColors } from "../hooks/useAppColors";
interface LayoutProps {
  children: React.ReactNode;
  home?: boolean;
}

export default function Layout({ children, home }: LayoutProps) {
  const [mounted, setMounted] = useState(false);
  const [opened, setOpened] = useState(false);
  const { backgroundColor, color, isDark } = useAppColors();
  const { setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <title>mFormant Consulting Homepage</title>
      </Head>
      <AppShell
        styles={{ main: { backgroundColor: "inherit", color: "inherit" } }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        fixed
        padding="md"
        navbar={
          <Navbar
            p="md"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 200, lg: 300 }}
            style={{
              backgroundColor: !opened ? "inherit" : backgroundColor,
              color: "inherit",
              opacity: 1,
            }}
          >
            <Link href="/">
              <a>Home</a>
            </Link>
            <Link href="/features/climate">
              <a>Climate</a>
            </Link>
          </Navbar>
        }
        header={
          <Header
            height={60}
            p="xs"
            style={{ backgroundColor: "inherit", color: "inherit" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: "100%",
              }}
            >
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={color}
                  mr="xl"
                />
              </MediaQuery>
              <Image
                src="/mformant-icon.png"
                alt="mFormant Icon"
                width={28}
                height={28}
              />
              <ActionIcon
                variant="outline"
                color={isDark ? "yellow" : "gray"}
                onClick={() => setTheme(isDark ? "light" : "dark")}
                title="Toggle color scheme"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </ActionIcon>
            </div>
          </Header>
        }
        footer={
          <Footer
            height={60}
            p="md"
            style={{ backgroundColor: "inherit", color: "inherit" }}
          >
            mFormant Consulting, LLC
          </Footer>
        }
      >
        <Container>{children}</Container>
      </AppShell>
    </>
  );
}

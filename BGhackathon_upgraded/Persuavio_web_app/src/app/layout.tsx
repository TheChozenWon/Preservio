import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import styles from "./layout.module.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

type PageButton = {
  label: string;
  href: string;
}

const pageButtons: PageButton[] = [
  { label: "Home", href: "/" },
  { label: "Item Entry", href: "/inventory" },
  { label: "Inventory", href: "/quick_inv" },
  { label: "Expiration", href: "/expires" },
  { label: "Stats", href: "/stats" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${styles.body}`}>
        <header className={styles.header}>
          <div className={styles.logo}>
            <Image
              className={styles.logoImage}
              src="/logo.svg"
              alt="Preservio Logo"
              width={40}
              height={40}
            />
          </div>
          <div className={styles.title}>Preservio</div>
        </header>
        <nav className={styles.navbar}>
          {pageButtons.map((button) => (
            <Link
              className={styles.navButton}
              href={button.href}
              key={button.label}
            >
              {button.label}
            </Link>
          ))}
        </nav>
        <div className={styles.main}>
          {children}
        </div>
      </body>
    </html>
  );
}

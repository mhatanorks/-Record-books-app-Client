import type { Metadata } from "next";
import { GeistSans } from "geist/font";
import "./globals.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { getServerAuthSession } from "@/server/auth";

export const metadata: Metadata = {
  title: "RecordBooks",
  description: "Read Books Recording App",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  return (
    <html lang="ja">
      <body className={`${GeistSans.className} bg-green-50 text-green-950 mb-60`}>
        <Header session={session} />
        <main className="mx-10 ">{children}</main>
        {session ? <Footer /> : null}
      </body>
    </html>
  );
}

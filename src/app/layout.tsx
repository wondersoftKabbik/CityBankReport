import type { Metadata } from "next";
import "../styles/globals.scss";
import React from "react";
import Layout from "@/components/layout/Layout";

export const metadata: Metadata = {
  title: "Kabbik city_pay CRM",
  description: "Kabbik city_pay CRM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        {/* <ContextProvider> */}
          <Layout>{children}</Layout>
        {/* </ContextProvider> */}
      </body>
    </html>
  );
}

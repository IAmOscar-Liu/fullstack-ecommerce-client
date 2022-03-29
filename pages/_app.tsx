import { AppProps } from "next/app";
import React from "react";
import "../styles/globals.css";
import AccountProvider from "../utils/AccountProvider";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AccountProvider>
      <Component {...pageProps} />
    </AccountProvider>
  );
}

import { AppProps } from "next/app";
import React from "react";
import "../styles/globals.css";
import AccountProvider from "../utils/AccountProvider";
import { useApollo } from "../utils/apollo";
import { ApolloProvider } from "@apollo/client";

export default function MyApp({ Component, pageProps, router }: AppProps) {
  const { initialApolloState, ssr } = pageProps;
  const client = useApollo(initialApolloState, ssr || false);

  return (
    <AccountProvider>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </AccountProvider>
  );
}

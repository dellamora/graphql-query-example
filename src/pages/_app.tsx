import { type AppType } from "next/dist/shared/lib/utils";
import "n/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "n/apollo";
import Nav from "n/common/components/nav";
import Head from "next/head";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <title>GraphQL and Morty</title>
      </Head>
      <Nav />
      <Component {...pageProps} />;
    </ApolloProvider>
  );
};

export default MyApp;

import { type AppType } from "next/dist/shared/lib/utils";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@/apollo";
import Nav from "@/common/components/nav";
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

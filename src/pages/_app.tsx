import { type AppType } from "next/dist/shared/lib/utils";
import "n/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "n/apollo";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />;
    </ApolloProvider>
  ) 
};

export default MyApp;

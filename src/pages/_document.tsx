/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" type="image/png" href="/icon.svg" />
        <meta name="author" content="Francielle Dellamora" />
      </Head>
      <body>
        <div id="top" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

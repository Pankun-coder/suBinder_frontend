import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="bg-gray-100">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Shippori+Mincho+B1&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

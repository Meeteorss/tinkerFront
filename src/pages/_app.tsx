import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import theme from "../theme";

function MyApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Head>
        <link
          rel="shortcut icon"
          href="https://projecta-profile-pictures.s3.eu-west-3.amazonaws.com/staticImages/logo+tinker.png"
        />
      </Head>
      <ColorModeProvider
        options={{
          useSystemColorMode: false,
          initialColorMode: "light",
        }}
      >
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default MyApp;

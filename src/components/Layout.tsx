import { Box } from "@chakra-ui/layout";
import React from "react";
import Footer from "./Footer";
import NavBar2 from "./NavBar2";
import Head from "next/head";

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      {/* <Head>
        <title>Tinker.ma</title>
      </Head> */}
      <Box bg="alpha">
        <NavBar2 />
        {children}
        <Footer />
      </Box>
    </>
  );
};

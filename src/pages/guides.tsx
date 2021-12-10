import { InfoIcon } from "@chakra-ui/icons";
import { Box, Heading, Link, Text } from "@chakra-ui/layout";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import React from "react";

import { Layout } from "../components/Layout";
import { createUrqlClient } from "../utils/createUrqlClient";

const Guides = () => {
  return (
    <Layout>
      <Head>
        <title>Guides</title>
      </Head>
      <Box h={"xl"} bg={"white"} textAlign="center" py={10} px={6}>
        <InfoIcon boxSize={"50px"} color={"blue.500"} />
        <Heading as="h2" size="xl" mt={6} mb={2}>
          This is page is still work in progress
        </Heading>
        <Text color={"gray.500"}>
          We're afraid we're still working on this page.
        </Text>
        <Text as={Link} href={"/"} color={"blue.500"}>
          Go back to the home page?
        </Text>
      </Box>

      {/* <Testimonials />
      <Pricing />
      <Stats /> */}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Guides);

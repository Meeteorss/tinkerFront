import { Box, Flex } from "@chakra-ui/layout";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { createUrqlClient } from "../utils/createUrqlClient";
import { NewSearchField } from "../components/Fields/newSearchField";
import { useMeQuery, useSearchSkillsQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import CategoryCards from "../components/Cards/CategoryCards";
import Head from "next/head";

const Search = () => {
  const router = useRouter();
  const { category, city, keyword, orderBy } = router.query;

  return (
    <Layout>
      <Head>
        <title>Rechercher</title>
      </Head>

      <Flex
        flexDirection={"column"}
        pt={"28"}
        pb={10}
        mx={"auto"}
        maxW={"1200"}
      >
        <Box color={"black"} fontWeight={"semibold"} fontSize={"lg"}>
          Trouver le talent
        </Box>
        <NewSearchField
          initialValues={{ category: category, city: city, keyword: keyword }}
          fn={() => {}}
        />
      </Flex>
      <CategoryCards />
    </Layout>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(Search);

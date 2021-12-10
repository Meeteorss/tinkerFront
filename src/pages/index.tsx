import { withUrqlClient } from "next-urql";
import Head from "next/head";
import React from "react";
import CategoryCards from "../components/Cards/CategoryCards";
import Features from "../components/Features";
import Hero from "../components/Hero";

import { Layout } from "../components/Layout";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  return (
    <Layout>
      <Head>
        <title>Tinker</title>
      </Head>
      <Hero />
      <Features />
      <CategoryCards />

      {/* <Testimonials />
      <Pricing />
      <Stats /> */}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Index);

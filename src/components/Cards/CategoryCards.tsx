import React from "react";
import { Box, Stack, Heading } from "@chakra-ui/react";

import { useRouter } from "next/router";

const Card = ({
  category,
  value,
  img,
}: {
  category: string;
  value: string;
  img: string;
}) => {
  const router = useRouter();
  return (
    <Box
      boxSize={"2xs"}
      _hover={{
        cursor: "pointer",
      }}
      fontSize={"3xl"}
      fontWeight={"bold"}
      backgroundImage={img}
      backgroundSize={"cover"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      onClick={async () => {
        router.push({
          pathname: "/search/result",
          query: {
            category: category,
            city: "",
            keyword: "",
            orderBy: "rating",
          },
        });
      }}
    >
      <Box color={"betaWhite"}>{value}</Box>
    </Box>
  );
};

const CategoryCards = () => {
  return (
    <Box px={{ base: "4", sm: "0" }} py={20} bgColor={"betaWhite"}>
      <Box>
        <Heading
          maxW={"1200"}
          mx={"auto"}
          as="h1"
          fontSize="3xl"
          fontWeight={500}
          mb={20}
        >
          Categories qui peuvent t'interesser.
        </Heading>
      </Box>

      <Stack
        justify={"center"}
        mx={"auto"}
        maxW={"1200"}
        direction={{ base: "column", md: "row" }}
        textAlign="center"
        spacing={{ base: 2, lg: 10 }}
      >
        <Card
          category={"Developper"}
          value={"Developpeur"}
          img={
            "https://images.unsplash.com/photo-1569748130764-3fed0c102c59?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          }
        />
        <Card
          category={"Editor"}
          value={"Editeur"}
          img={
            "https://images.unsplash.com/photo-1536240478700-b869070f9279?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1300&q=80"
          }
        />

        <Card
          category={"Chef"}
          value={"Cuisinier"}
          img={
            "https://images.unsplash.com/photo-1625631976982-c6df1654a6ea?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
          }
        />
        <Card
          category={"Tailor"}
          value={"Tailleur"}
          img={
            "https://images.unsplash.com/photo-1584184924103-e310d9dc82fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
          }
        />
      </Stack>
    </Box>
  );
};
export default CategoryCards;

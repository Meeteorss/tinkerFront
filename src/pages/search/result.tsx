import { Box, Container, Divider, Flex } from "@chakra-ui/layout";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { createUrqlClient } from "../../utils/createUrqlClient";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import Navbar2 from "../../components/NavBar2";
import { NewSearchField } from "../../components/Fields/newSearchField";
import UserCard from "../../components/Cards/userCard";
import {
  useMeQuery,
  useSearchSkillsQuery,
  useWorkerByIdQuery,
} from "../../generated/graphql";
import { Layout } from "../../components/Layout";
import { isServer } from "../../utils/isServer";
import Head from "next/head";
import CategoryCards from "../../components/Cards/CategoryCards";
import { translateCategory } from "../../utils/translate";
import { ChevronRightIcon } from "@chakra-ui/icons";

const Result = () => {
  const router = useRouter();
  const { category, city, keyword, orderBy } = router.query;

  const searchCriterias = [
    { criteria: "Mot-clé", value: keyword },
    { criteria: "Categorie", value: category },
    { criteria: "Ville", value: city },
  ].filter((e) => {
    return !(e.value == "" || e.value == undefined);
  });

  const [offset, setOffset] = useState(0);

  const limit = 8;
  const [{ data: dataMe, fetching: fetchingMe }] = useMeQuery();
  const [{ data, fetching }] = useSearchSkillsQuery({
    variables: {
      keyword: keyword as string,
      city: city as string,
      category: category as string,
      orderBy: orderBy as string,
      limit: limit,
      skip: offset,
    },
  });

  return (
    <Layout>
      <Head>
        <title>Resultats de recherche</title>
      </Head>
      <Box py={"20"}>
        <Flex
          bgColor={"alphaWhite"}
          flexDirection={"row"}
          mx={"auto"}
          maxW={"1400"}
        >
          <Breadcrumb
            m={4}
            spacing="8px"
            separator={<ChevronRightIcon color="gray.500" />}
          >
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="/search">Rechercher</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink
                href={`/search/result?category=${category}&city=&keyword=&orderBy=rating`}
              >
                {"Résultats"}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Flex>
        <Box
          // display={"none"}
          dir={"column"}
          bg={"betaWhite"}
          p={"8"}
          mx={"auto"}
          maxW={"1400"}
          fontWeight={"bold"}
          fontSize={"2xl"}
        >
          Resultats pour
          {searchCriterias.map((c, idx) => {
            return (
              <Flex ml={8} align={"center"} flexDirection={"row"} key={idx}>
                <Box fontWeight={"semibold"} fontSize={"2xl"}>
                  {c.criteria}:
                </Box>
                <Box ml={2} fontWeight={"semibold"} fontSize={"xl"}>
                  {translateCategory(c.value as string)}
                </Box>
              </Flex>
            );
          })}
        </Box>
        <Box bgColor={"alpha"} mx={"auto"} maxW={"1400"}>
          <NewSearchField
            initialValues={{ category: category, city: city, keyword: keyword }}
            fn={() => {
              setOffset(0);
            }}
          />
        </Box>
        <Flex mx={"auto"} maxW={"1400"} py={4} bg={"betaWhite"}>
          <Flex flexDir={"row"}>
            <Box align={"center"} pl={6} _hover={{ cursor: "pointer" }}>
              <Box fontWeight={"semibold"} mt={"2"}>
                Trier par :
              </Box>
            </Box>
            <Box ml={"4"}>
              <ButtonGroup variant="outline" spacing="6">
                <Button
                  colorScheme={"black"}
                  onClick={async () => {
                    setOffset(0);
                    router.push({
                      pathname: "/search/result",
                      query: {
                        category: category,
                        city: city,
                        keyword: keyword,
                        orderBy: "rating",
                      },
                    });
                  }}
                >
                  Cote
                </Button>
              </ButtonGroup>
            </Box>
            <Box ml={"4"}>
              <ButtonGroup variant="outline" spacing="6">
                <Button
                  colorScheme={"black"}
                  onClick={async () => {
                    setOffset(0);
                    router.push({
                      pathname: "/search/result",
                      query: {
                        category: category,
                        city: city,
                        keyword: keyword,
                        orderBy: "delivery time",
                      },
                    });
                  }}
                >
                  Durée de livraison
                </Button>
              </ButtonGroup>
            </Box>
            <Box ml={"4"}>
              <ButtonGroup variant="outline" spacing="6">
                <Button
                  colorScheme={"black"}
                  onClick={async (values) => {
                    setOffset(0);
                    router.push({
                      pathname: "/search/result",
                      query: {
                        category: category,
                        city: city,
                        keyword: keyword,
                        orderBy: "pricing",
                      },
                    });
                  }}
                >
                  Prix
                </Button>
              </ButtonGroup>
            </Box>
          </Flex>
        </Flex>
        <Divider mx={"auto"} maxW={"1400"} variant={"solid"} />

        <Flex
          px={4}
          flexDir={"row"}
          bg={"betaWhite"}
          mx={"auto"}
          maxW={"1400"}
          wrap={"wrap"}
          pb={"10"}
        >
          <Flex
            w={{ base: 300, md: 600, lg: 1200 }}
            mx={"auto"}
            maxW={"1200"}
            wrap={"wrap"}
          >
            {!data?.searchSkills.length ? (
              <Box fontSize={"lg"} fontWeight={"semibold"} py={"24"}>
                {"Il n'y a pas de skill disponible pour votre recherche :("}{" "}
              </Box>
            ) : (
              data.searchSkills.map((s: any) => (
                <Box mx={2}>
                  <UserCard key={s.id} skill={s} user={dataMe?.me} />
                </Box>
              ))
            )}
          </Flex>
        </Flex>
        {data?.searchSkills.length! !== offset + limit ||
        data?.searchSkills.length! < limit ? null : (
          <Flex bg={"white"} maxW={"1400"} mx={"auto"}>
            <Button
              bgColor="alpha"
              variant="solid"
              mx={"auto"}
              my={8}
              isLoading={fetching}
              onClick={() => {
                setOffset(offset + limit);
              }}
            >
              Load more
            </Button>
          </Flex>
        )}
        <Box maxW={"1400"} mx={"auto"}>
          <Box bg={"white"} py={"10"}></Box>
          <CategoryCards />
        </Box>
      </Box>
    </Layout>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(Result);

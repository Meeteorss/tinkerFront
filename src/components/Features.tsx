import React from "react";
import { Box, Flex, List, ListItem, ListIcon, Button } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/router";

const Features = () => {
  const router = useRouter();
  return (
    <Box bgColor={"alphaWhite"} w={"full"} py={10}>
      <Flex
        justify={"space-between"}
        maxW={"1200"}
        mx={"auto"}
        flexDirection={{ base: "column", sm: "row" }}
      >
        <Flex
          shadow={"lg"}
          rounded={"md"}
          bgColor={"beta"}
          py={8}
          px={8}
          flexDirection={"column"}
        >
          <Box
            mb={10}
            fontFamily={"heading"}
            fontSize={"4xl"}
            fontWeight={600}
            textAlign={"center"}
          >
            Vous Cherchez des talents ?
          </Box>

          <List spacing={5}>
            <ListItem>
              <Flex flexDirection={"row"}>
                <ListIcon mt={1} as={FaCheckCircle} color="alphaBlue" />
                <Box>
                  Trouvez Les meilleur talents grâce aux avis et évaluations des
                  autres clients.
                </Box>
              </Flex>
            </ListItem>
            <ListItem>
              <Flex flexDirection={"row"}>
                <ListIcon mt={1} as={FaCheckCircle} color="alphaBlue" />
                <Box>Trouvez des services pour tous les budgets.</Box>
              </Flex>
            </ListItem>
            <ListItem>
              <Flex flexDirection={"row"}>
                <ListIcon mt={1} as={FaCheckCircle} color="alphaBlue" />
                <Box>Trouvez des talents de toute categorie.</Box>
              </Flex>
            </ListItem>
          </List>
          <Box mt={10} display={"flex"} justifyContent={"center"} w={"full"}>
            <Button
              w={"3xs"}
              bgColor={"alphaBlue"}
              color={"white"}
              _hover={{ bgColor: "blue.800" }}
              onClick={async () => {
                router.push({
                  pathname: "/search",
                });
              }}
            >
              Rechercher un talent
            </Button>
          </Box>
        </Flex>
        <Box
          mx={{ base: 0, sm: 8 }}
          border={"2px"}
          minH={{ base: "0", sm: "full" }}
          minW={{ base: "full", sm: "0" }}
          bgColor={"gray.700"}
          borderColor={"gray.700"}
        ></Box>
        <Flex
          shadow={"lg"}
          rounded={"md"}
          bgColor={"beta"}
          py={8}
          px={8}
          flexDirection={"column"}
        >
          <Box
            textAlign={"center"}
            mb={10}
            fontFamily={"heading"}
            fontSize={"4xl"}
            fontWeight={600}
          >
            Vous avez un talent ?
          </Box>
          <List spacing={5}>
            <ListItem>
              <Flex flexDirection={"row"}>
                <ListIcon mt={1} as={FaCheckCircle} color="alphaBlue" />
                <Box>
                  Montrez vos talents et trouvez des clients qui en ont besoin.
                </Box>
              </Flex>
            </ListItem>
            <ListItem>
              <Flex flexDirection={"row"}>
                <ListIcon mt={1} as={FaCheckCircle} color="alphaBlue" />
                <Box>
                  Rejoignez un réseau de Freelancers marocains dans tous les
                  domains.
                </Box>
              </Flex>
            </ListItem>
            <ListItem>
              <Flex flexDirection={"row"}>
                <ListIcon mt={1} as={FaCheckCircle} color="alphaBlue" />
                <Box>
                  Proposez un travail de qualité et grimpez le classement.
                </Box>
              </Flex>
            </ListItem>
          </List>
          <Box mt={10} display={"flex"} justifyContent={"center"} w={"full"}>
            <Button
              w={"3xs"}
              bgColor={"alphaBlue"}
              color={"white"}
              _hover={{ bgColor: "blue.800" }}
              onClick={async () => {
                router.push({
                  pathname: "/become_pro",
                });
              }}
            >
              Inscrivez-vous gratuitement
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};
export default Features;

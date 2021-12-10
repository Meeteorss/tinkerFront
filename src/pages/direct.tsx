import { ApolloProvider } from "@apollo/client";
import { ChatIcon } from "@chakra-ui/icons";
import { Box, Flex } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import ChatNavbar from "../components/ChatComponents/ChatNavbar";
import ChatSidebar from "../components/ChatComponents/ChatSidebar";

import { client } from "../utils/createAplloClient";

const direct = () => {
  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Tinker | Direct</title>
      </Head>
      <Box pb={10} bgColor={"alpha"}>
        <ChatNavbar />
        <Flex
          flexDirection={"row"}
          mt={10}
          bg={"white"}
          mx={"auto"}
          h={"700"}
          maxW={"800"}
        >
          <ChatSidebar id={""} />
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            w={"full"}
            h={"full"}
          >
            <Flex
              textAlign={"center"}
              flexDirection={"column"}
              boxSize={"fit-content"}
              mx={"auto"}
            >
              <ChatIcon mx={"auto"} boxSize={"8em"} />
              <Box fontWeight={"semibold"} fontSize={"xl"} mt={4}>
                Vos messages
              </Box>
              <Box mt={4}>Envoyez des message privés</Box>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </ApolloProvider>
  );
};

export default direct;

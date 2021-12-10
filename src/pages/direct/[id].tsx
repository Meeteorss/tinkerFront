import { Box, effect, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { ApolloProvider, gql, useMutation, useQuery } from "@apollo/client";
import { client } from "../../utils/createAplloClient";
import ChatSidebar from "../../components/ChatComponents/ChatSidebar";
import ChatFeed from "../../components/ChatComponents/ChatFeed";
import InputArea from "../../components/ChatComponents/InputArea";
import ChatNavbar from "../../components/ChatComponents/ChatNavbar";

const ME = gql`
  query me {
    me {
      id
      firstName
      lastName
      userName
      email
      isWorker
      confirmed
      likesIds
    }
  }
`;

const VIEW_MESSAGE = gql`
  mutation ViewMessage($otherId: String!) {
    viewMessage(otherId: $otherId)
  }
`;
const chat = () => {
  const router = useRouter();
  let { id } = router.query;
  if (!id) {
    id = router.asPath.split("direct/")[1];
  }
  const {
    loading: loadingMe,
    error: errorMe,
    data: dataMe,
  } = useQuery(ME, { client: client });
  if (!dataMe?.me && !loadingMe) {
    router.push("/");
  }
  const [viewMessage] = useMutation(VIEW_MESSAGE, {
    client: client,
  });
  useEffect(() => {
    viewMessage({ variables: { otherId: id } });
  }, [viewMessage]);

  // console.log("me", dataMe?.me);

  return (
    <ApolloProvider client={client}>
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
          <ChatSidebar id={id as string} />
          <Flex w={"full"} flexDirection={"column"}>
            <ChatFeed otherId={id as string} />
            <InputArea recieverId={id as string} />
          </Flex>
        </Flex>
      </Box>
    </ApolloProvider>
  );
};

export default chat;

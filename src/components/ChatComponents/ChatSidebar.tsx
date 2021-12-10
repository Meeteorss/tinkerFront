import { gql, useQuery } from "@apollo/client";
import { Flex, Text } from "@chakra-ui/layout";
import router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { formatTime, formatTime2 } from "../../utils/formatTime";
import { isServer } from "../../utils/isServer";

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

const GET_CONVERSATIONS = gql`
  query GetConversations {
    getConversations {
      id
      senderId
      recieverId
      sender
      reciever
      message
      createdAt
    }
  }
`;

const CHATS_SUBSCRIPTION = gql`
  subscription MessageSent {
    messageSent {
      id
      senderId
      recieverId
      sender
      reciever
      message
    }
  }
`;

const ChatSidebar = ({ id }: { id: string }) => {
  const router = useRouter();
  const { loading, error, data, subscribeToMore } = useQuery(GET_CONVERSATIONS);
  const { loading: loadingMe, error: errorMe, data: dataMe } = useQuery(ME);

  const myId = dataMe?.me?.id;

  // const { id } = router.query

  useEffect(() => {
    subscribeToMore({
      document: CHATS_SUBSCRIPTION,
      // variables: { otherId: recieverId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newChat = subscriptionData.data.messageSent;

        return {
          getConversations: [...prev.getConversations, newChat],
        };
      },
    });
  }, []);
  if (error) return <p>`Error! ${error.message}`</p>;
  if (loading) return <p>"Loading...";</p>;
  if (loadingMe) return <p>"Loading...";</p>;

  if (errorMe) return <p>`Error! ${errorMe.message}`</p>;
  return (
    <Flex
      py={10}
      bgColor={"gray.50"}
      flexDirection={"column"}
      maxW={"300"}
      minW={"200"}
      h={"full"}
    >
      {data.getConversations.map((convo: any) => {
        return (
          <Flex
            px={5}
            py={3}
            bgColor={
              id == convo.senderId || id == convo.recieverId
                ? "beta"
                : "gray.50"
            }
            _hover={{ bgColor: "gray.100", cursor: "pointer" }}
            key={convo.id}
            flexDirection={"column"}
            onClick={() => {
              router.push({
                pathname: "/direct/[id]",
                query: {
                  id:
                    convo.senderId == myId ? convo.recieverId : convo.senderId,
                },
              });
            }}
          >
            <Flex align={"center"} flexDirection={"row"}>
              <Text fontSize={"md"} fontWeight={"semibold"}>
                {convo.senderId == myId ? convo.reciever : convo.sender}
              </Text>
              <Text fontSize={"xs"} ml={2} fontWeight={"thin"}>
                {isNaN(convo.createdAt)
                  ? formatTime(new Date(convo.createdAt))
                  : formatTime(new Date(parseInt(convo.createdAt)))}
              </Text>
            </Flex>
            <Flex flexDirection={"row"}>
              <Text fontWeight={"semibold"}>
                {convo.senderId == myId ? "Me :" : ""}
              </Text>
              <Text ml={1}>
                {convo.message!.length > 30
                  ? convo.message!.slice(0, 25) + " ..."
                  : convo.message}{" "}
              </Text>
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
};
export default ChatSidebar;

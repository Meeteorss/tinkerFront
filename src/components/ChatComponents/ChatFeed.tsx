import { gql, useMutation, useQuery } from "@apollo/client";
import { Box, Flex, Stack } from "@chakra-ui/layout";
import { Button, Tooltip } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import Head from "next/head";
import React, { useEffect } from "react";
import ScrollableFeed from "react-scrollable-feed";
import { client } from "../../utils/createAplloClient";
import { formatTime } from "../../utils/formatTime";
import InputField from "../Fields/InputField";

const GET_CONVERSATION = gql`
  query GetConversation($otherId: String!) {
    getConversation(otherId: $otherId) {
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
// const VIEW_MESSAGE = gql`
//   mutation ViewMessage($otherId: String!) {
//     viewMessage(otherId: $otherId)
//   }
// `;

const ChatFeed = ({ otherId }: { otherId: string }) => {
  const { loading, error, data, subscribeToMore } = useQuery(GET_CONVERSATION, {
    variables: { otherId: otherId },
  });

  useEffect(() => {
    subscribeToMore({
      document: CHATS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newChat = subscriptionData.data.messageSent;
        return {
          getConversation: [...prev.getConversation, newChat],
        };
      },
    });
  }, []);

  if (loading) return <p>"Loading...";</p>;
  if (error) return <p>`Error! ${error.message}`</p>;
  return (
    <>
      <Head>
        <title>
          {/* {"Direct: "}
          {data.getConversation[0].senderId == otherId
            ? data.getConversation[0].sender
            : data.getConversation[0].reciever} */}
          Tinker | Direct
        </title>
      </Head>
      <Box h={"700"} w={"full"} px={4} py={12}>
        <Flex maxH={"500"} flexDirection={"column"}>
          <ScrollableFeed forceScroll={true}>
            {data?.getConversation.map((msg: any) => {
              return (
                <Flex
                  // maxW={"32"}
                  px={4}
                  key={msg.id}
                  w={"full"}
                  flexDirection={"column"}
                  align={msg.senderId == otherId ? "start" : "end"}
                >
                  <Tooltip
                    placement={msg.senderId == otherId ? "right" : "left"}
                    fontSize={"sm"}
                    fontWeight={"thin"}
                    label={
                      isNaN(msg.createdAt)
                        ? formatTime(new Date(msg.createdAt))
                        : formatTime(new Date(parseInt(msg.createdAt)))
                    }
                  >
                    <Flex
                      maxW={"72"}
                      my={2}
                      rounded={"lg"}
                      p={2}
                      w={"fit-content"}
                      color={"white"}
                      bgColor={
                        msg.senderId == otherId ? "gray.400" : "blue.500"
                      }
                      // ml={msg.senderId == otherId ? "0" : "auto"}
                      // textAlign={msg.senderId == otherId ? "start" : "end"}
                    >
                      {msg.message}
                    </Flex>
                  </Tooltip>
                </Flex>
              );
            })}
          </ScrollableFeed>
        </Flex>
      </Box>
    </>
  );
};
export default ChatFeed;

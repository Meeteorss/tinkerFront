import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import ContactPopup from "../ContactPopup";
import { Rating } from "./userCard";

export const ProfileCard = ({
  worker,
  state,
}: {
  worker: any;
  state: boolean;
}) => {
  const createdAt = new Date(worker.createdAt);
  return (
    <Center w={"350px"} minW={"350px"} maxW={"350px"}>
      <Box
        maxW={"350px"}
        w={"full"}
        bg={"white"}
        boxShadow={"md"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Box h={"120px"} w={"full"} bgColor={"beta"} />
        <Flex justify={"center"} mt={-16}>
          <Avatar
            size={"2xl"}
            src={worker.profilePicture}
            alt={worker.userName}
            css={{
              border: "2px solid white",
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={"center"} mb={5}>
            <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
              {worker.userName}
            </Heading>
            {/* <Text color={"gray.500"}>Frontend Developer</Text> */}
          </Stack>

          <Stack direction={"row"} justify={"center"} spacing={6}>
            <Rating rating={worker.rating} numReviews={worker.ratingsNumber} />
          </Stack>
          <Stack mt={4} direction={"row"} justify={"center"} spacing={6}>
            <ContactPopup worker={worker} state={state} />
          </Stack>
        </Box>
        <Flex bgColor={"beta"} p={6} flexDirection={"column"}>
          <Flex justify={"space-between"} flexDirection={"row"}>
            <Box color={"gray.700"} fontWeight={"semibold"}>
              Zone d'activité
            </Box>
            <Box color={"gray.700"} fontWeight={"semibold"}>
              {worker.city}
            </Box>
          </Flex>
          <Flex mt={6} justify={"space-between"} flexDirection={"row"}>
            <Box color={"gray.700"} fontWeight={"semibold"}>
              Membre depuis
            </Box>
            <Box color={"gray.700"} fontWeight={"semibold"}>
              {createdAt.toLocaleDateString("fr-FR")}
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Center>
  );
};

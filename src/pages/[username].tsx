import { Avatar } from "@chakra-ui/avatar";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Divider, Flex } from "@chakra-ui/layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ProfileCard } from "../components/Cards/ProfileCard";

import UserCard from "../components/Cards/userCard";
import InputField from "../components/Fields/InputField";
import { Layout } from "../components/Layout";
import {
  useCommentMutation,
  useCommentsByWorkerQuery,
  useGetSkillsQuery,
  useMeQuery,
  useWorkerByUsernameQuery,
  useWorkerPageQueryQuery,
} from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { formatTime } from "../utils/formatTime";

const Username = () => {
  const router = useRouter();

  const { username } = router.query;
  const [{ data: dataMe }] = useMeQuery();
  const [{ data: DATA, fetching: FETCHING }] = useWorkerPageQueryQuery({
    variables: { username: username as string },
  });
  // const [{ data: dataW, fetching: fetchingW }] = useWorkerByUsernameQuery({
  //   variables: { username: username as string },
  // });

  // const [{ data, fetching }] = useGetSkillsQuery({
  //   variables: { workerId: dataW?.workerByUsername?.id as string },
  // });
  const [, comment] = useCommentMutation();
  const [commentOffset, setCommentOffset] = useState(0);
  const commentlimit = 5;
  const [{ data: comments, fetching: fetchingC }] = useCommentsByWorkerQuery({
    variables: {
      worker: username as string,
      limit: commentlimit,
      skip: commentOffset,
    },
  });
  const worker = DATA?.workerPageQuery.worker;
  const skills = DATA?.workerPageQuery.skills;
  if (FETCHING) {
    return <Box>Loading...</Box>;
  }
  if (!DATA) {
    return <Box>Error no data</Box>;
  }
  // if (!dataW) {
  //   return <Box>404 not found</Box>;
  // }
  // if (!data && !fetching) {
  //   return <Box>404 not found</Box>;
  // }

  // if (!worker && !fetching) {
  //   return <Box>404 not found</Box>;
  // }
  if (!worker) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
        pos={"relative"}
        top={"50%"}
        left={"50%"}
      />
    );
  }

  return (
    <Layout>
      <Head>
        <title>{worker.userName}</title>
      </Head>
      <Box mt={"16"} mx={"auto"} maxW={"1400"}>
        <Flex bg={"white"} flexDirection={"row"}>
          <Breadcrumb
            m={4}
            spacing="8px"
            separator={<ChevronRightIcon color="gray.500" />}
          >
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href={`http://localhost:3000/${worker.userName}`}>
                {worker.userName}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Flex>
        <Divider />
        <Flex
          mb={"4"}
          px={5}
          py={20}
          bg={"white"}
          w={"full"}
          flexDirection={"column"}
        >
          <Flex flexDirection={{ base: "column", md: "row" }}>
            <Box px={"16"}>
              <ProfileCard worker={worker} state={!dataMe?.me ? false : true} />
            </Box>

            <Flex
              mt={{ base: 10, md: 0 }}
              px={{ base: "16", md: "8" }}
              flexDirection={"column"}
            >
              <Box fontWeight={"bold"} fontSize={"2xl"}>
                A propos de {worker.userName}
              </Box>
              <Box w={"full"} mt={10} fontWeight={"normal"} fontSize={"lg"}>
                {worker.description}
              </Box>
            </Flex>
          </Flex>

          <Flex
            p={"16"}
            rounded={"lg"}
            // bg={"beta"}
            height={"fit-content"}
            flexDirection={"column"}
          >
            <Box fontWeight={"bold"} fontSize={"2xl"}>
              Les skills de {worker.userName}
            </Box>
            <Flex wrap={"wrap"} bg={"white"}>
              {!skills?.length ? (
                <Box>
                  {" "}
                  {worker.userName} n'a pas de skill actif en ce moment.{" "}
                </Box>
              ) : (
                skills.map((s: any) => (
                  <Box mr={4}>
                    <UserCard key={s.id} skill={s} user={dataMe?.me} />
                  </Box>
                ))
              )}
            </Flex>
            <Flex
              flexDirection={{ base: "column", sm: "row" }}
              rounded={"lg"}
              //   ml={"auto"}
              mt={"20"}
              mb={5}
              fontWeight={"bold"}
              fontSize={"2xl"}
              w={600}
              maxW={600}
            >
              <Box>Ce que les gens pensent de </Box>
              <Box ml={{ base: 0, sm: 2 }}> {worker.userName}</Box>
            </Flex>
            <Box
              as={Divider}
              bg={"alpha"}
              h={"2px"}
              maxW={600}
              color={"alpha"}
            />

            {comments?.commentsByWorker?.map((comment: any, index: number) => {
              console.log("comments", comments.commentsByWorker);

              return (
                <Box key={index}>
                  <Flex rounded={"sm"} maxW={600} p={2} flexDir={"row"}>
                    <Avatar
                      my={"auto"}
                      src={`https://projecta-profile-pictures.s3.amazonaws.com/profilepic/${comment.userId}.jpg`}
                      name={comment.author}
                      //   bg={user.profilePicture && "transparent"}
                    />
                    <Flex
                      rounded={"md"}
                      ml={4}
                      p={2}
                      w={"full"}
                      bg={"white"}
                      flexDir={"column"}
                    >
                      <Flex flexDir={"row"}>
                        <Box mr={3} fontWeight={"semibold"}>
                          {comment.author}
                        </Box>
                        <Box mt={"auto"} fontSize={"sm"} fontWeight={"thin"}>
                          {comment.createdAt == comment.updatedAt
                            ? formatTime(comment.createdAt)
                            : formatTime(comment.updatedAt)}
                        </Box>
                      </Flex>
                      <Box maxW={"fit-content"} mt={1}>
                        {comment.content}
                      </Box>
                    </Flex>
                  </Flex>
                  <Box
                    as={Divider}
                    bg={"alpha"}
                    h={"2px"}
                    maxW={600}
                    color={"alpha"}
                  />
                </Box>
              );
            })}
            {/* {comments?.commentsByWorker.length! !==
              commentOffset + commentlimit ||
            comments?.commentsByWorker.length! < commentlimit ? (
              <Flex pt={8} bg={"white"} maxW={"1200"} mx={"auto"}></Flex>
            ) : (
              <Flex maxW={"1200"} mx={"auto"}>
                <Button
                  bgColor="alpha"
                  variant="solid"
                  mx={"auto"}
                  my={8}
                  isLoading={fetching}
                  onClick={() => {
                    setCommentOffset(commentOffset + commentlimit);
                  }}
                >
                  Load more comments
                </Button>
              </Flex>
            )} */}
          </Flex>
        </Flex>
      </Box>
    </Layout>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(Username);

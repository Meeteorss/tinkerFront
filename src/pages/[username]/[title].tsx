import { Avatar } from "@chakra-ui/avatar";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Divider, Flex, Link } from "@chakra-ui/layout";
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
import React, { useEffect, useState } from "react";

import UserCard, { Rating } from "../../components/Cards/userCard";
import Carousel from "../../components/Carousel";
import Feedback from "../../components/Feedback/FeedBack";
import InputField from "../../components/Fields/InputField";
import { ImageSlider } from "../../components/ImageSlider";
import { Layout } from "../../components/Layout";
import { PreviewCard } from "../../components/PreviewCard/PreviewCard";
import {
  useCommentMutation,
  useCommentsBySkillQuery,
  useGetSkillByTitleQuery,
  useMeQuery,
  useSkillPageQueryQuery,
  useWorkerByIdQuery,
  useWorkerByUsernameQuery,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { formatTime } from "../../utils/formatTime";
import { translateCategory } from "../../utils/translate";

const Skill = () => {
  const router = useRouter();

  const { username, title } = router.query;

  // const [{ data: dataW, fetching: fetchingW }] = useWorkerByUsernameQuery({
  //   variables: { username: username as string },
  // });
  // const [workerId, setWorkerId] = useState("");
  // useEffect(() => {
  //   if (!fetchingW) {
  //     setWorkerId(dataW?.workerByUsername?.id as string);
  //   }
  // }, [fetchingW, dataW]);

  // const [{ data, fetching }] = useGetSkillByTitleQuery({
  //   variables: {
  //     title: title as string,
  //     workerId: workerId,
  //   },
  // });

  const [{ data: DATA, fetching: FETCHING }] = useSkillPageQueryQuery({
    variables: { username: username as string, title: title as string },
  });
  const [{ data, fetching }] = useMeQuery();

  // const [{ data: dataW, fetching: fetchingW }] = useWorkerByIdQuery({
  //   variables: { workerByIdId: id as string },
  // });
  // const [skillId, setSkillId] = useState("");
  // useEffect(() => {
  //   if (!fetching) {
  //     setSkillId(data?.getSkillByTitle?.id as string);
  //   }
  // }, [fetching, data]);
  const [, comment] = useCommentMutation();
  const [commentOffset, setCommentOffset] = useState(0);
  const commentlimit = 5;

  const [{ data: comments, fetching: fetchingC }] = useCommentsBySkillQuery({
    variables: {
      title: title as string,
      worker: username as string,
      limit: commentlimit,
      skip: commentOffset,
    },
  });
  if (FETCHING) {
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
  const skill = DATA?.skillPageQuery?.skill;
  const worker = DATA?.skillPageQuery?.worker;
  const skills = DATA?.skillPageQuery?.otherSkills;

  // if (!data && !fetching) {
  //   return <Box>404 not found</Box>;
  // }
  if (skill == null || skill == undefined) {
    return <Box>404 not found!</Box>;
  }

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
        <title>{skill.title}</title>
      </Head>
      <Box bg={"white"} my={"16"} mx={"auto"} maxW={"1400"}>
        <Flex flexDirection={"row"}>
          <Breadcrumb
            m={4}
            spacing="8px"
            separator={<ChevronRightIcon color="gray.500" />}
          >
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/search/result?category=${skill.category}&city=&keyword=&orderBy=rating`}
              >
                {translateCategory(skill.category as string)}
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink>{skill.worker}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Flex>
        <Divider />
        <Flex
          mb={"4"}
          p={10}
          bg={"white"}
          justify={"space-between"}
          w={"full"}
          flexDirection={{ base: "column", lg: "row" }}
        >
          <Flex flexDirection={"column"}>
            <Box mt={2} mb={6} fontSize={"3xl"} fontWeight={"bold"}>
              {skill.title}
            </Box>
            <Flex mb={8} align={"center"} flexDirection={"row"}>
              <Avatar mr={5} src={skill.workerPicUrl as string} />
              <Flex flexDirection={"column"}>
                <Box
                  w={"fit-content"}
                  as={Link}
                  fontSize={"md"}
                  fontWeight={"semibold"}
                  onClick={() => {
                    router.push({
                      pathname: "/[username]",
                      query: { username: worker.userName },
                    });
                  }}
                >
                  {skill.worker}
                </Box>
                <Box fontSize={"md"}>
                  {translateCategory(skill.category as string)}
                </Box>
                <Flex flexDirection={"row"}>
                  <Rating
                    rating={skill.rating}
                    numReviews={skill.ratingsNumber}
                  />
                  <Feedback skill={skill} worker={worker} />
                </Flex>
              </Flex>
            </Flex>
            {/* <ImageSlider
              images={skill.pictures ? skill.pictures : ["", "", "", ""]}
              width={700}
              height={400}
            /> */}
            <Carousel
              images={skill.pictures ? skill.pictures : ["", "", "", ""]}
              height={{ base: 280, lg: 440 }}
              width={{ base: 400, sm: 500, md: 600, xl: 700 }}
            />
            <Box mt={10} fontWeight={"bold"} fontSize={"3xl"}>
              A propos de ce Skill
            </Box>
            <Box maxW={500} mt={10} fontWeight={"normal"} fontSize={"lg"}>
              {skill.description}
            </Box>
          </Flex>

          <Flex
            ml={5}
            w={{ base: "80%", sm: "80%", lg: "40%" }}
            rounded={"lg"}
            bg={"white"}
            height={"fit-content"}
            flexDirection={"column"}
          >
            <PreviewCard skill={skill} worker={worker} />

            {/* <Avatar
                src={`https://projecta-profile-pictures.s3.amazonaws.com/profilepic/${dataMe?.me?.profilePicture}.jpg`}
                name={worker.userName}
              /> */}
            <Flex py={2} px={4} align={"start"} flexDirection={"row"}>
              <Box rounded={"lg"} fontWeight={"semibold"} fontSize={"xl"}>
                Ce que les gens pensent de
              </Box>
              <Box ml={2} rounded={"lg"} fontWeight={"bold"} fontSize={"xl"}>
                {skill.worker}
              </Box>
            </Flex>
            <Flex
              bg={"beta"}
              rounded={"lg"}
              roundedBottom={"none"}
              px={4}
              py={4}
              flexDir={"row"}
              w={"full"}
              flexDirection={"row"}
            >
              <Box w={"full"}>
                <Formik
                  initialValues={{ content: "" }}
                  onSubmit={async (values) => {
                    const response = await comment({
                      content: values.content,
                      skillId: skill.id,
                    });

                    router.reload();
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <Box rounded={"md"} bg={"white"}>
                        <InputField
                          hideLabel
                          commentarea
                          name="content"
                          placeholder="Votre commentaire..."
                        />
                      </Box>

                      <Flex mt={3} bg={"beta"} justify={"space-between"}>
                        <Box></Box>
                        <Button
                          isLoading={isSubmitting}
                          type={"submit"}
                          color={"white"}
                          bgColor={"alphaBlue"}
                          variant={"solid"}
                          _hover={{ bgColor: "blue.900" }}
                        >
                          Commenter
                        </Button>
                      </Flex>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Flex>

            <Box mb={2} as={Divider} bg={"alpha"} h={"1px"} w={"full"}></Box>
            <Box roundedBottom={"lg"} bg={"beta"}>
              {comments?.commentsBySkill?.map((comment: any, index: number) => (
                <Box key={index}>
                  <Flex p={2} flexDir={"row"}>
                    <Avatar
                      my={"auto"}
                      src={`https://projecta-profile-pictures.s3.amazonaws.com/profilepic/${comment.userId}.jpg`}
                      name={comment.author}
                      bg={"gray.400"}
                    />
                    <Flex
                      rounded={"sm"}
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
                </Box>
              ))}
            </Box>
            {comments?.commentsBySkill.length! !==
              commentOffset + commentlimit ||
            comments?.commentsBySkill.length! < commentlimit ? (
              <Flex pt={8} bg={"white"} maxW={"1200"} mx={"auto"}></Flex>
            ) : (
              <Flex maxW={"1200"} mx={"auto"}>
                <Button
                  bgColor="alpha"
                  variant="solid"
                  mx={"auto"}
                  my={8}
                  isLoading={fetchingC}
                  onClick={() => {
                    setCommentOffset(commentOffset + commentlimit);
                  }}
                >
                  Load more comments
                </Button>
              </Flex>
            )}
          </Flex>
        </Flex>
        <Flex flexDirection={"column"} px={10} pb={10}>
          <Box mt={10} fontWeight={"bold"} fontSize={"3xl"}>
            Autre Skills de {worker.userName}
          </Box>
          <Flex
            rounded={"lg"}
            // bg={"beta"}
            height={"fit-content"}
            flexDirection={"row"}
          >
            <Flex wrap={"wrap"} bg={"white"}>
              {!skills?.length ? (
                <Box> {worker.userName} didn't posted any skill yet. </Box>
              ) : (
                skills.map((s: any) => (
                  <Box mr={4}>
                    <UserCard key={s.id} skill={s} user={data?.me} />
                  </Box>
                ))
              )}
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Layout>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(Skill);

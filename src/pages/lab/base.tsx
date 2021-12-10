import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Link,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import router from "next/router";
import React from "react";
import Carousel from "../../components/Carousel";
import {
  useDeleteSkillPicsMutation,
  useDeleteUserProfilePicMutation,
  useGetAllSkillsQuery,
  useGetAllUsersQuery,
  useGetAllWorkersQuery,
  useGetCurrentAdminQuery,
  useHideSkillMutation,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";

const base = () => {
  const [{ data, fetching }] = useGetCurrentAdminQuery();
  const [{ data: users, fetching: fetchingU }] = useGetAllUsersQuery();
  const [{ data: workers, fetching: fetchingW }] = useGetAllWorkersQuery();
  const [{ data: skills, fetching: fetchingS }] = useGetAllSkillsQuery();
  const [, hideSkill] = useHideSkillMutation();
  const [, deleteSkillPic] = useDeleteSkillPicsMutation();
  const [, deleteUserProfilePic] = useDeleteUserProfilePicMutation();
  if (fetchingS || fetchingU || fetchingW) {
    return <div>Error 404 not found</div>;
  }

  const zip = (array1: any, array2: any, array3: any) =>
    array1.map((e: any, idx: number) => [e, array2[idx], array3[idx]]);

  if (fetching) {
    return <div>Error 404 not found</div>;
  }
  if (!fetching && !data?.getCurrentAdmin) {
    return <div>Error 404 not found</div>;
  }

  return (
    <Flex
      py={"16"}
      flexDirection={"column"}
      justifyContent={"center"}
      align={"center"}
    >
      <Flex fontWeight={"semibold"} fontSize={"2xl"}>
        Playground
      </Flex>
      <Tabs w={"1200px"}>
        <TabList w={"full"}>
          <Tab w={"33%"}>Users</Tab>
          <Tab w={"33%"}>Workers</Tab>
          <Tab w={"33%"}>Skills</Tab>
        </TabList>

        {zip(
          users?.getAllUsers,
          workers?.getAllWorkers,
          skills?.getAllSkills
        ).map((e: any, idx: number) => {
          return (
            <TabPanels key={idx}>
              {e[0] && (
                <TabPanel>
                  <Flex align={"center"} flexDirection={"row"}>
                    <Avatar src={e[0].profilePicture}></Avatar>
                    <Box>
                      {e[0].firstName}
                      {" - "}
                      {e[0].lastName}
                      {" - "}
                      {e[0].userName}
                      {" - "}
                      {e[0].email}
                      {" - "}
                      {"isWorker? " + e[0].isWorker}
                    </Box>
                    <Button
                      bgColor={"red.400"}
                      color={"white"}
                      _hover={{ bgColor: "red.500" }}
                      onClick={() => {
                        deleteUserProfilePic({ userId: e[0].id });
                      }}
                    >
                      Delete profile pic
                    </Button>
                  </Flex>
                </TabPanel>
              )}
              {e[1] && (
                <TabPanel>
                  <Flex align={"center"} flexDirection={"row"}>
                    <Avatar src={e[1].profilePicture}></Avatar>
                    <Box>
                      {e[1].firstName}
                      {" - "}
                      {e[1].lastName}
                      {" - "}
                      {e[1].userName}
                      {" - "}
                      {e[1].email}
                      {" - "}
                      {e[1].phone}
                      {" - "}
                      {e[1].description}
                    </Box>
                    <Button
                      bgColor={"red.400"}
                      color={"white"}
                      _hover={{ bgColor: "red.500" }}
                      onClick={() => {
                        deleteUserProfilePic({ userId: e[1].id });
                      }}
                    >
                      Delete profile pic
                    </Button>
                  </Flex>
                </TabPanel>
              )}
              {e[2] && (
                <TabPanel>
                  <Flex align={"center"} flexDirection={"row"}>
                    <Carousel images={e[2].pictures} width={200} height={200} />
                    <Box>
                      {e[2]?.worker}
                      {" - "}
                      {e[2]?.title}
                      {" - "}
                      {e[2].pricing}
                      {" - "}
                      {e[2].duration}
                      {" - "}
                      {e[2].description}
                      {" - "}
                      {e[2].status}
                    </Box>
                    <Button
                      bgColor={"red.400"}
                      color={"white"}
                      _hover={{ bgColor: "red.500" }}
                      onClick={() => {
                        hideSkill({ skillId: e[2].id });
                      }}
                    >
                      Hide skill
                    </Button>
                    <Button
                      bgColor={"red.400"}
                      color={"white"}
                      _hover={{ bgColor: "red.500" }}
                      onClick={() => {
                        deleteSkillPic({ skillId: e[2].id });
                      }}
                    >
                      Delete skill pics
                    </Button>
                  </Flex>
                </TabPanel>
              )}
            </TabPanels>
          );
        })}
      </Tabs>
    </Flex>
  );
};
export default withUrqlClient(createUrqlClient)(base);

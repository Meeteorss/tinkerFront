import { Flex, Divider, Heading, Text, Box } from "@chakra-ui/layout";
import { IconButton, Avatar, Button, Icon } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { FiMenu, FiHome } from "react-icons/fi";
import { NavItem } from "./NavItem";
import { GrLogout } from "react-icons/gr";
import {
  AtSignIcon,
  CalendarIcon,
  EditIcon,
  InfoOutlineIcon,
  LockIcon,
  MoonIcon,
  SettingsIcon,
} from "@chakra-ui/icons";
import { useLogoutMutation } from "../../generated/graphql";

export const SideBar = ({ src, action, worker }: any) => {
  const router = useRouter();
  const [, logout] = useLogoutMutation();

  if (!worker) {
    return <Box>Error?</Box>;
  }
  return (
    <Flex
      flexDir={"column"}
      pt={{ base: 0, sm: 6 }}
      bg={"##fcfcfc"}
      w={{ base: 75, sm: 200 }}
      borderRadius={"none"}
      borderTopLeftRadius={"sm"}
      borderBottomLeftRadius={"sm"}
      justify={"space-between"}
    >
      <Box>
        <Flex
          px={"5%"}
          pb={"5%"}
          flexDir={"column"}
          w={"100%"}
          alignItems={{ base: "center", sm: "flex-start" }}
          mb={4}
        >
          <Flex mt={{ base: "3", md: "0" }} align={"center"}>
            <Avatar size={"sm"} src={src} />
            <Flex
              flexDir={"column"}
              ml={4}
              display={{ base: "none", sm: "flex" }}
            >
              <Heading as={"h3"} size={"sm"}>
                {worker.userName}
              </Heading>
              {/* <Text color={"gray"}>{worker.title}</Text> */}
            </Flex>
          </Flex>
          <Divider mt={4} display={{ base: "none", sm: "flex" }} />
        </Flex>
        <Flex p={"5%"} flexDir={"column"} alignItems={"flex-start"} as={"nav"}>
          {/* <IconButton display={{base:"Flex",sm:"none"}} aria-label={""} bg={"none"} mt={5} _hover={{bg:'none'}} icon={<FiMenu />}  /> */}
          {/* <Box w={"100%"} fontWeight={"semibold"} fontSize={""} ml={8} textAlign={{base:"center",sm:"start"}}>Profile</Box> */}
          <NavItem
            onClick={() =>
              router.push({
                pathname: "/profile",
                query: { id: worker.id, action: "info" },
              })
            }
            title="Informations"
            active={action == "info"}
            icon={InfoOutlineIcon}
          />
          <NavItem
            onClick={() =>
              router.push({
                pathname: "/profile/edit",
                query: { id: worker.id, action: "edit" },
              })
            }
            title="Editer les informations"
            active={action == "edit"}
            icon={SettingsIcon}
          />
          {worker.description ? (
            <NavItem
              onClick={() =>
                router.push({
                  pathname: "/profile/skills",
                  query: { id: worker.id, action: "skills" },
                })
              }
              title="Mes skills"
              active={action == "skills"}
              icon={CalendarIcon}
            />
          ) : null}

          <NavItem
            onClick={() => {
              router.push({
                pathname: "/change_email",
                query: { id: worker.id, action: "change_email" },
              });
            }}
            title="Changer mon Email"
            active={action == "change_email"}
            icon={AtSignIcon}
          />
          <NavItem
            onClick={() => {
              router.push({
                pathname: "/change_password",
                query: { id: worker.id, action: "change_password" },
              });
            }}
            title="Changer le mot de passe"
            active={action == "change_password"}
            icon={LockIcon}
          />
          {/* <NavItem title="My Subscription" /> */}
        </Flex>
      </Box>
      <Flex
        mt={"28"}
        px={"5%"}
        pb={"5%"}
        flexDir={"column"}
        w={"100%"}
        alignItems={{ base: "center", sm: "flex-start" }}
        mb={4}
      >
        <Divider mt={4} display={{ base: "none", sm: "flex" }} />
        <Flex mt={"7"} w={"full"} flexDirection={"row"}>
          <Button
            display={{ base: "none", sm: "flex" }}
            leftIcon={<Icon as={GrLogout} />}
            mx={"auto"}
            color={"Black"}
            bgColor={"white"}
            variant={"solid"}
            border={"1px"}
            borderColor={"black"}
            _hover={{ bgColor: "alphaWhite" }}
            onClick={() => {
              logout();
            }}
          >
            Se déconnecter
          </Button>
          <Box
            mx={"auto"}
            rounded={"md"}
            _hover={{ cursor: "pointer", bgColor: "gray.100" }}
            p={2}
          >
            <Icon
              mx={"auto"}
              display={{ base: "flex", sm: "none" }}
              as={MoonIcon}
              onClick={() => {
                logout();
              }}
            />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

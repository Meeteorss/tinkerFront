import React, { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Divider,
  Image,
  Text,
  Icon,
  Link,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import AuthPopup from "./AuthPopup";
import { IoMdArrowDropdown } from "react-icons/io";
import { useRouter } from "next/router";
import { isServer } from "../utils/isServer";

const Links = ["Dashboard", "Projects", "Team"];

const NavLink = ({ children }: { children: ReactNode }, link: string) => (
  <Link
    px={2}
    py={1}
    rounded={"sm"}
    _hover={{
      textDecoration: "none",
      bg: "gray.100",
    }}
    href={`/${link}`}
  >
    {children}
  </Link>
);

const Navbar = ({ user }: any) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [, logout] = useLogoutMutation();

  return (
    <>
      <Box bg={"white"} px={4}>
        <Flex
          mx={"auto"}
          maxW={"1000"}
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <Flex spacing={8} alignItems={"center"} w={"100%"}>
            <Image
              mr={{ base: "2", md: "10" }}
              borderRadius="full"
              boxSize="50px"
              src="https://www.streamscheme.com/wp-content/uploads/2020/04/pepega.png"
              alt="Logo"
              onClick={() =>
                router.push({
                  pathname: "/",
                })
              }
              _hover={{ cursor: "pointer" }}
            />
            {user ? (
              <Button
                display={{ base: "inline-flex", md: "inline-flex" }}
                fontSize={"md"}
                fontWeight={600}
                borderStyle={"solid"}
                borderColor={useColorModeValue("white", "white")}
                color={"blackAlpha.800"}
                bg={"yellow.400"}
                onClick={async () => {
                  router.push({
                    pathname: "/profile",
                    query: { id: user.id, action: "info" },
                  });
                }}
                _hover={{
                  bg: "blue.900",
                  color: "white",
                }}
              >
                Voir profil
              </Button>
            ) : (
              <Button
                as={"a"}
                display={{ base: "inline-flex", md: "inline-flex" }}
                fontSize={"md"}
                fontWeight={600}
                borderStyle={"solid"}
                borderColor={useColorModeValue("white", "white")}
                color={"blackAlpha.800"}
                bg={"yellow.400"}
                href={"http://localhost:3000/worker/register"}
                _hover={{
                  bg: "blue.900",
                  color: "white",
                }}
              >
                Become a pro
              </Button>
            )}

            <HStack
              pr={"10"}
              ml={"auto"}
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <Link
                px={2}
                py={1}
                rounded={"sm"}
                fontWeight={"500"}
                _hover={{
                  textDecoration: "none",
                  bg: "gray.100",
                }}
                href="/search"
              >
                Search
              </Link>
              <Link
                px={2}
                py={1}
                rounded={"sm"}
                fontWeight={"500"}
                _hover={{
                  textDecoration: "none",
                  bg: "gray.100",
                }}
                href="/pricing"
              >
                Pricing
              </Link>
              <Link
                px={2}
                py={1}
                rounded={"sm"}
                fontWeight={"500"}
                _hover={{
                  textDecoration: "none",
                  bg: "gray.100",
                }}
                href="/guides"
              >
                Guides
              </Link>
            </HStack>
          </Flex>
          {user ? (
            <Flex alignItems={"center"}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"sm"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Flex>
                    <Text>{user.firstName}</Text>
                    <Icon mt={"1"} as={IoMdArrowDropdown} />
                  </Flex>
                </MenuButton>
                <MenuList bg={"white"}>
                  <MenuItem>Link 1</MenuItem>
                  <MenuItem>Link 2</MenuItem>
                  <MenuDivider />
                  <MenuItem
                    onClick={() => {
                      logout();
                    }}
                    ml={"auto"}
                  >
                    Log out
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          ) : (
            <Stack
              flex={{ base: 1, md: 0 }}
              justify={"flex-end"}
              direction={"row"}
              spacing={6}
            >
              <AuthPopup />
              <Button
                as={"a"}
                display={{ base: "inline-flex", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={700}
                borderStyle={"solid"}
                borderColor={useColorModeValue("white", "white")}
                color={"blackAlpha.800"}
                bg={"transparent"}
                href={"http://localhost:3000/register"}
                _hover={{
                  bg: "blue.900",
                  color: "white",
                }}
              >
                Sign Up
              </Button>
            </Stack>
          )}
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
        <Divider mx={"auto"} maxW={"1080"} />
      </Box>
    </>
  );
};
export default Navbar;

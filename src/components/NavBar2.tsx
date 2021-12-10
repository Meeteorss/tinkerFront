import React, { useEffect, useState } from "react";
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
  Stack,
  Image,
  Text,
  Icon,
  Link,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useLogoutMutation, useNavbarQueryQuery } from "../generated/graphql";
import AuthPopup from "./AuthPopup";
import { IoMdArrowDropdown } from "react-icons/io";
import { useRouter } from "next/router";
import { Banner } from "./Banner/Banner";
import { formatTime } from "../utils/formatTime";
import { gql, useQuery } from "@apollo/client";
import { client } from "../utils/createAplloClient";
import { Rating } from "./Cards/profileSkillCard";

const GET_CONVERSATIONS = gql`
  query GetConversations {
    getConversations {
      id
      senderId
      recieverId
      sender
      reciever
      message
      isNew
      senderPic
      recieverPic
      createdAt
    }
  }
`;

const Links = [
  { url: "register", value: "Inscription" },
  { url: "search", value: "Rechercher" },
  { url: "guides", value: "Guides" },
];

const NavLink = ({ url, value }: any) => {
  return (
    <Link
      px={2}
      py={1}
      rounded={"sm"}
      _hover={{
        textDecoration: "none",
        bg: "gray.100",
      }}
      href={`/${url}`}
    >
      {value}
    </Link>
  );
};

const CHATS_SUBSCRIPTION = gql`
  subscription MessageSent {
    messageSent {
      id
      senderId
      recieverId
      isNew
      sender
      reciever
      message
    }
  }
`;
const ChatDropdown = ({ currentUser }: { currentUser: string }) => {
  const router = useRouter();
  const { loading, error, data, subscribeToMore } = useQuery(
    GET_CONVERSATIONS,
    { client: client }
  );
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

  return (
    <Menu>
      <MenuButton
        bgColor={"betaWhite"}
        as={Button}
        rounded={"sm"}
        cursor={"pointer"}
        minW={0}
        position={"relative"}
      >
        <Flex>
          <Text>Messages</Text>
          <Icon mt={"1"} as={IoMdArrowDropdown} />
        </Flex>
      </MenuButton>
      <MenuList minW={"80"} bgColor={"betaWhite"} zIndex={1}>
        {data?.getConversations.map((convo: any) => (
          <MenuItem
            style={{ margin: 0 }}
            key={convo.id}
            _even={{ bgColor: "white" }}
            ml={"auto"}
            _hover={{
              textDecoration: "none",
              bg: "alpha",
            }}
            onClick={() => {
              router.push({
                pathname: "/direct/[id]",
                query: {
                  id:
                    convo.sender == currentUser
                      ? convo.recieverId
                      : convo.senderId,
                },
              });
            }}
          >
            <Flex minW={"full"} align={"center"} flexDirection={"row"}>
              <Avatar
                src={
                  convo.sender == currentUser
                    ? convo.recieverPic
                    : convo.senderPic
                }
                name={
                  convo.sender == currentUser ? convo.reciever : convo.sender
                }
                bgColor={"alpha"}
                color={"black"}
              ></Avatar>
              <Flex ml={2} flexDirection={"column"}>
                <Flex align={"center"} flexDirection={"row"}>
                  <Text fontWeight={"semibold"}>
                    {convo.sender == currentUser
                      ? convo.reciever
                      : convo.sender}
                  </Text>
                  <Text fontSize={"sm"} ml={2} fontWeight={"thin"}>
                    {isNaN(convo.createdAt)
                      ? formatTime(new Date(convo.createdAt))
                      : formatTime(new Date(parseInt(convo.createdAt)))}
                  </Text>
                </Flex>

                <Flex flexDirection={"row"}>
                  <Text fontWeight={"semibold"}>
                    {convo.sender == currentUser ? "Me :" : ""}
                  </Text>
                  <Text ml={1}>
                    {convo.message!.length > 30
                      ? convo.message!.slice(0, 25) + " ..."
                      : convo.message}{" "}
                  </Text>
                </Flex>
              </Flex>
            </Flex>

            {/* <Avatar src={s.firstPic}></Avatar> */}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

const Navbar2 = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [, logout] = useLogoutMutation();

  const [bannerDisplay, setBannerDisplay] = useState("none");

  const [{ data: DATA, fetching: FETCHING }] = useNavbarQueryQuery();
  const zip = (array1: any, array2: any) =>
    array1.map((e: any, idx: number) => [e, array2[idx]]);

  if (FETCHING) {
    return <Box></Box>;
  }
  // if (!DATA?.navbarQuery.user) {
  //   return <Box></Box>;
  // }

  const becomePro = (
    <Button
      as={"a"}
      fontSize={"md"}
      fontWeight={600}
      borderStyle={"solid"}
      borderColor={"white"}
      color={"white"}
      bg={"alphaBlue"}
      _hover={{
        bg: "blue.700",
        color: "white",
        cursor: "pointer",
      }}
      onClick={async () => {
        if (DATA?.navbarQuery?.user && !DATA?.navbarQuery?.user?.confirmed) {
          setBannerDisplay("");
        } else {
          router.push({
            pathname: "/become_pro",
          });
        }
      }}
    >
      Devenir un Pro
    </Button>
  );

  const checkProfile = (
    <Button
      fontSize={"md"}
      fontWeight={600}
      borderStyle={"solid"}
      borderColor={"white"}
      color={"white"}
      bg={"alphaBlue"}
      onClick={async () => {
        router.push({
          pathname: "/profile",
          query: {
            id: DATA?.navbarQuery.user?.id,
            action: "info",
          },
        });
      }}
      _hover={{
        bg: "blue.700",
        color: "white",
      }}
    >
      Voir profil
    </Button>
  );
  const notLoggedIn = (
    <Stack
      display={"inline-flex"}
      flex={{ base: 1, md: 0 }}
      justify={"flex-end"}
      direction={"row"}
      spacing={6}
    >
      <AuthPopup />
      <Box display={{ base: "none", sm: "flex" }}>
        {" "}
        {/* <RegisterPopup /> */}
        <Button
          color={"black"}
          bgColor={"betaWhite"}
          _hover={{
            bg: "blue.900",
            color: "white",
          }}
          onClick={() => router.push("/register")}
        >
          S'inscrire
        </Button>
      </Box>
    </Stack>
  );
  const loggedIn = (
    <Flex alignItems={"center"}>
      <Menu>
        <MenuButton
          bgColor={"betaWhite"}
          as={Button}
          rounded={"sm"}
          cursor={"pointer"}
          minW={0}
        >
          <Flex align={"center"}>
            {/* <Text>{data?.me?.userName}</Text> */}
            <Avatar
              size={"sm"}
              src={
                DATA?.navbarQuery?.user?.profilePicture as string | undefined
              }
              name={
                DATA?.navbarQuery?.user?.profilePicture == ""
                  ? DATA?.navbarQuery?.user?.userName
                  : ""
              }
            ></Avatar>
            <Icon mt={"1"} as={IoMdArrowDropdown} />
          </Flex>
        </MenuButton>
        <MenuList zIndex={1} bg={"white"}>
          <MenuItem
            style={{ margin: 0 }}
            onClick={async () => {
              router.push({
                pathname: "/profile",
                query: {
                  id: DATA?.navbarQuery?.user?.id,
                  action: "info",
                },
              });
            }}
            ml={"auto"}
            _hover={{
              textDecoration: "none",
              bg: "gray.100",
            }}
          >
            Voir Profile
          </MenuItem>
          {!DATA?.navbarQuery?.user?.isWorker ? (
            <MenuItem
              style={{ margin: 0 }}
              onClick={async () => {
                router.push({
                  pathname: "/become_pro",
                });
              }}
              ml={"auto"}
              _hover={{
                textDecoration: "none",
                bg: "gray.100",
              }}
            >
              Devenir un Pro
            </MenuItem>
          ) : null}
          <MenuItem
            style={{ margin: 0 }}
            onClick={async () => {
              router.push({
                pathname: "/profile/edit",
                query: {
                  id: DATA?.navbarQuery?.user?.id,
                  action: "edit",
                },
              });
            }}
            ml={"auto"}
            _hover={{
              textDecoration: "none",
              bg: "gray.100",
            }}
          >
            Link 2
          </MenuItem>
          <MenuDivider />
          <MenuItem
            style={{ margin: 0 }}
            onClick={async () => {
              logout();
              setBannerDisplay("none");
              router.push({
                pathname: "/",
              });
            }}
            ml={"auto"}
            _hover={{
              textDecoration: "none",
              bg: "gray.100",
            }}
          >
            Log out
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );

  return (
    <>
      <Banner display={bannerDisplay} email={DATA?.navbarQuery?.user?.email!} />
      <Box
        top={0}
        position={"sticky"}
        zIndex={2}
        w={"full"}
        bg={"#fafafa"}
        px={4}
      >
        <Flex
          mx={"auto"}
          maxW={"1200"}
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
              boxSize="64px"
              // src="https://www.streamscheme.com/wp-content/uploads/2020/04/pepega.png"
              src="https://projecta-profile-pictures.s3.eu-west-3.amazonaws.com/staticImages/logo+tinker.png"
              href={"/"}
              alt="Logo"
              onClick={() =>
                router.push({
                  pathname: "/",
                })
              }
              _hover={{ cursor: "pointer" }}
            />
            {/* {joinorlogin} */}
            {DATA?.navbarQuery?.user?.isWorker ? checkProfile : becomePro}

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
                rounded={"md"}
                fontWeight={"500"}
                _hover={{
                  textDecoration: "none",
                  bg: "gray.100",
                }}
                href="/search"
              >
                Rechercher
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
              {DATA?.navbarQuery?.user ? (
                <Menu closeOnSelect={false}>
                  <MenuButton
                    bgColor={"betaWhite"}
                    as={Button}
                    rounded={"sm"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    Préférences <Icon as={IoMdArrowDropdown} />
                  </MenuButton>
                  <MenuList bgColor={"betaWhite"}>
                    <Tabs
                      w={300}
                      variant={"enclosed"}
                      bgColor={"betaWhite"}
                      isFitted
                    >
                      <TabList>
                        <Tab
                          _selected={{
                            color: "black",
                            bgColor: "alpha",
                            borderColor: "transparent",
                          }}
                          _active={{ borderColor: "transparent" }}
                        >
                          Likes
                        </Tab>
                        <Tab
                          _selected={{
                            color: "black",
                            bgColor: "alpha",
                            borderColor: "transparent",
                          }}
                          _active={{ borderColor: "transparent" }}
                        >
                          Favoris
                        </Tab>
                      </TabList>

                      {zip(
                        DATA?.navbarQuery?.likes,
                        DATA?.navbarQuery?.favs
                      ).map((e: any, idx: number) => {
                        return (
                          <TabPanels key={idx}>
                            {e[0] ? (
                              <TabPanel
                                _even={{ bgColor: "beta" }}
                                bgColor={"alpha"}
                                ml={"auto"}
                                _hover={{
                                  textDecoration: "none",
                                  bg: "beta",
                                  cursor: "pointer",
                                }}
                              >
                                <Flex align={"center"} flexDirection={"row"}>
                                  <Image
                                    bg={"white"}
                                    boxSize={"10"}
                                    rounded={"md"}
                                    src={e[0].pictures[0]}
                                    onClick={async () => {
                                      router.push({
                                        pathname: "/[username]/[title]",
                                        query: {
                                          username: e[0].worker,
                                          title: e[0].title,
                                        },
                                      });
                                    }}
                                  ></Image>
                                  <Flex flexDirection={"column"}>
                                    <Text
                                      ml={2}
                                      as={Link}
                                      fontWeight={"semibold"}
                                      onClick={() => {
                                        router.push({
                                          pathname: "/[username]",
                                          query: { username: e[0].worker },
                                        });
                                      }}
                                    >
                                      {e[0].worker}
                                    </Text>
                                    <Text
                                      ml={2}
                                      onClick={async () => {
                                        router.push({
                                          pathname: "/[username]/[title]",
                                          query: {
                                            username: e[0].worker,
                                            title: e[0].title,
                                          },
                                        });
                                      }}
                                    >
                                      {e[0].title}
                                    </Text>
                                  </Flex>
                                </Flex>
                              </TabPanel>
                            ) : null}
                            {e[1] ? (
                              <TabPanel
                                _even={{ bgColor: "alpha" }}
                                bgColor={"beta"}
                                ml={"auto"}
                                _hover={{
                                  textDecoration: "none",
                                  bg: "beta",
                                  cursor: "pointer",
                                }}
                              >
                                <Flex
                                  align={"center"}
                                  flexDirection={"row"}
                                  onClick={() => {
                                    router.push({
                                      pathname: "/[username]",
                                      query: { username: e[0].worker },
                                    });
                                  }}
                                >
                                  <Avatar
                                    src={e[1]?.profilePicture}
                                    name={e[1]?.userName}
                                  ></Avatar>
                                  <Flex ml={4} flexDirection={"column"}>
                                    {" "}
                                    <Box
                                      fontSize={"lg"}
                                      as={Link}
                                      fontWeight={"semibold"}
                                    >
                                      {e[1]?.userName}
                                    </Box>
                                    <Rating
                                      rating={e[1]?.rating}
                                      numReviews={e[1]?.ratingsNumber}
                                    />
                                  </Flex>
                                </Flex>
                              </TabPanel>
                            ) : null}
                          </TabPanels>
                        );
                      })}
                      {/* <TabPanel>first Like</TabPanel>
                      <TabPanel>first Fav</TabPanel> */}
                    </Tabs>
                  </MenuList>
                </Menu>
              ) : null}

              {DATA?.navbarQuery?.user ? (
                <ChatDropdown currentUser={DATA?.navbarQuery?.user!.userName} />
              ) : null}
            </HStack>
          </Flex>
          {/* {body} */}
          {!DATA?.navbarQuery?.user ? notLoggedIn : loggedIn}
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link, idx) => {
                return <NavLink key={idx} url={link.url} value={link.value} />;
              })}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};
export default Navbar2;

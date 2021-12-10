import { StarIcon } from "@chakra-ui/icons";
import {
  Flex,
  Circle,
  Box,
  Divider,
  Avatar,
  Link,
  IconButton,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import { MdFavorite, MdFavoriteBorder } from "react-icons/Md";
import {
  useDislikeMutation,
  useFavoriteMutation,
  useLikeMutation,
  useUnfavoriteMutation,
} from "../../generated/graphql";
import Carousel from "../Carousel";
import { ImageSlider } from "../ImageSlider";
import { formatDuration } from "../UserDetails/UserDetails";

interface RatingProps {
  rating: any;
  numReviews: any;
}

export const Rating = ({ rating, numReviews }: RatingProps) => {
  const colors = {
    filled: "#f5eb3b",
    unfilled: "#DCDCDC",
  };
  return (
    <Box d="flex" alignItems="center">
      {Array(5)
        .fill(0)
        .map((_, index) => {
          return (
            <StarIcon
              key={index}
              _hover={{ cursor: "pointer" }}
              color={rating > index ? colors.filled : colors.unfilled}
            />
          );
        })}
      <Box as="span" ml="2" color="gray.600" fontSize="sm">
        ({numReviews > 1 ? `${numReviews} avis` : `${numReviews} avis`})
      </Box>
    </Box>
  );
};

const UserCard = ({ skill, user }: { skill: any; user: any }) => {
  const router = useRouter();
  const [, like] = useLikeMutation();
  const [, dislike] = useDislikeMutation();
  const [, favorite] = useFavoriteMutation();
  const [, unfavorite] = useUnfavoriteMutation();
  const [likedDisplay, setLikedDisplay] = useState("none");
  const [notLikedDisplay, setNotLikedDisplay] = useState("");
  const [favoriteDisplay, setFavoriteDisplay] = useState("none");
  const [notFavoriteDisplay, setNotFavoriteDisplay] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [disabled2, setDisabled2] = useState(false);
  useEffect(() => {
    if (user?.likesIds && user.likesIds.includes(skill.id)) {
      setLikedDisplay("");
      setNotLikedDisplay("none");
    }
    if (user?.favoritesIds && user.favoritesIds.includes(skill.workerId)) {
      setFavoriteDisplay("");
      setNotFavoriteDisplay("none");
    }
  }, [user?.likesIds, setLikedDisplay, setNotLikedDisplay]);

  return (
    <Box _hover={{ cursor: "pointer" }} mt={"10"} w={280} key={skill.id}>
      <Flex w="full" alignItems="center" justifyContent="center">
        <Box
          bg={"white"}
          borderWidth="1px"
          rounded="sm"
          shadow="lg"
          position="relative"
        >
          {/* <ImageSlider
            images={skill.pictures ? skill.pictures : ["", "", "", ""]}
            width={280}
            height={170}
          /> */}
          <Carousel
            images={skill.pictures ? skill.pictures : ["", "", "", ""]}
            height={200}
            width={280}
          />
          {skill.status == "finished" && (
            <Circle
              size="10px"
              position="absolute"
              top={2}
              right={2}
              bg="green.200"
            />
          )}

          <Box>
            <Flex
              px="3"
              mt="1"
              justifyContent="space-between"
              alignContent="center"
            >
              <Flex
                pt={"4"}
                fontSize="xl"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated
                onClick={() => {
                  router.push({
                    pathname: "/[username]",
                    query: { username: skill.worker },
                  });
                }}
              >
                <Avatar
                  // name={`${worker.firstName} ${worker.lastName}`}
                  name={skill.worker}
                  bg={skill.workerPicUrl && "transparent"}
                  src={skill.workerPicUrl}
                />

                <Box ml={1} my={"auto"} as={Link}>
                  {/* {worker.firstName} {worker.lastName} */}
                  {skill.worker}
                </Box>
              </Flex>
              <Flex align={"center"} flexDirection={"row"}>
                <Box mt={5}>
                  <IconButton
                    aria-label="Like"
                    disabled={disabled}
                    display={notLikedDisplay}
                    bgColor={"white"}
                    color={"blue.500"}
                    fontSize={"xl"}
                    size={"xs"}
                    mr={0}
                    icon={<FaRegThumbsUp />}
                    _hover={{ size: "sm", fontSize: "2xl" }}
                    _disabled={{ cursor: "pointer" }}
                    onClick={async () => {
                      let resp: any;
                      if (!disabled) {
                        resp = await like({ skillId: skill.id });
                      }

                      setDisabled(true);
                      setTimeout(() => setDisabled(false), 5000);
                      if (resp.data?.like) {
                        setLikedDisplay("");
                        setNotLikedDisplay("none");
                      }
                    }}
                  ></IconButton>
                  <IconButton
                    aria-label="Dislike"
                    disabled={disabled}
                    display={likedDisplay}
                    bgColor={"white"}
                    color={"blue.500"}
                    fontSize={"xl"}
                    size={"xs"}
                    icon={<FaThumbsUp />}
                    _disabled={{ cursor: "pointer" }}
                    _hover={{ size: "sm", fontSize: "2xl" }}
                    onClick={async () => {
                      const resp = await dislike({ skillId: skill.id });
                      setDisabled(true);
                      setTimeout(() => setDisabled(false), 5000);
                      if (resp.data?.dislike) {
                        setLikedDisplay("none");
                        setNotLikedDisplay("");
                      }
                    }}
                  ></IconButton>
                </Box>
                {/* here ----------------- */}
                <Box mt={5}>
                  <IconButton
                    aria-label="Favorite"
                    disabled={disabled2}
                    display={notFavoriteDisplay}
                    bgColor={"white"}
                    color={"red.300"}
                    fontSize={"2xl"}
                    size={"xs"}
                    mr={0}
                    icon={<MdFavoriteBorder />}
                    _hover={{ size: "sm", fontSize: "3xl" }}
                    _disabled={{ cursor: "pointer" }}
                    onClick={async () => {
                      let resp: any;
                      if (!disabled2) {
                        resp = await favorite({ workerId: skill.workerId });
                      }

                      setDisabled2(true);
                      setTimeout(() => setDisabled2(false), 5000);
                      if (resp.data?.favorite) {
                        setFavoriteDisplay("");
                        setNotFavoriteDisplay("none");
                      }
                    }}
                  ></IconButton>
                  <IconButton
                    aria-label="Unfavorite"
                    disabled={disabled2}
                    display={favoriteDisplay}
                    bgColor={"white"}
                    color={"red.300"}
                    fontSize={"2xl"}
                    size={"xs"}
                    icon={<MdFavorite />}
                    _disabled={{ cursor: "pointer" }}
                    _hover={{ size: "sm", fontSize: "3xl" }}
                    onClick={async () => {
                      const resp = await unfavorite({
                        workerId: skill.workerId,
                      });
                      setDisabled2(true);
                      setTimeout(() => setDisabled2(false), 5000);
                      if (resp.data?.unfavorite) {
                        setFavoriteDisplay("none");
                        setNotFavoriteDisplay("");
                      }
                    }}
                  ></IconButton>
                </Box>
              </Flex>
            </Flex>
            <Box
              minH={"20"}
              maxH={"20"}
              size={"sm"}
              px="3"
              fontSize={"md"}
              fontWeight={"medium"}
              textColor={"gray.500"}
              _hover={{ textDecoration: "underline" }}
              onClick={async () => {
                router.push({
                  pathname: "/[username]/[title]",
                  query: {
                    username: skill.worker,
                    title: skill.title.replace(/ /g, "_"),
                    // id: skill.workerId,
                  },
                });
              }}
            >
              {skill.title}
            </Box>
            {skill.duration <= 24 * 31 ? (
              <Box textColor={"gray.400"} px={3}>
                Livré en {formatDuration(skill.duration)}
              </Box>
            ) : null}
            <Divider w={"full"} my={2} />

            <Flex
              px="3"
              pb={"2"}
              justifyContent="space-between"
              alignContent="center"
            >
              <Rating rating={skill.rating} numReviews={skill.ratingsNumber} />
              <Box fontSize="sm" color={"black"}>
                {skill.pricing}
                {" dh"}
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default UserCard;

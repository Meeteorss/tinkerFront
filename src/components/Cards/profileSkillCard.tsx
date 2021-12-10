import { DeleteIcon, StarIcon } from "@chakra-ui/icons";
import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
  Divider,
  Avatar,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import { HiPencilAlt } from "react-icons/hi";
import { useDeleteSkillMutation } from "../../generated/graphql";
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
        ({numReviews})
      </Box>
    </Box>
  );
};

const ProfileSkillCard = ({ worker, skill }: any) => {
  const router = useRouter();
  const [, deleteSkill] = useDeleteSkillMutation();

  return (
    <Box
      _hover={{ cursor: "pointer" }}
      my={"5"}
      w={{ base: 380, lg: "100%" }}
      key={skill.id}
      shadow="lg"
    >
      <Flex
        w="full"
        bg={"white"}
        borderWidth="1px"
        rounded="sm"
        position="relative"
        flexDirection={{ base: "column", lg: "row" }}
      >
        <Box>
          {/* <ImageSlider
                images={skill.pictures ? skill.pictures : ["", "", "", ""]}
                width={300}
                height={300}
              /> */}
          <Carousel
            images={skill.pictures ? skill.pictures : ["", "", "", ""]}
            height={{ base: 200, lg: 300 }}
            width={{ base: 380, lg: 300 }}
          />
          {/* {skill.status == "finished" && (
                <Circle
                  size="10px"
                  position="absolute"
                  top={2}
                  right={2}
                  bg="green.200"
                />
              )} */}
        </Box>
        <Flex w={"100%"} bgColor={"beta"} py={2} flexDirection={"column"}>
          <Flex w={"100%"} justify={"space-between"}>
            <Flex mt={3} flexDirection={"row"}>
              <Box
                w={"fit-content"}
                maxH={"20"}
                pl="5"
                fontSize={"lg"}
                fontWeight={"medium"}
                textColor={"gray.800"}
              >
                Statut:
              </Box>
              <Box
                maxH={"20"}
                px="5"
                fontSize={"lg"}
                fontWeight={"medium"}
                textColor={"gray.900"}
                color={skill.status == "Finished" ? "green" : "orange"}
              >
                {skill.status}
              </Box>
            </Flex>
            <Flex flexDirection={{ base: "column", lg: "row" }}>
              <Button
                mt={2}
                mr={2}
                bg={"black"}
                color={"white"}
                _hover={{ bg: "gray.700", color: "white" }}
                minW="20"
                leftIcon={<HiPencilAlt />}
                onClick={() => {
                  router.push({
                    pathname: "/profile/skills/edit",
                    query: {
                      id: worker.id,
                      skillId: skill.id,
                      action: "skills",
                    },
                  });
                }}
              >
                Editer
              </Button>
              <Button
                border={"1px"}
                leftIcon={<DeleteIcon />}
                bg={"transparent"}
                color={"red.300"}
                _hover={{ bg: "red.500", color: "white" }}
                mt={2}
                mr={2}
                minW="20"
                onClick={() => {
                  deleteSkill({ skillId: skill.id });
                  router.reload();
                }}
              >
                Supprimer
              </Button>
            </Flex>
          </Flex>
          <Flex w={"100%"} mt={3} flexDirection={"row"}>
            <Box
              w={"fit-content"}
              maxH={"20"}
              pl="5"
              fontSize={"lg"}
              fontWeight={"medium"}
              textColor={"gray.800"}
            >
              Titre:
            </Box>
            <Box
              maxH={"20"}
              px="5"
              fontSize={"md"}
              fontWeight={"medium"}
              textColor={"gray.900"}
            >
              {skill.title}
            </Box>
          </Flex>
          <Flex w={"100%"} mt={3} flexDirection={"row"}>
            <Box
              w={"fit-content"}
              maxH={"20"}
              pl="5"
              fontSize={"lg"}
              fontWeight={"medium"}
              textColor={"gray.800"}
            >
              Catégorie:
            </Box>
            <Box
              maxH={"20"}
              px="5"
              fontSize={"md"}
              fontWeight={"medium"}
              textColor={"gray.900"}
            >
              {skill.category}
            </Box>
          </Flex>

          <Flex w={"100%"} mt={3} flexDirection={"row"}>
            <Box
              w={"fit-content"}
              maxH={"20"}
              pl="5"
              fontSize={"lg"}
              fontWeight={"medium"}
              textColor={"gray.800"}
            >
              Déscription:
            </Box>
            <Box
              maxH={"20"}
              px="5"
              fontSize={"md"}
              fontWeight={"medium"}
              textColor={"gray.900"}
            >
              {skill.description
                ? `${skill.description.slice(0, 50)} . . .`
                : "Not specified"}
            </Box>
          </Flex>
          <Flex w={"100%"} mt={3} flexDirection={"row"}>
            <Box
              w={"fit-content"}
              maxH={"20"}
              pl="5"
              fontSize={"lg"}
              fontWeight={"medium"}
              textColor={"gray.800"}
            >
              Ville:
            </Box>
            <Box
              maxH={"20"}
              px="5"
              fontSize={"md"}
              fontWeight={"medium"}
              textColor={"gray.900"}
            >
              {skill.zone}
            </Box>
          </Flex>

          <Flex w={"100%"} mt={3} flexDirection={"row"}>
            <Box
              w={"fit-content"}
              maxH={"20"}
              pl="5"
              fontSize={"lg"}
              fontWeight={"medium"}
              textColor={"gray.800"}
            >
              Prix:
            </Box>
            <Box
              maxH={"20"}
              px="5"
              fontSize={"md"}
              fontWeight={"medium"}
              textColor={"gray.900"}
            >
              {skill.pricing ? skill.pricing + " dh" : "N'est pas spécifié"}
            </Box>
          </Flex>
          <Flex w={"100%"} mt={3} flexDirection={"row"}>
            <Box
              w={"fit-content"}
              maxH={"20"}
              pl="5"
              fontSize={"lg"}
              fontWeight={"medium"}
              textColor={"gray.800"}
            >
              Durée de livraison:
            </Box>
            <Box
              maxH={"20"}
              px="5"
              fontSize={"md"}
              fontWeight={"medium"}
              textColor={"gray.900"}
            >
              {skill.duration
                ? formatDuration(skill.duration)
                : "Not specified"}
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ProfileSkillCard;

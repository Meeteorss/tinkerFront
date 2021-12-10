import { Box, Flex, Link } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { HiPencilAlt } from "react-icons/hi";
import { useGetSkillsQuery } from "../../generated/graphql";
import ProfileSkillCard from "../Cards/profileSkillCard";
import UserCard from "../Cards/userCard";
import { Card } from "./Card";
import { CardContent } from "./CardContent";
import { CardHeader } from "./CardHeader";

export const SkillsDetails = ({ worker }: { worker: any }) => {
  const router = useRouter();
  const [{ data, fetching }] = useGetSkillsQuery({
    variables: { workerId: worker.id },
  });
  if (!worker || !data) {
    return <Box> 404 Not found</Box>;
  }
  return (
    <Card w={{ base: "100%", xl: 1200 }}>
      <CardHeader
        title="Mes Skills"
        action={
          <>
            <Button
              bg={"gray.100"}
              color={"black"}
              minW="20"
              leftIcon={<HiPencilAlt />}
              onClick={() => {
                router.push({
                  pathname: "/profile/skills/create",
                  query: { id: worker.id, action: "skills" },
                });
              }}
            >
              Ajouter un Skill
            </Button>
          </>
        }
      />
      <CardContent>
        <Flex
          p={5}
          flexDir={"column"}
          bg={"white"}
          mx={"auto"}
          maxW={"1000"}
          wrap={"wrap"}
        >
          {!data?.getSkills.length ? (
            <Flex alignItems={"center"} flexDirection={"row"}>
              <Box fontSize={"lg"}>Tu n'as pas encore rajouté un skill,</Box>
              <Button
                fontWeight={"semibold"}
                fontSize={"lg"}
                color={"blue.400"}
                as={Link}
                onClick={() => {
                  router.push({
                    pathname: "/profile/skills/create",
                    query: { id: worker.id, action: "skills" },
                  });
                }}
              >
                rajouter?
              </Button>
            </Flex>
          ) : (
            data.getSkills.map((s: any) => (
              <ProfileSkillCard key={s.id} worker={worker} skill={s} />
            ))
          )}
        </Flex>
      </CardContent>
    </Card>
  );
};

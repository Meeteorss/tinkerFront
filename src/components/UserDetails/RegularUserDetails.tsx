import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import * as React from "react";
import { useState } from "react";
import { HiPencilAlt } from "react-icons/hi";
import { UploadField } from "../Fields/UploadField";
import { Card } from "./Card";
import { CardContent } from "./CardContent";
import { CardHeader } from "./CardHeader";
import { Field } from "./Field";

export const formatDuration = (duration: number) => {
  if (duration < 24) {
    if (duration == null) {
      return "Not Specified";
    }
    return `${duration} hours`;
  } else if (duration <= 24 * 30) {
    return `${Math.floor(duration / 24)} days`;
  } else if (duration == 24 * 31) {
    return "More than 30 days";
  } else {
    return "Not specified";
  }
};

export const RegularUserDetails = ({ user }: { user: any }) => {
  const router = useRouter();

  const imgSrc = user.profilePicture as string;
  const time = new Date().toString();
  const suffix = "?random=".concat(time);
  const [file, setFile] = useState([] as any);

  if (!user) {
    return <Box> 404 Not found</Box>;
  }
  return (
    <Card w={{ base: "100%", xl: 1200 }}>
      <CardHeader
        title="Account Info"
        action={
          <>
            <Button
              bg={"gray.100"}
              color={"black"}
              minW="20"
              leftIcon={<HiPencilAlt />}
              onClick={() => {
                router.push({
                  pathname: "/profile/edit",
                  query: { id: user.id, action: "edit" },
                });
              }}
            >
              Edit
            </Button>
          </>
        }
      />
      <CardContent>
        <Flex
          fontWeight={"semibold"}
          as="dl"
          direction={{ base: "column", sm: "row" }}
          mt={"4"}
          px="6"
          py="4"
          _even={{ bg: "gray.100" }}
        >
          <Box my={"auto"} minWidth="180px">
            <Text>Profile Picture:</Text>
          </Box>
          <Flex flex="1" fontWeight="semibold">
            <UploadField worker={user} f={file} />
          </Flex>
        </Flex>
        <Field label="First Name:" value={user.firstName} isDisabled={true} />
        <Field label="Last Name:" value={user.lastName} isDisabled={true} />
        <Field label="Username:" value={user.userName} isDisabled={true} />
        <Field label="Email:" value={user.email} isDisabled={true} />
      </CardContent>
    </Card>
  );
};

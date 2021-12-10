import { Box, Button, Flex, Text, Stack, Link } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import * as React from "react";
import { useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";

import { useUpdateWorkerMutation } from "../../generated/graphql";
import { Card } from "./Card";
import { CardContent } from "./CardContent";
import { CardHeader } from "./CardHeader";
import { Field } from "./Field";
import { CheckIcon } from "@chakra-ui/icons";
import { UploadField } from "../Fields/UploadField";
import {
  _28dayOptions,
  _29dayOptions,
  _30dayOptions,
  _31dayOptions,
} from "../../utils/selectOptions";
// import validateDate from "validate-date";
const validateDate = require("validate-date");

const jobOptions = [
  { label: "Developper", value: "Developper" },
  { label: "Editor", value: "Editor" },
  { label: "Chef", value: "Chef" },
  { label: "Plumber", value: "Plumber" },
  { label: "Electrician", value: "Electrician" },
];

export const EditRegularUserDetails = ({ user }: { user: any }) => {
  const router = useRouter();

  const [, updateWorker] = useUpdateWorkerMutation();
  const [dateErrorDisplay, setDateErrorDisplay] = useState("none");

  const [file, setFile] = useState([] as any);
  const updateRef = useRef<HTMLButtonElement>(null);
  if (!user) {
    return <Box> 404 Not found</Box>;
  }
  const handleUpdateRef = () => {
    updateRef.current?.click();
  };

  return (
    <Card w={{ base: "100%", xl: 1200 }}>
      <CardHeader
        title="Edit Account Info"
        action={
          <>
            <Button
              onClick={handleUpdateRef}
              bg={"gray.100"}
              color={"black"}
              minW="20"
              leftIcon={<CheckIcon />}
            >
              Update
            </Button>
            <Button
              ml={"4"}
              bg={"gray.100"}
              color={"black"}
              minW="20"
              leftIcon={<IoMdClose />}
              onClick={() =>
                router.push({
                  pathname: "/profile",
                  query: { id: user.id, action: "info" },
                })
              }
            >
              Cancel
            </Button>
          </>
        }
      />
      <CardContent maxW={1000}>
        <Flex
          mx={"auto"}
          direction={{ base: "column", sm: "row" }}
          px="6"
          py="4"
          alignItems={"center"}
        >
          <Box fontWeight="semibold" minWidth="180px">
            <Text>Profile Picture</Text>
          </Box>
          <Flex flex="1" fontWeight="semibold">
            <UploadField worker={user} f={file} />
          </Flex>
        </Flex>
        <Formik
          initialValues={{
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          }}
          onSubmit={async (values, { setErrors }) => {}}
        >
          {({ isSubmitting, values, errors }) => {
            return (
              <Form>
                <Field
                  label="First Name:"
                  value={user.firstName}
                  isDisabled={true}
                />
                <Field
                  label="Last Name:"
                  value={user.lastName}
                  isDisabled={true}
                />
                <Field
                  label="Username:"
                  value={user.userName}
                  isDisabled={true}
                />
                <Flex flexDirection={"column"}>
                  <Field label="Email:" value={user.email} isDisabled={true} />
                  <Box as={Link} color={"blue"} ml={"auto"}>
                    <Box
                      onClick={() => {
                        router.push({
                          pathname: "/change_email",
                          query: { id: user.id, action: "change_email" },
                        });
                      }}
                      mt={-4}
                      mr={6}
                    >
                      Changer email ?
                    </Box>
                  </Box>
                </Flex>
                <Flex flexDirection={"column"}>
                  <Field
                    label="Password:"
                    value={"**********"}
                    isDisabled={true}
                  />
                  <Box as={Link} color={"blue"} ml={"auto"}>
                    <Box
                      mt={-4}
                      mr={6}
                      onClick={() => {
                        router.push({
                          pathname: "/change_password",
                          query: { id: user.id, action: "change_password" },
                        });
                      }}
                    >
                      changer password ?
                    </Box>
                  </Box>
                </Flex>

                <Stack spacing={6}>
                  <Stack>
                    <Button
                      display={"none"}
                      ref={updateRef}
                      isLoading={isSubmitting}
                      type={"submit"}
                      mx={"auto"}
                      w={"70%"}
                      colorScheme={"blue"}
                      variant={"solid"}
                    >
                      Update
                    </Button>
                  </Stack>
                </Stack>
              </Form>
            );
          }}
        </Formik>
      </CardContent>
    </Card>
  );
};

import { CheckIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import InputField from "../../components/Fields/InputField";
import { Layout } from "../../components/Layout";
import { SideBar } from "../../components/SideBar/Sidebar";
import { Card } from "../../components/UserDetails/Card";
import { CardContent } from "../../components/UserDetails/CardContent";
import { CardHeader } from "../../components/UserDetails/CardHeader";
import { EditField } from "../../components/UserDetails/EditField";
import { Field } from "../../components/UserDetails/Field";
import {
  useChangeEmailMutation,
  useConfirmPasswordMutation,
  useMeQuery,
  useWorkerByIdQuery,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { toErrorMap } from "../../utils/toErrorMap";

const change_email = () => {
  const router = useRouter();
  const { id } = router.query;
  const [{ data: dataMe, fetching: fetchingMe }] = useMeQuery();
  const [{ data, fetching }] = useWorkerByIdQuery({
    variables: { workerByIdId: id as string },
  });
  const [, confirmPassword] = useConfirmPasswordMutation();
  const [, changeEmail] = useChangeEmailMutation();
  const [step1D, setStep1D] = useState("");
  const [step2D, setStep2D] = useState("none");

  const imgSrc = data?.workerById?.profilePicture as string;
  const suffix = "?random=".concat(new Date().toString());
  let newImgSrc = "";
  if (imgSrc) {
    newImgSrc = imgSrc?.concat(suffix);
  }
  useEffect(() => {
    if ((!fetchingMe && !dataMe?.me) || (dataMe?.me?.id !== id && !fetching)) {
      router.replace("/");
    }
  }, [fetching, fetchingMe, dataMe, router]);
  if (fetching) {
    return <Box>loading</Box>;
  }
  if (!data) {
    return <Box>no data</Box>;
  }

  return (
    <Layout>
      <Box py="12">
        <Flex bg="white" mx={"auto"} w={{ base: "100%", xl: 1200 }}>
          <SideBar src={newImgSrc} worker={data.workerById} action={"edit"} />
          <Card w={{ base: "100%", xl: 1000 }}>
            <CardHeader
              title="Edit Account Info"
              action={
                <>
                  <Button
                    ml={"4"}
                    bg={"gray.100"}
                    color={"black"}
                    minW="20"
                    leftIcon={<IoMdClose />}
                    onClick={() =>
                      router.push({
                        pathname: "/profile",
                        query: { id: data.workerById?.id, action: "info" },
                      })
                    }
                  >
                    Cancel
                  </Button>
                </>
              }
            />
            <CardContent display={step1D}>
              <Formik
                initialValues={{
                  password: "",
                }}
                onSubmit={async (values, { setErrors }) => {
                  const response = await confirmPassword({
                    password: values.password,
                  });
                  if (response.data?.confirmPassword.errors) {
                    setErrors(
                      toErrorMap(response.data?.confirmPassword.errors)
                    );
                  } else {
                    setStep1D("none");
                    setStep2D("");
                  }
                }}
              >
                {({ isSubmitting, values, errors }) => {
                  return (
                    <Form>
                      <Box w={"60%"}>
                        <EditField
                          type={"password"}
                          name="password"
                          label="password:"
                        />

                        <Stack spacing={6}>
                          <Stack>
                            <Button
                              isLoading={isSubmitting}
                              type={"submit"}
                              mx={"auto"}
                              w={"30%"}
                              colorScheme={"blue"}
                              variant={"solid"}
                            >
                              Submit
                            </Button>
                          </Stack>
                        </Stack>
                      </Box>
                    </Form>
                  );
                }}
              </Formik>
            </CardContent>

            <CardContent display={step2D}>
              <Formik
                initialValues={{
                  email: "",
                }}
                onSubmit={async (values, { setErrors }) => {
                  const response = await changeEmail({
                    email: values.email,
                  });
                  if (!response.data?.changeEmail) {
                    if (values.email == data.workerById?.email) {
                      setErrors(
                        toErrorMap([
                          {
                            field: "email",
                            message:
                              "That's the current email address, enter a new one",
                          },
                        ])
                      );
                    } else {
                      setErrors(
                        toErrorMap([
                          { field: "email", message: "Invalid email" },
                        ])
                      );
                    }
                  } else if (response.data?.changeEmail) {
                    router.push({
                      pathname: "/profile",
                      query: { id: data.workerById?.id, action: "info" },
                    });
                  }
                }}
              >
                {({ isSubmitting, values, errors }) => {
                  return (
                    <Form>
                      <Box w={"60%"}>
                        <EditField name="email" label="New Email:" />

                        <Stack spacing={6}>
                          <Stack>
                            <Button
                              isLoading={isSubmitting}
                              type={"submit"}
                              mx={"auto"}
                              w={"30%"}
                              colorScheme={"blue"}
                              variant={"solid"}
                            >
                              Submit
                            </Button>
                          </Stack>
                        </Stack>
                      </Box>
                    </Form>
                  );
                }}
              </Formik>
            </CardContent>
          </Card>
        </Flex>
      </Box>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(change_email);

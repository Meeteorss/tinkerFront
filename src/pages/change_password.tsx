import { CheckIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import InputField from "../components/Fields/InputField";
import { Layout } from "../components/Layout";
import { SideBar } from "../components/SideBar/Sidebar";
import { Card } from "../components/UserDetails/Card";
import { CardContent } from "../components/UserDetails/CardContent";
import { CardHeader } from "../components/UserDetails/CardHeader";
import { EditField } from "../components/UserDetails/EditField";
import { Field } from "../components/UserDetails/Field";
import {
  useChangeEmailMutation,
  useChangePasswordFromProfilMutation,
  useConfirmPasswordMutation,
  useMeQuery,
  useWorkerByIdQuery,
} from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";

const change_password = () => {
  const router = useRouter();
  const { id, action } = router.query;
  const [{ data: dataMe, fetching: fetchingMe }] = useMeQuery();
  const [{ data, fetching }] = useWorkerByIdQuery({
    variables: { workerByIdId: id as string },
  });
  const [, changePasswordFromProfil] = useChangePasswordFromProfilMutation();

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
  if (!dataMe || !dataMe.me) {
    return <Box>no data</Box>;
  }

  return (
    <Layout>
      <Head>
        <title>Changer le mot de passe</title>
      </Head>
      <Box py="12">
        <Flex bg="white" mx={"auto"} w={{ base: "100%", xl: 1200 }}>
          <SideBar
            src={newImgSrc}
            worker={dataMe?.me?.isWorker ? data.workerById : dataMe?.me}
            action={action}
          />
          <Card w={{ base: "100%", xl: 1000 }}>
            <CardHeader
              title="Changer mon mot de passe"
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
                    Annuler
                  </Button>
                </>
              }
            />

            <CardContent>
              <Formik
                initialValues={{
                  oldPassword: "",
                  password: "",
                  confirmedPassword: "",
                }}
                onSubmit={async (values, { setErrors }) => {
                  const response = await changePasswordFromProfil({
                    oldPassword: values.oldPassword,
                    password: values.password,
                    confirmedPassword: values.confirmedPassword,
                  });
                  if (response.data?.changePasswordFromProfil.errors) {
                    setErrors(
                      toErrorMap(
                        response.data!.changePasswordFromProfil.errors!
                      )
                    );
                  } else {
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
                        <EditField
                          type={"password"}
                          name="oldPassword"
                          label="Mot de passe actuel:"
                        />
                        <EditField
                          type={"password"}
                          name="password"
                          label="Nouveau mot de passe:"
                        />
                        <EditField
                          type={"password"}
                          name="confirmedPassword"
                          label="Confirmer mot de passe:"
                        />

                        <Stack spacing={6}>
                          <Stack>
                            <Button
                              isLoading={isSubmitting}
                              type={"submit"}
                              mx={"auto"}
                              w={"30%"}
                              bgColor={"alphaBlue"}
                              color={"white"}
                              _hover={{ bgColor: "blue.800" }}
                              variant={"solid"}
                            >
                              Confirmer
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

export default withUrqlClient(createUrqlClient, { ssr: false })(
  change_password
);

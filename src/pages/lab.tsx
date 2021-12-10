import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Link,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import router from "next/router";
import React from "react";
import InputField from "../components/Fields/InputField";
import { useAdminLoginMutation, useMeQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";
import login from "./login";
import register from "./register";

const Lab = () => {
  const [{ data, fetching }] = useMeQuery();
  const [, adminLogin] = useAdminLoginMutation();
  if (fetching) {
    return <div>Error 404 not found</div>;
  }
  if (!fetching && data?.me) {
    return <div>Error 404 not found</div>;
  }
  return (
    <Flex
      py={"16"}
      flexDirection={"column"}
      justifyContent={"center"}
      align={"center"}
    >
      <Flex fontWeight={"semibold"} fontSize={"2xl"}>
        Se connecter
      </Flex>

      <Flex p={8}>
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await adminLogin({ options: values });
            if (response.data?.adminLogin.errors) {
              setErrors(toErrorMap(response.data.adminLogin.errors));
            } else {
              router.push("/lab/base");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Flex minW={"400"} w={"100%"} flexDirection={"column"}>
                <Box w={"full"} mt={4}>
                  <InputField
                    flex
                    name="username"
                    placeholder="Username"
                    label="Username"
                  />
                </Box>

                <Box mt={4}>
                  <InputField
                    flex
                    name="password"
                    placeholder="Mot de passe"
                    label="Mot de passe"
                    type="password"
                  />
                </Box>
              </Flex>

              <Stack mt={6} spacing={6}>
                <Stack>
                  <Button
                    isLoading={isSubmitting}
                    type={"submit"}
                    mx={"auto"}
                    w={"50%"}
                    color={"white"}
                    bgColor={"alphaBlue"}
                    _hover={{ bgColor: "blue.800" }}
                    variant={"solid"}
                  >
                    Se connecter
                  </Button>
                </Stack>
              </Stack>
            </Form>
          )}
        </Formik>
      </Flex>
    </Flex>
  );
};
export default withUrqlClient(createUrqlClient)(Lab);

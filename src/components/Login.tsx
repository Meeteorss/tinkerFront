import { Form, Formik } from "formik";
import React from "react";
import {
  Button,
  Checkbox,
  Flex,
  Link,
  Stack,
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import { Layout } from "../components/Layout";
import InputField from "../components/Fields/InputField";
import {
  useLoginMutation,
  useMeQuery,
  useRegisterMutation,
} from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";

const Login = () => {
  const [, register] = useRegisterMutation();
  const [, login] = useLoginMutation();
  const router = useRouter();
  const { next } = router.query;
  console.log("next", next);
  const [{ data, fetching }] = useMeQuery();
  React.useEffect(() => {
    if (!fetching && data?.me) {
      router.push("/");
    }
  }, [fetching, data, data?.me]);
  if (fetching) {
    return <div>loading ...</div>;
  }

  return (
    <Flex py={"16"} justifyContent={"center"} align={"center"}>
      <Tabs rounded={"lg"} shadow={"2xl"} w={"500"} bgColor={"betaWhite"}>
        <TabList
          roundedTop={"lg"}
          alignItems={"center"}
          justifyContent={"center"}
          p={6}
          bgColor={"alphaWhite"}
        >
          <Flex w={"80%"} flexDirection={"row"} justify={"space-between"}>
            <Tab fontWeight={"semibold"} fontSize={"2xl"}>
              Se connecter
            </Tab>
            <Tab fontWeight={"semibold"} fontSize={"2xl"}>
              S'inscrire
            </Tab>
          </Flex>
        </TabList>
        <TabPanels minW={"500"}>
          <TabPanel>
            <Flex p={8}>
              <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={async (values, { setErrors }) => {
                  const response = await login(values);
                  if (response.data?.login.errors) {
                    setErrors(toErrorMap(response.data.login.errors));
                  } else {
                    router.reload();
                  }
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Flex minW={"400"} w={"100%"} flexDirection={"column"}>
                      <Box w={"full"} mt={4}>
                        <InputField
                          flex
                          name="email"
                          placeholder="Email"
                          label="Email"
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
                      <Stack
                        direction={{ base: "column", sm: "row" }}
                        align={"start"}
                        justify={"space-between"}
                      >
                        <Checkbox>Se souvenir de moi</Checkbox>
                        <Link
                          onClick={() => {
                            router.push({
                              pathname: "user/forgot_password",
                            });
                          }}
                          color={"blue.500"}
                        >
                          Mot de passe oublié?
                        </Link>
                      </Stack>
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
          </TabPanel>
          <TabPanel>
            <Flex p={8}>
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  userName: "",
                  email: "",
                  password: "",
                  confirmedPassword: "",
                }}
                onSubmit={async (values, { setErrors }) => {
                  const response = await register({ options: values });

                  if (response.data?.register.errors) {
                    setErrors(toErrorMap(response.data.register.errors));
                  } else if (response.data?.register.user) {
                    router.reload();
                  }
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Flex flexDirection={"column"}>
                      <Box>
                        <InputField
                          flex
                          name="firstName"
                          placeholder="Prénom"
                          label="Prénom"
                        />
                      </Box>
                      <Box mt={4}>
                        <InputField
                          flex
                          name="lastName"
                          placeholder="Nom"
                          label="Nom"
                        />
                      </Box>
                      <Box mt={4}>
                        <InputField
                          flex
                          name="userName"
                          placeholder="Nom d'utilisateur"
                          label="Nom d'utilisateur"
                        />
                      </Box>

                      <Box mt={4}>
                        <InputField
                          flex
                          name="email"
                          placeholder="Email"
                          label="Email"
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

                      <Box mt={4}>
                        <InputField
                          flex
                          name="confirmedPassword"
                          placeholder="Confirmer mot de passe"
                          label="Confirmer mot de passe"
                          type="password"
                        />
                      </Box>
                    </Flex>

                    <Stack mt={6} spacing={6}>
                      <Stack
                        direction={{ base: "column", sm: "row" }}
                        align={"start"}
                        justify={"space-between"}
                      >
                        <Checkbox>
                          <Box color={"blue.500"} as={Link}>
                            J'accepte les termes d'utilisation
                          </Box>
                        </Checkbox>
                      </Stack>
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
                          S'inscrire
                        </Button>
                      </Stack>
                    </Stack>
                  </Form>
                )}
              </Formik>
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};
export default Login;

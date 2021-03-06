import { Flex, Stack, Link, Box } from "@chakra-ui/layout";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/modal";
import { CloseButton, Checkbox, Button, ButtonGroup } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import router from "next/router";
import React from "react";
import { useLoginMutation, useRegisterMutation } from "../generated/graphql";

import { toErrorMap } from "../utils/toErrorMap";
import InputField from "./Fields/InputField";

const AuthAndRegisterPopup = ({ isOpenProp }: { isOpenProp: boolean }) => {
  const [, login] = useLoginMutation();
  const [, register] = useRegisterMutation();

  const [isOpen, setIsOpen] = React.useState(isOpenProp);
  const cancelRef: any = React.useRef();
  const onClose = () => setIsOpen(false);
  const [isOpen2, setIsOpen2] = React.useState(false);
  const onClose2 = () => setIsOpen2(false);
  const cancelRef2: any = React.useRef();
  return (
    <AlertDialog
      size={"md"}
      closeOnOverlayClick={false}
      motionPreset={"scale"}
      isCentered={true}
      isOpen={isOpen}
      leastDestructiveRef={cancelRef!}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent bgColor={"betaWhite"}>
          <AlertDialogHeader
            padding={"6"}
            justifyContent={"center"}
            bgColor={"alphaBlue"}
            color={"white"}
            textAlign={"center"}
            fontSize={"2xl"}
            fontWeight="bold"
          >
            <CloseButton
              position={"absolute"}
              top={0}
              right={0}
              onClick={() => {
                router.push("/");
              }}
            />
            Se connecter
          </AlertDialogHeader>

          <AlertDialogBody paddingY={"1"} bgColor={"betaWhite"}>
            <Flex p={4} flex={1} align={"center"} justify={"center"}>
              <Stack spacing={4} w={"full"} maxW={"md"}>
                <Formik
                  initialValues={{ email: "", password: "" }}
                  onSubmit={async (values, { setErrors }) => {
                    const response = await login(values);
                    if (response.data?.login.errors) {
                      setErrors(toErrorMap(response.data.login.errors));
                    }
                    if (response.data?.login.user) {
                      router.push({
                        pathname: "/profile",
                        query: {
                          id: response.data.login.user.id,
                          action: "info",
                        },
                      });
                    }
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <InputField
                        name="email"
                        placeholder="Email"
                        label="Email"
                      />
                      <InputField
                        name="password"
                        placeholder="Mot de passe"
                        label="Mot de passe"
                        type="password"
                      />
                      <Stack
                        direction={{ base: "column", sm: "row" }}
                        align={"start"}
                        justify={"space-between"}
                      >
                        <Checkbox>Se souvenir de moi</Checkbox>
                        <Link color={"blue.500"}>Mot de passe oubli???</Link>
                      </Stack>
                      <Stack mt={2} spacing={6}>
                        <Button
                          mt={4}
                          isLoading={isSubmitting}
                          type={"submit"}
                          mx={"auto"}
                          w={"50%"}
                          colorScheme={"blue"}
                          variant={"solid"}
                        >
                          Se connecter
                        </Button>
                      </Stack>
                    </Form>
                  )}
                </Formik>
              </Stack>
            </Flex>
          </AlertDialogBody>
          <AlertDialogFooter bgColor={"alphaBlue"}>
            <Flex mx={"auto"} flexDirection={"column"}>
              <Box color={"white"}>Vous n'??tes pas inscrit?</Box>
              <Link
                mx={"auto"}
                color={"blue.300"}
                onClick={() => {
                  setIsOpen2(true);
                }}
              >
                Cr??er un compte
              </Link>
              <AlertDialog
                size={"lg"}
                closeOnOverlayClick={true}
                motionPreset={"scale"}
                isCentered={true}
                isOpen={isOpen2}
                leastDestructiveRef={cancelRef2}
                onClose={onClose2}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader
                      padding={"6"}
                      justifyContent={"center"}
                      bgColor={"alphaBlue"}
                      color={"white"}
                      textAlign={"center"}
                      fontSize={"2xl"}
                      fontWeight="bold"
                    >
                      <CloseButton
                        position={"absolute"}
                        top={0}
                        right={0}
                        onClick={onClose2}
                      />
                      S'inscrire
                    </AlertDialogHeader>

                    <AlertDialogBody paddingY={"1"} bgColor={"white"}>
                      <Flex p={4} flex={1} align={"center"} justify={"center"}>
                        <Stack spacing={4} w={"full"} maxW={"md"}>
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
                              const response = await register({
                                options: values,
                              });

                              if (response.data?.register.errors) {
                                setErrors(
                                  toErrorMap(response.data.register.errors)
                                );
                              } else {
                                router.reload();
                              }
                            }}
                          >
                            {({ isSubmitting }) => (
                              <Form>
                                <InputField
                                  name="firstName"
                                  placeholder="Pr??nom"
                                  label="Pr??nom"
                                />
                                <InputField
                                  name="lastName"
                                  placeholder="Nom"
                                  label="Nom"
                                />

                                <InputField
                                  name="userName"
                                  placeholder="Nom d'utilisateur"
                                  label="Nom d'utilisateur"
                                />

                                <InputField
                                  name="email"
                                  placeholder="Email"
                                  label="Email"
                                />
                                <InputField
                                  name="password"
                                  placeholder="Mot de passe"
                                  label="Mot de passe"
                                  type="password"
                                />
                                <InputField
                                  name="confirmedPassword"
                                  placeholder="Confirmer mot de passe"
                                  label="Confirmer mot de passe"
                                  type="password"
                                />

                                <Stack mt={3}>
                                  <Button
                                    isLoading={isSubmitting}
                                    type={"submit"}
                                    mx={"auto"}
                                    w={"50%"}
                                    colorScheme={"blue"}
                                    variant={"solid"}
                                  >
                                    S'inscrire
                                  </Button>
                                </Stack>
                              </Form>
                            )}
                          </Formik>
                        </Stack>
                      </Flex>
                    </AlertDialogBody>
                    <AlertDialogFooter
                      align={"center"}
                      justify={"center"}
                      bgColor={"alphaBlue"}
                    >
                      <Button
                        colorScheme={"linkedin"}
                        mx={"auto"}
                        ref={cancelRef2}
                        onClick={onClose2}
                      >
                        Annuler
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            </Flex>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
export default AuthAndRegisterPopup;

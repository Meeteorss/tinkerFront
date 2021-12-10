import { gql, useMutation } from "@apollo/client";
import { PhoneIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  CloseButton,
  Flex,
  Link,
  Stack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useLoginMutation } from "../generated/graphql";
import { client } from "../utils/createAplloClient";
import { toErrorMap } from "../utils/toErrorMap";
import InputField from "./Fields/InputField";
import { Field } from "./UserDetails/Field";

const SEND_MESSAGE = gql`
  mutation createChat($recieverId: String!, $message: String!) {
    createChat(recieverId: $recieverId, message: $message) {
      id
      senderId
      recieverId
      message
      createdAt
    }
  }
`;
const ContactPopup = ({ state, worker }: { state: boolean; worker: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef: any = useRef();
  const [createChat, { data: sendMessageRes, error }] = useMutation(
    SEND_MESSAGE,
    { client: client }
  );
  const [, login] = useLoginMutation();
  const router = useRouter();

  if (!state) {
    return (
      <Box>
        <ButtonGroup variant={"outline"}>
          <Button
            leftIcon={<PhoneIcon />}
            colorScheme="black"
            bgColor={"white"}
            _hover={{
              bg: "black",
              color: "white",
            }}
            onClick={() => setIsOpen(true)}
          >
            Contacter
          </Button>
        </ButtonGroup>

        <AlertDialog
          size={"md"}
          closeOnOverlayClick={true}
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
                    setIsOpen(false);
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
                            <Link color={"blue.500"}>Mot de passe oublié?</Link>
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
                  <Box color={"white"}>Vous n'êtes pas inscrit?</Box>
                  <Link
                    mx={"auto"}
                    color={"blue.300"}
                    onClick={() => {
                      router.push({
                        pathname: "/register",
                        query: { next: `/${worker.userName}` },
                      });
                    }}
                  >
                    Créer un compte
                  </Link>
                </Flex>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Box>
    );
  } else {
    return (
      <Box>
        <ButtonGroup variant={"outline"}>
          <Button
            leftIcon={<PhoneIcon />}
            colorScheme={"black"}
            bgColor={"white"}
            color={"gray.800"}
            _hover={{
              bg: "black",
              color: "white",
            }}
            onClick={() => setIsOpen(true)}
          >
            Contacter
          </Button>
        </ButtonGroup>

        <AlertDialog
          size={"md"}
          closeOnOverlayClick={true}
          motionPreset={"scale"}
          isCentered={true}
          isOpen={isOpen}
          leastDestructiveRef={cancelRef!}
          onClose={onClose}
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
                  onClick={onClose}
                />
                {"Contacter "}
                {worker.userName}
              </AlertDialogHeader>

              <AlertDialogBody paddingY={"1"} bgColor={"white"}>
                <Flex w={"full"} p={4} flex={1} flexDirection={"column"}>
                  <Field
                    label="Email:"
                    value={worker.email}
                    isDisabled={true}
                  />
                  <Field
                    label="Numero de téléphone:"
                    value={worker.phone}
                    isDisabled={true}
                  />

                  <Formik
                    initialValues={{ content: "" }}
                    onSubmit={async (values, { setErrors }) => {
                      const response = await createChat({
                        variables: {
                          message: values.content,
                          recieverId: worker.id,
                        },
                      });

                      // if (
                      //   response.errors &&
                      //   response.errors.message.includes("empty")

                      // ) {
                      //   setErrors({ content: response.error.message });
                      // }
                    }}
                  >
                    {({ isSubmitting }) => (
                      <Form>
                        <InputField
                          name="content"
                          placeholder="Envoyer un message direct..."
                          hideLabel
                          commentarea
                        />

                        <Stack spacing={6}>
                          <Button
                            mt={4}
                            isLoading={isSubmitting}
                            type={"submit"}
                            mx={"auto"}
                            w={"fit-content"}
                            colorScheme={"blue"}
                            variant={"solid"}
                          >
                            Envoyer
                          </Button>
                        </Stack>
                      </Form>
                    )}
                  </Formik>
                </Flex>
              </AlertDialogBody>
              <AlertDialogFooter bgColor={"alphaBlue"}>
                <Button
                  w={"fit-content"}
                  colorScheme={"linkedin"}
                  mx={"auto"}
                  ref={cancelRef}
                  onClick={onClose}
                >
                  Annuler
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Box>
    );
  }
};
export default ContactPopup;

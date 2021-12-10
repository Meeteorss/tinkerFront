import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Checkbox,
  CloseButton,
  Flex,
  Link,
  Stack,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import router from "next/router";
import React from "react";
import { useLoginMutation } from "../generated/graphql";
import login from "../pages/login";
import { toErrorMap } from "../utils/toErrorMap";
import InputField from "./Fields/InputField";

const ConnectionPopup = ({ isOpenProp }: { isOpenProp: boolean }) => {
  const [, login] = useLoginMutation();
  const [isOpen, setIsOpen] = React.useState(isOpenProp);
  const cancelRef: any = React.useRef();
  const onClose = () => setIsOpen(false);
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
                      router.reload();
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
                    query: { next: router.pathname },
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
  );
};
export default ConnectionPopup;

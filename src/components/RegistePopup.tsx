import { Button } from "@chakra-ui/button";
import { Checkbox } from "@chakra-ui/checkbox";
import { CloseButton } from "@chakra-ui/close-button";
import { Box, Flex, Link, Stack } from "@chakra-ui/layout";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/modal";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import InputField from "./Fields/InputField";

const RegisterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef: any = useRef();
  const [, register] = useRegisterMutation();
  const router = useRouter();

  return (
    <Box>
      <Button
        color={"black"}
        bgColor={"betaWhite"}
        _hover={{
          bg: "blue.900",
          color: "white",
        }}
        onClick={() => setIsOpen(true)}
      >
        S'inscrire
      </Button>

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
              py={"3"}
              px={"6"}
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
              Register
            </AlertDialogHeader>

            <AlertDialogBody py={"1"} bgColor={"betaWhite"}>
              <Flex py={2} px={8} align={"center"} justify={"center"}>
                <Stack spacing={4} w={"full"} maxW={"sm"}>
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
                        router.push("/");
                      }
                    }}
                  >
                    {({ isSubmitting }) => (
                      <Form>
                        <InputField
                          name="firstName"
                          placeholder="First Name"
                          label="First Name"
                        />
                        <InputField
                          name="lastName"
                          placeholder="Last Name"
                          label="Last Name"
                        />
                        <InputField
                          name="userName"
                          placeholder="Username"
                          label="Username"
                        />

                        <InputField
                          name="email"
                          placeholder="email"
                          label="Email"
                        />
                        <InputField
                          name="password"
                          placeholder="Password"
                          label="Password"
                          type="password"
                        />
                        <InputField
                          name="confirmedPassword"
                          placeholder="Confirm your Password"
                          label="Confirm Password"
                          type="password"
                        />
                        <Stack spacing={6}>
                          <Stack
                            direction={{ base: "column", sm: "row" }}
                            align={"start"}
                            justify={"space-between"}
                          >
                            <Checkbox>Remember me</Checkbox>
                            <Link color={"blue.500"}>Forgot password?</Link>
                          </Stack>

                          <Stack>
                            <Button
                              isLoading={isSubmitting}
                              type={"submit"}
                              mx={"auto"}
                              w={"70%"}
                              colorScheme={"blue"}
                              variant={"solid"}
                            >
                              Sign up
                            </Button>
                          </Stack>
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
              bgColor={"blue.800"}
            >
              <Button
                colorScheme={"linkedin"}
                mx={"auto"}
                ref={cancelRef}
                onClick={onClose}
              >
                Cancel
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};
export default RegisterPopup;

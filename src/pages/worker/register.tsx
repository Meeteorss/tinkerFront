import { Field, Form, Formik, useField } from "formik";
import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Flex,
  FormLabel,
  Heading,
  Link,
  Stack,
  Image,
  Box,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  CloseButton,
  FormErrorMessage,
} from "@chakra-ui/react";

import { useRouter } from "next/router";
import InputField from "../../components/Fields/InputField";
import { Layout } from "../../components/Layout";
import {
  useIsworkerQuery,
  useLoginMutation,
  useMeQuery,
  useRegisterMutation,
  useRegisterWorkerMutation,
} from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import SelectField from "../../components/Fields/SelectField";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import Navbar2 from "../../components/NavBar2";
import { cityOptions } from "../../components/Fields/newSearchField";
import { EditField } from "../../components/UserDetails/EditField";
import { isServer } from "../../utils/isServer";
import RegisterPopup from "../../components/RegistePopup";
import { responsePathAsArray } from "graphql";
import DatePicker from "react-datepicker";
import {
  dayOptions,
  monthOptions,
  yearOptions,
  _28dayOptions,
  _29dayOptions,
  _30dayOptions,
  _31dayOptions,
} from "../../utils/selectOptions";

export interface FormValues {
  singleJob: string;
  multiJobs: string[];
}

const defaultValues: FormValues = {
  singleJob: "",
  multiJobs: [],
};

export const jobOptions = [
  { label: "Developpeur المطور", value: "Developper" },
  { label: "Editeur حلاق", value: "Editor" },
  { label: "Cuisinier حلاق", value: "Chef" },
  { label: "Plombier حلاق", value: "Plumber" },
  { label: "Electricien حلاق", value: "Electrician" },
  { label: "Coiffeur حلاق", value: "Barber" },
  { label: "Tailleur", value: "Tailor" },
  { label: "Photographe", value: "Photographer" },
  { label: "Menuisier", value: "Carpenter" },
  { label: "Forgeron", value: "BlackSmith" },
  { label: "Peintre", value: "Painter" },
  { label: "Platrier", value: "plasterer" },
  { label: "Chauffeur", value: "Driver" },
  { label: "Femme de ménage", value: "Housemaid" },
  { label: "Tuteur", value: "Tutor" },
  { label: "Entraîneur", value: "Coach" },
];

export const durationOptions = [
  { label: "Not specified", value: 24 * 32 },
  { label: "1 hour", value: 1 },
  { label: "2 hours", value: 2 },
  { label: "3 hours", value: 3 },
  { label: "4 hours", value: 4 },
  { label: "5 hours", value: 5 },
  { label: "6 hours", value: 6 },
  { label: "7 hours", value: 7 },
  { label: "8 hours", value: 8 },
  { label: "9 hours", value: 9 },
  { label: "10 hours", value: 10 },
  { label: "11 hours", value: 11 },
  { label: "12 hours", value: 12 },
  { label: "1 day", value: 24 * 1 },
  { label: "2 days", value: 24 * 2 },
  { label: "3 days", value: 24 * 3 },
  { label: "4 days", value: 24 * 4 },
  { label: "5 days", value: 24 * 5 },
  { label: "6 days", value: 24 * 6 },
  { label: "7 days", value: 24 * 7 },
  { label: "8 days", value: 24 * 8 },
  { label: "9 days", value: 24 * 9 },
  { label: "10 days", value: 24 * 10 },
  { label: "11 day1", value: 24 * 11 },
  { label: "12 days", value: 24 * 12 },
  { label: "13 days", value: 24 * 13 },
  { label: "14 days", value: 24 * 14 },
  { label: "15 days", value: 24 * 15 },
  { label: "16 days", value: 24 * 16 },
  { label: "17 days", value: 24 * 17 },
  { label: "18 days", value: 24 * 18 },
  { label: "19 days", value: 24 * 19 },
  { label: "20 days", value: 24 * 20 },
  { label: "21 days", value: 24 * 21 },
  { label: "22 days", value: 24 * 22 },
  { label: "23 days", value: 24 * 23 },
  { label: "24 days", value: 24 * 24 },
  { label: "25 days", value: 24 * 25 },
  { label: "26 days", value: 24 * 26 },
  { label: "27 days", value: 24 * 27 },
  { label: "28 days", value: 24 * 28 },
  { label: "29 days", value: 24 * 29 },
  { label: "30 days", value: 24 * 30 },
  { label: "more than 30 days", value: 24 * 31 },
];

const RegisterWorker = () => {
  // const [, registerWorker] = useRegisterWorkerMutation();
  const [, registerWorker] = useRegisterWorkerMutation();
  const [, register] = useRegisterMutation();
  const router = useRouter();
  const [{ data, fetching }] = useMeQuery();
  let userId = "";
  if (data?.me) {
    userId = data.me.id;
  }
  const [{ data: dataW, fetching: fetchingW }] = useIsworkerQuery({
    variables: { userId: userId },
  });
  const [isOpen, setIsOpen] = React.useState(true);
  const onClose = () => setIsOpen(false);
  const cancelRef: any = React.useRef();

  const [isOpen2, setIsOpen2] = useState(false);
  const onClose2 = () => setIsOpen2(false);
  const cancelRef2: any = React.useRef();
  const [, login] = useLoginMutation();
  const [display, setDisplay] = useState("none");

  if (fetching) {
    return <Box>loading ...</Box>;
  }

  if (fetchingW) {
    return <Box>loading ...</Box>;
  } else if (data?.me?.isWorker) {
    router.push({
      pathname: "/profile",
      query: { id: userId, action: "info" },
    });
    return <Box>redirecting ...</Box>;
  }

  return (
    <Layout>
      {!data?.me ? (
        <AlertDialog
          size={"md"}
          closeOnOverlayClick={false}
          motionPreset={"scale"}
          isCentered={true}
          colorScheme={"linkedin"}
          isOpen={isOpen}
          leastDestructiveRef={cancelRef!}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader
                padding={"6"}
                justifyContent={"center"}
                bgColor={"blue.500"}
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
                Connexion
              </AlertDialogHeader>

              <AlertDialogBody paddingY={"1"} bgColor={"white"}>
                <Flex p={8} flex={1} align={"center"} justify={"center"}>
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
                            placeholder="email"
                            label="Email"
                          />
                          <InputField
                            name="password"
                            placeholder="Password"
                            label="password"
                            type="password"
                          />
                          <Stack
                            direction={{ base: "column", sm: "row" }}
                            align={"start"}
                            justify={"space-between"}
                          >
                            <Checkbox>Remember me</Checkbox>
                            <Link color={"blue.500"}>Forgot password?</Link>
                          </Stack>
                          <Stack spacing={6}>
                            <Button
                              mt={4}
                              isLoading={isSubmitting}
                              type={"submit"}
                              mx={"auto"}
                              w={"50%"}
                              colorScheme={"blue"}
                              variant={"solid"}
                            >
                              Sign in
                            </Button>
                          </Stack>
                        </Form>
                      )}
                    </Formik>
                  </Stack>
                </Flex>
              </AlertDialogBody>
              <AlertDialogFooter bgColor={"blue.800"}>
                <Flex mx={"auto"} flexDirection={"column"}>
                  <Box color={"white"}>Don't have an account?</Box>
                  <Link
                    mx={"auto"}
                    color={"blue.300"}
                    onClick={() => {
                      setIsOpen2(true);
                    }}
                  >
                    Create one
                  </Link>
                  <AlertDialog
                    size={"lg"}
                    closeOnOverlayClick={true}
                    motionPreset={"scale"}
                    isCentered={true}
                    colorScheme={"linkedin"}
                    isOpen={isOpen2}
                    leastDestructiveRef={cancelRef2}
                    onClose={onClose2}
                  >
                    <AlertDialogOverlay>
                      <AlertDialogContent>
                        <AlertDialogHeader
                          padding={"6"}
                          justifyContent={"center"}
                          bgColor={"blue.500"}
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
                          Register
                        </AlertDialogHeader>

                        <AlertDialogBody paddingY={"1"} bgColor={"white"}>
                          <Flex
                            p={8}
                            flex={1}
                            align={"center"}
                            justify={"center"}
                          >
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
                                  }
                                }}
                              >
                                {({ isSubmitting }) => (
                                  <Form>
                                    <InputField
                                      name="firstName"
                                      placeholder="First name"
                                      label="First Name"
                                    />
                                    <InputField
                                      name="lastName"
                                      placeholder="Last name"
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
                                        direction={{
                                          base: "column",
                                          sm: "row",
                                        }}
                                        align={"start"}
                                        justify={"space-between"}
                                      >
                                        <Checkbox>Remember me</Checkbox>
                                        <Link color={"blue.500"}>
                                          Forgot password?
                                        </Link>
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
                            ref={cancelRef2}
                            onClick={onClose2}
                          >
                            Cancel
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
      ) : null}
      <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={4} w={"full"} maxW={"md"}>
            <Heading fontSize={"2xl"}>Become a worker</Heading>
            <Formik
              initialValues={{
                phone: "",
                city: "",
                sexe: "",
                year: "",
                month: "",
                day: "",
                description: "",
              }}
              onSubmit={async (values, { setErrors }) => {
                const response = await registerWorker({
                  options: {
                    phone: values.phone,
                    city: values.city,
                    sexe: values.sexe,
                    dateOfBirth: new Date(
                      `${values.year}-${values.month}-${values.day}`
                    ),
                    description: values.description,
                    // job: values.job,
                    // title: values.title,
                    // jobDescription: values.jobDescription,
                    // price: values.price,
                    // duration: values.duration,
                  },
                });
                if (
                  values.day == "" ||
                  values.month == "" ||
                  values.year == ""
                ) {
                  setDisplay("");
                } else {
                  setDisplay("none");
                }

                if (response.data?.registerWorker.errors) {
                  setErrors(toErrorMap(response.data.registerWorker.errors));
                } else if (response.data?.registerWorker.worker) {
                  router.push({
                    pathname: "/profile",
                    query: { id: response.data.registerWorker.worker.id },
                  });
                }
              }}
            >
              {({ isSubmitting, errors, values }) => {
                return (
                  <Form>
                    <InputField
                      name="phone"
                      placeholder="phone"
                      label="phone"
                    />
                    <FormLabel htmlFor="city">City :</FormLabel>
                    <Field
                      name="city"
                      options={cityOptions}
                      component={SelectField}
                      placeholder="Select your city..."
                      isMulti={false}
                    />
                    {errors ? <Box color="red">{errors.city}</Box> : null}

                    <FormLabel htmlFor="sexe">Sexe :</FormLabel>
                    <Field
                      name="sexe"
                      options={[
                        { label: "Male", value: "Male" },
                        { label: "Female", value: "Female" },
                      ]}
                      component={SelectField}
                      placeholder="Select your gender..."
                      isMulti={false}
                    />
                    {errors ? <Box color="red">{errors.sexe}</Box> : null}

                    {/* <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date as Date)}
                    /> */}

                    <FormLabel htmlFor="Date of birth">
                      Date of birth :
                    </FormLabel>
                    <Flex
                      name="dateOfBirth"
                      width={"full"}
                      flexDirection={"row"}
                    >
                      <Box width={"33%"}>
                        <Field
                          name="year"
                          options={yearOptions}
                          component={SelectField}
                          placeholder="Year..."
                          isMulti={false}
                        />
                      </Box>
                      <Box width={"33%"}>
                        <Field
                          name="month"
                          options={monthOptions}
                          component={SelectField}
                          placeholder="Month..."
                          isMulti={false}
                        />
                      </Box>
                      <Box width={"33%"}>
                        <Field
                          name="day"
                          options={dayOptions(values.year, values.month)}
                          component={SelectField}
                          placeholder="Day..."
                          isMulti={false}
                        />
                      </Box>
                    </Flex>

                    <Box display={display} color="red">
                      Date of birth required
                    </Box>

                    <Box></Box>
                    <InputField
                      textarea
                      name="description"
                      placeholder="Description"
                      label="Description"
                    />

                    <Stack mt={4} spacing={6}>
                      <Button
                        isLoading={isSubmitting}
                        type={"submit"}
                        mx={"auto"}
                        w={"50%"}
                        colorScheme={"blue"}
                        variant={"solid"}
                        onClick={() => {}}
                      >
                        Sign up
                      </Button>
                    </Stack>
                  </Form>
                );
              }}
            </Formik>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={"Login Image"}
            objectFit={"cover"}
            src={
              "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
            }
          />
        </Flex>
      </Stack>
    </Layout>
  );
};
export default withUrqlClient(createUrqlClient)(RegisterWorker);

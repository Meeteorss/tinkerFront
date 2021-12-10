import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
  Button,
  Flex,
  FormLabel,
  Heading,
  Link,
  Stack,
  Image,
  Box,
} from "@chakra-ui/react";

import { useRouter } from "next/router";
import InputField from "../components/Fields/InputField";
import { Layout } from "../components/Layout";
import {
  useMeQuery,
  useRegisterWorkerMutation,
  useSendConfirmationEmailMutation,
} from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import SelectField from "../components/Fields/SelectField";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

import {
  cityOptions,
  dayOptions,
  monthOptions,
  yearOptions,
  _28dayOptions,
  _29dayOptions,
  _30dayOptions,
  _31dayOptions,
} from "../utils/selectOptions";
import Head from "next/head";
import Login from "../components/Login";
import ConnectionPopup from "../components/ConnectionPopup";

const validateDate = require("validate-date");

export interface FormValues {
  singleJob: string;
  multiJobs: string[];
}

const RegisterWorker = () => {
  const [, registerWorker] = useRegisterWorkerMutation();
  const router = useRouter();
  const [{ data, fetching }] = useMeQuery();
  const [userId, setUserId] = useState("");

  const [, sendConfirmationEmail] = useSendConfirmationEmailMutation();
  const [display, setDisplay] = useState("none");
  const [disabled, setDisabled] = useState(false);
  const [invalidDateDisplay, setInvalidDateDisplay] = useState("none");

  useEffect(() => {
    if (!fetching) {
      // if (!data?.me) {
      //   router.push({
      //     pathname: "/login",
      //     query: { next: router.route },
      //   });
      // }
      if (data?.me?.isWorker) {
        setUserId(data.me.id);
        router.push({
          pathname: "/profile",
          query: { id: userId, action: "info" },
        });
      }
    }
  }, [fetching, data, data?.me, router]);
  if (fetching) {
    return <Box>loading ...</Box>;
  } else if (data?.me && !data?.me?.confirmed) {
    return (
      <Layout>
        <Head>
          <title>Devenir un Pro</title>
        </Head>
        <Box
          textAlign={"center"}
          p={"20"}
          minH={"800"}
          maxW={"1400"}
          mx={"auto"}
        >
          <Box
            rounded={"sm"}
            px={"12"}
            py={"8"}
            bgColor={"betaWhite"}
            shadow={"lg"}
            fontSize={"xl"}
            fontWeight={"bold"}
          >
            Veuillez confirmer votre email ,nous avons envoyé un email de
            vérifaction à {data.me.email}.
            <Button
              fontSize={"lg"}
              fontWeight={"semibold"}
              color={"alphaBlue"}
              as={Link}
              disabled={disabled}
              _disabled={{ cursor: "pointer" }}
              onClick={() => {
                if (!disabled) {
                  sendConfirmationEmail();
                }

                setDisabled(true);
                setTimeout(() => setDisabled(false), 180000);
              }}
            >
              Envoyer un nouveau email?
            </Button>
          </Box>
        </Box>
      </Layout>
    );
  }
  // else if (!data?.me) {
  //   return (
  //     <Layout>
  //       <Login />
  //     </Layout>
  //   );
  // }

  return (
    <Layout>
      <Head>
        <title>Devenir un Pro</title>
      </Head>
      {!data?.me ? <ConnectionPopup isOpenProp={true} /> : null}

      <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={4} w={"full"} maxW={"md"}>
            <Heading fontSize={"2xl"}>Devenir un Pro</Heading>
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
                if (
                  values.day == "" ||
                  values.month == "" ||
                  values.year == ""
                ) {
                  setDisplay("");
                } else {
                  setDisplay("none");
                }
                if (
                  validateDate(
                    `${values.month}/${values.day}/${values.year}`
                  ) != "Valid Date"
                ) {
                  setInvalidDateDisplay("flex");
                } else {
                  const response = await registerWorker({
                    options: {
                      phone: values.phone,
                      city: values.city,
                      sexe: values.sexe,
                      dateOfBirth: new Date(
                        `${values.year}-${values.month}-${values.day}`
                      ),
                      description: values.description,
                    },
                  });
                  if (response.data?.registerWorker.errors) {
                    setErrors(toErrorMap(response.data.registerWorker.errors));
                  } else if (response.data?.registerWorker.worker) {
                    router.push({
                      pathname: "/profile",
                      query: { id: response.data.registerWorker.worker.id },
                    });
                  }
                }
              }}
            >
              {({ isSubmitting, errors, values }) => {
                return (
                  <Form>
                    <InputField
                      name="phone"
                      placeholder="Numéro de téléphone"
                      label="phone"
                    />
                    <FormLabel htmlFor="city">Ville :</FormLabel>
                    <Field
                      name="city"
                      options={cityOptions}
                      component={SelectField}
                      placeholder="Sélectionne votre ville d'activité..."
                      isMulti={false}
                    />
                    {errors ? <Box color="red">{errors.city}</Box> : null}

                    <FormLabel htmlFor="sexe">Genre :</FormLabel>
                    <Field
                      name="sexe"
                      options={[
                        { label: "Homme", value: "Male" },
                        { label: "Femme", value: "Female" },
                      ]}
                      component={SelectField}
                      placeholder="Homme ou Femme?..."
                      isMulti={false}
                    />
                    {errors ? <Box color="red">{errors.sexe}</Box> : null}

                    <FormLabel htmlFor="Date of birth">
                      Date de naissance :
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
                          placeholder="Année..."
                          isMulti={false}
                        />
                      </Box>
                      <Box width={"33%"}>
                        <Field
                          name="month"
                          options={monthOptions}
                          component={SelectField}
                          placeholder="Mois..."
                          isMulti={false}
                        />
                      </Box>
                      <Box width={"33%"}>
                        <Field
                          name="day"
                          options={dayOptions(values.year, values.month)}
                          component={SelectField}
                          placeholder="Jour..."
                          isMulti={false}
                        />
                      </Box>
                    </Flex>

                    <Box display={display} color="red">
                      Date de naissance obligatoire
                    </Box>
                    <Box display={invalidDateDisplay} color="red">
                      Date de naissance est invalide
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

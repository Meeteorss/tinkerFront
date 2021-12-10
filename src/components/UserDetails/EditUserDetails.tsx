import {
  Box,
  Button,
  Flex,
  Text,
  Link,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Formik, Form, Field as FormikField } from "formik";
import { useRouter } from "next/router";
import * as React from "react";
import { useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";

import { useUpdateWorkerMutation } from "../../generated/graphql";
import { Card } from "./Card";
import { CardContent } from "./CardContent";
import { CardHeader } from "./CardHeader";
import { EditField } from "./EditField";
import { Field } from "./Field";
import { CheckIcon } from "@chakra-ui/icons";
import { toErrorMap } from "../../utils/toErrorMap";
import { UploadField } from "../Fields/UploadField";
import SelectField from "../Fields/SelectField";

import {
  cityOptions,
  dayOptions,
  monthOptions,
  yearOptions,
  _28dayOptions,
  _29dayOptions,
  _30dayOptions,
  _31dayOptions,
} from "../../utils/selectOptions";
import { formatMonthOrDay } from "../../utils/formatTime";
// import validateDate from "validate-date";
const validateDate = require("validate-date");

export const EditUserDetails = ({ worker }: { worker: any }) => {
  const router = useRouter();
  const [, updateWorker] = useUpdateWorkerMutation();
  const [dateErrorDisplay, setDateErrorDisplay] = useState("none");
  const [file, setFile] = useState([] as any);
  const updateRef = useRef<HTMLButtonElement>(null);
  if (!worker) {
    return <Box> 404 Not found</Box>;
  }
  const handleUpdateRef = () => {
    updateRef.current?.click();
  };

  return (
    <Card w={{ base: "100%", xl: 1200 }}>
      <CardHeader
        title="Editer Mes Informations"
        action={
          <>
            <Button
              onClick={handleUpdateRef}
              bg={"gray.100"}
              color={"black"}
              minW="20"
              leftIcon={<CheckIcon />}
            >
              Confirmer
            </Button>
            <Button
              ml={"4"}
              bg={"gray.100"}
              color={"black"}
              minW="20"
              leftIcon={<IoMdClose />}
              onClick={() =>
                router.push({
                  pathname: "/profile",
                  query: { id: worker.id, action: "info" },
                })
              }
            >
              Annuler
            </Button>
          </>
        }
      />
      <CardContent maxW={1000}>
        <Flex
          w={"100%"}
          fontWeight={"semibold"}
          as="dl"
          direction={{ base: "column", sm: "row" }}
          mt={"4"}
          px="6"
          py="4"
          _even={{ bg: "gray.100" }}
        >
          <Box my={"auto"} minWidth="180px">
            <Text>Photo de profil:</Text>
          </Box>
          <Flex flex="1" fontWeight="semibold">
            {/* <Box>
              <Avatar
                size={"2xl"}
                src={newImgSrc}
                _hover={{ cursor: "pointer" }}
              />
            </Box> */}
            <UploadField worker={worker} f={file} />
          </Flex>
        </Flex>
        <Formik
          initialValues={{
            firstName: worker.firstName,
            lastName: worker.lastName,
            email: worker.email,
            phone: worker.phone,
            city: worker.city,
            sexe: worker.sexe,
            year: new Date(worker.dateOfBirth).getFullYear().toString(),
            month: formatMonthOrDay(
              (new Date(worker.dateOfBirth).getMonth() + 1).toString()
            ),
            day: formatMonthOrDay(
              new Date(worker.dateOfBirth).getDate().toString()
            ),
            description: worker.description,
          }}
          onSubmit={async (values, { setErrors }) => {
            if (
              validateDate(`${values.month}/${values.day}/${values.year}`) !=
              "Date invalide."
            ) {
              setDateErrorDisplay("flex");
            } else {
              const response = await updateWorker({
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
              if (response.data?.updateWorker.errors) {
                setErrors(toErrorMap(response.data.updateWorker.errors));
              } else if (response.data?.updateWorker.worker) {
                router.push({
                  pathname: "/profile",
                  query: { id: worker.id, action: "info" },
                });
              }
            }
          }}
        >
          {({ isSubmitting, values, errors }) => {
            return (
              <Form>
                <Field
                  label="Prénom:"
                  value={worker.firstName}
                  isDisabled={true}
                />
                <Field label="Nom:" value={worker.lastName} isDisabled={true} />
                <Field
                  label="Nom d'utilisateur:"
                  value={worker.userName}
                  isDisabled={true}
                />
                <Flex flexDirection={"column"}>
                  <Field
                    label="Email:"
                    value={worker.email}
                    isDisabled={true}
                  />
                  <Box as={Link} color={"blue"} ml={"auto"}>
                    <Box
                      onClick={() => {
                        router.push({
                          pathname: "/change_email",
                          query: { id: worker.id, action: "change_email" },
                        });
                      }}
                      mt={-4}
                      mr={6}
                    >
                      Changer email ?
                    </Box>
                  </Box>
                </Flex>
                <Flex flexDirection={"column"}>
                  <Field
                    label="Mot de passe:"
                    value={"**********"}
                    isDisabled={true}
                  />
                  <Box as={Link} color={"blue"} ml={"auto"}>
                    <Box
                      mt={-4}
                      mr={6}
                      onClick={() => {
                        router.push({
                          pathname: "/change_password",
                          query: { id: worker.id, action: "change_password" },
                        });
                      }}
                    >
                      Changer Le mot de passe ?
                    </Box>
                  </Box>
                </Flex>

                <EditField name="phone" label="Numero de téléphone:" />

                <Flex
                  as="dl"
                  direction={{ base: "column", sm: "row" }}
                  px="6"
                  py="4"
                  alignItems={{ base: "normal", sm: "center" }}
                >
                  <Box fontWeight="semibold" as="dt" minWidth="180px">
                    {"Ville:"}
                  </Box>
                  <Box as="dd" flex="1" fontWeight="semibold">
                    <FormikField
                      name="city"
                      options={cityOptions}
                      component={SelectField}
                      placeholder="Sélectionner une ville..."
                      isMulti={false}
                    />
                    {errors ? (
                      <FormErrorMessage>{errors}</FormErrorMessage>
                    ) : null}
                  </Box>
                </Flex>
                <Flex
                  as="dl"
                  direction={{ base: "column", sm: "row" }}
                  px="6"
                  py="4"
                  alignItems={{ base: "normal", sm: "center" }}
                >
                  <Box fontWeight="semibold" as="dt" minWidth="180px">
                    {"Date de naissance:"}
                  </Box>
                  <Flex w={"full"} flexDirection={"column"}>
                    <Flex flexDirection={"row"}>
                      <Box width={"33%"} mr={1}>
                        <FormikField
                          name="year"
                          options={yearOptions}
                          component={SelectField}
                          placeholder="Année..."
                          isMulti={false}
                        />
                        {errors ? <Box color="red">{errors.city}</Box> : null}
                      </Box>
                      <Box width={"33%"} mr={1}>
                        <FormikField
                          name="month"
                          options={monthOptions}
                          component={SelectField}
                          placeholder="Mois..."
                          isMulti={false}
                        />
                        {errors ? <Box color="red">{errors.city}</Box> : null}
                      </Box>
                      <Box width={"33%"}>
                        <FormikField
                          name="day"
                          options={dayOptions(values.year, values.month)}
                          component={SelectField}
                          placeholder="Jour..."
                          isMulti={false}
                        />
                        {errors ? <Box color="red">{errors.city}</Box> : null}
                      </Box>
                    </Flex>
                    <Box display={dateErrorDisplay} color={"red"}>
                      {" "}
                      Date invalide.
                    </Box>
                  </Flex>
                </Flex>

                <EditField textarea name="description" label="Description:" />

                <Flex
                  py={"10"}
                  w={"fit-content"}
                  mx={"auto"}
                  flexDirection={"row"}
                >
                  <Button
                    // display={"none"}
                    ref={updateRef}
                    isLoading={isSubmitting}
                    type={"submit"}
                    bgColor={"alphaBlue"}
                    color={"white"}
                    _hover={{ bgColor: "blue.800" }}
                    w={"fit-content"}
                    variant={"solid"}
                    mr={"4"}
                  >
                    Mettre à jour
                  </Button>
                  <Button
                    // display={"none"}
                    isLoading={isSubmitting}
                    type={"submit"}
                    bgColor={"white"}
                    border={"1px"}
                    color={"red.500"}
                    borderColor={"red.500"}
                    _hover={{ bgColor: "red.500", color: "white" }}
                    w={"fit-content"}
                    variant={"solid"}
                    onClick={() =>
                      router.push({
                        pathname: "/profile",
                        query: { id: worker.id, action: "info" },
                      })
                    }
                  >
                    Annuler
                  </Button>
                </Flex>
              </Form>
            );
          }}
        </Formik>
      </CardContent>
    </Card>
  );
};

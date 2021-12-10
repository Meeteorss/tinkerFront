import { CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormErrorMessage,
  FormLabel,
  Text,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import {
  useCreateSkillS1Mutation,
  useCreateSkillS2Mutation,
  useCreateSkillS3Mutation,
} from "../../generated/graphql";

import { cityOptions, durationOptions } from "../../utils/selectOptions";
import { toErrorMap } from "../../utils/toErrorMap";
import InputField from "../Fields/InputField";

import { PicturesField } from "../Fields/PicturesField";
import SelectField from "../Fields/SelectField";
import { Card } from "./Card";
import { CardContent } from "./CardContent";
import { CardHeader } from "./CardHeader";
import { EditField } from "./EditField";

const jobOptions = [
  { label: "Developper", value: "Developper" },
  { label: "Editor", value: "Editor" },
  { label: "Chef", value: "Chef" },
  { label: "Plumber", value: "Plumber" },
  { label: "Electrician", value: "Electrician" },
];

export const CreateSkill = ({ worker }: any) => {
  const router = useRouter();
  const [, createSkillS1] = useCreateSkillS1Mutation();
  const [, createSkillS2] = useCreateSkillS2Mutation();
  const [, createSkillS3] = useCreateSkillS3Mutation();
  const updateRef = useRef<HTMLButtonElement>(null);
  const [file, setFile] = useState([] as any);
  const handleUpdateRef = () => {
    updateRef.current?.click();
  };
  const [skill, setSkill] = useState(null as any);

  const [step1V, setStep1V] = useState(true);
  const [step2V, setStep2V] = useState(false);
  const [step3V, setStep3V] = useState(false);
  const [step4V, setStep4V] = useState(false);
  const [titleError, setTitleError] = useState("none");
  const [skillId, setSkillId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  return (
    <Card w={{ base: "100%", xl: 1000 }}>
      <CardHeader
        title="Ajouter un nouveau Skill"
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
                  query: { id: worker.id, action: "info" },
                })
              }
            >
              Retour
            </Button>
          </>
        }
      />
      <CardContent>
        <Box maxW={700} display={step1V ? "" : "none"}>
          <Formik
            initialValues={{
              category: "",
              title: "",
              zone: "",
            }}
            onSubmit={async (values, { setErrors }) => {
              const res = await createSkillS1({ options: values });
              if (res.data?.createSkillS1.errors) {
                setErrors(toErrorMap(res.data.createSkillS1.errors));
              } else if (res.data?.createSkillS1.skill) {
                setSkillId(res.data.createSkillS1.skill.id);
                setStep1V(false);
                setStep2V(true);
                setSkill(res.data.createSkillS1);
              }
            }}
          >
            {({ isSubmitting, errors, values }) => {
              return (
                <Form>
                  <Flex
                    as="dl"
                    direction={{ base: "column", sm: "row" }}
                    px="6"
                    py="4"
                  >
                    <Box fontWeight="semibold" as="dt" minWidth="180px">
                      {"Catégorie:"}
                    </Box>
                    <Box as="dd" flex="1" fontWeight="semibold">
                      <Field
                        name="category"
                        options={jobOptions}
                        component={SelectField}
                        placeholder="Selectionner une catégorie..."
                        isMulti={false}
                      />

                      {errors.category ? (
                        <Box color="red">{errors.category}</Box>
                      ) : null}
                    </Box>
                  </Flex>
                  <Flex
                    as="dl"
                    direction={{ base: "column", sm: "row" }}
                    px="6"
                    py="4"
                  >
                    <Box fontWeight="semibold" as="dt" minWidth="180px">
                      {"Ville:"}
                    </Box>
                    <Box as="dd" flex="1" fontWeight="semibold">
                      <Field
                        name="zone"
                        options={cityOptions}
                        component={SelectField}
                        placeholder="Selectionner ville d'activité..."
                        isMulti={false}
                      />
                      {errors ? <Box color={"red"}>{errors.zone}</Box> : null}
                    </Box>
                  </Flex>
                  <EditField name="title" label="Titre:" />

                  <Flex maxW={90} ml={"auto"}>
                    <Button
                      type={"submit"}
                      color={"white"}
                      bgColor={"blue.700"}
                      variant={"solid"}
                      _hover={{ color: "white", bgColor: "blue.900" }}
                      isLoading={isSubmitting}
                    >
                      Suivant
                    </Button>
                  </Flex>
                </Form>
              );
            }}
          </Formik>
        </Box>

        <Box maxW={700} display={step2V ? "" : "none"}>
          <Formik
            initialValues={{
              description: "",
            }}
            onSubmit={async (values, { setErrors }) => {
              const res = await createSkillS2({
                options: values,
                skillId: skillId,
              });
              if (res.data?.createSkillS2.errors) {
                setErrors(toErrorMap(res.data.createSkillS2.errors));
              } else if (res.data?.createSkillS2.skill) {
                setStep2V(false);
                setStep3V(true);
              }
            }}
          >
            {({ isSubmitting, errors, values }) => {
              return (
                <Form>
                  <EditField textarea name="description" label="Déscription:" />

                  <Flex maxW={100} ml={"auto"}>
                    <Button
                      color={"white"}
                      bgColor={"blue.700"}
                      variant={"solid"}
                      type={"submit"}
                      _hover={{ color: "white", bgColor: "blue.900" }}
                    >
                      Suivant
                    </Button>
                  </Flex>
                </Form>
              );
            }}
          </Formik>
        </Box>

        {/* Ste3 3 */}

        <Box maxW={700} display={step3V ? "" : "none"}>
          <Formik
            initialValues={{
              pricing: "",
              duration: 32 * 24,
            }}
            onSubmit={async (values, { setErrors }) => {
              const res = await createSkillS3({
                options: values,
                skillId: skillId,
              });
              if (res.data?.createSkillS3.errors) {
                setErrors(toErrorMap(res.data.createSkillS3.errors));
              } else if (res.data?.createSkillS3.skill) {
                setStep3V(false);
                setStep4V(true);
              }
            }}
          >
            {({ isSubmitting, errors, values }) => {
              return (
                <Form>
                  <EditField name="pricing" label="Prix:" />
                  {true ? <Box color={"red"}>{errors.pricing}</Box> : null}
                  <Flex
                    as="dl"
                    direction={{ base: "column", sm: "row" }}
                    px="6"
                    py="4"
                  >
                    <Box fontWeight="semibold" as="dt" minWidth="180px">
                      {"Durée de livraison:"}
                    </Box>
                    <Box as="dd" flex="1" fontWeight="semibold">
                      <Field
                        name="duration"
                        options={durationOptions}
                        component={SelectField}
                        placeholder="Durée de livraison..."
                        isMulti={false}
                      />
                      {errors ? (
                        <Box color={"red"}>{errors.duration}</Box>
                      ) : null}
                    </Box>
                  </Flex>

                  <Flex maxW={100} ml={"auto"}>
                    <Button
                      color={"white"}
                      bgColor={"blue.700"}
                      variant={"solid"}
                      type={"submit"}
                      _hover={{ color: "white", bgColor: "blue.900" }}
                    >
                      Suivant
                    </Button>
                  </Flex>
                </Form>
              );
            }}
          </Formik>
        </Box>

        {/* step 4 */}
        <Box maxW={700} display={step4V ? "" : "none"}>
          <Flex
            mx={"auto"}
            direction={{ base: "column", sm: "row" }}
            px="6"
            py="4"
          >
            <Box fontWeight="semibold" minWidth="180px">
              <Text>Photos:</Text>
            </Box>
            <Flex flex="1" fontWeight="semibold">
              <PicturesField
                skillId={skillId}
                index={0}
                worker={worker}
                f={file}
              />
              <PicturesField
                skillId={skillId}
                index={1}
                worker={worker}
                f={file}
              />
              <PicturesField
                skillId={skillId}
                index={2}
                worker={worker}
                f={file}
              />
              <PicturesField
                skillId={skillId}
                index={3}
                worker={worker}
                f={file}
              />
            </Flex>
          </Flex>
          <Flex maxW={100} ml={"auto"}>
            <Button
              color={"white"}
              bgColor={"blue.700"}
              variant={"solid"}
              type={"submit"}
              _hover={{ color: "white", bgColor: "blue.900" }}
              onClick={() => {
                router.push({
                  pathname: "/profile/skills",
                  query: { id: worker.id, action: "skills" },
                });
              }}
            >
              Créer
            </Button>
          </Flex>
        </Box>
      </CardContent>
    </Card>
  );
};

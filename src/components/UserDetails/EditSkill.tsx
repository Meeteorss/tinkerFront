import { Button } from "@chakra-ui/button";
import { CheckIcon } from "@chakra-ui/icons";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useUpdateSkillMutation } from "../../generated/graphql";
import {
  cityOptions,
  durationOptions,
  jobOptions,
} from "../../utils/selectOptions";

import { toErrorMap } from "../../utils/toErrorMap";

import { PicturesField } from "../Fields/PicturesField";
import SelectField from "../Fields/SelectField";
import { Card } from "./Card";
import { CardContent } from "./CardContent";
import { CardHeader } from "./CardHeader";
import { EditField } from "./EditField";

export const EditSkill = ({ skill, worker }: any) => {
  const router = useRouter();
  const [, updateSkill] = useUpdateSkillMutation();
  const updateRef = useRef<HTMLButtonElement>(null);
  const handleUpdateRef = () => {
    updateRef.current?.click();
  };
  const [file, setFile] = useState([] as any);
  return (
    <Card pb={"40"} w={{ base: "100%", xl: 1000 }}>
      <CardHeader
        title="Edit Skill"
        action={
          <>
            <Button
              onClick={handleUpdateRef}
              bg={"gray.100"}
              color={"black"}
              minW="20"
              leftIcon={<CheckIcon />}
            >
              Update
            </Button>
            <Button
              ml={"4"}
              bg={"gray.100"}
              color={"black"}
              minW="20"
              leftIcon={<IoMdClose />}
              onClick={() =>
                router.push({
                  pathname: "/profile/skills",
                  query: { id: worker.id, action: "skills" },
                })
              }
            >
              Return
            </Button>
          </>
        }
      />
      <CardContent>
        <Formik
          initialValues={{
            category: skill.category,
            title: skill.title,
            description: skill.description,
            zone: skill.zone,
            pricing: skill.pricing ? skill.pricing.toString() : "",
            duration: skill.duration,
          }}
          onSubmit={async (values, { setErrors }) => {
            const res = await updateSkill({
              options: values,
              skillId: skill.id,
            });
            if (res.data?.updateSkill.errors) {
              setErrors(toErrorMap(res.data.updateSkill.errors));
            } else if (res.data?.updateSkill.skill) {
              router.push({
                pathname: "/profile/skills",
                query: { id: worker.id, action: "skills" },
              });
            }
          }}
        >
          {({ values, errors, isSubmitting }) => {
            return (
              <Form>
                <EditField name="title" label="Title:" />
                <Flex
                  as="dl"
                  direction={{ base: "column", sm: "row" }}
                  px="6"
                  py="4"
                >
                  <Box fontWeight="semibold" as="dt" minWidth="180px">
                    {"Category:"}
                  </Box>
                  <Box maxW="200" as="dd" flex="1" fontWeight="semibold">
                    <Field
                      name="category"
                      options={jobOptions}
                      component={SelectField}
                      placeholder="Category..."
                      isMulti={false}
                    />
                    {errors ? <Box color={"red"}>{errors.category}</Box> : null}
                  </Box>
                </Flex>
                <EditField textarea name="description" label="Description:" />
                <Flex
                  as="dl"
                  direction={{ base: "column", sm: "row" }}
                  px="6"
                  py="4"
                >
                  <Box fontWeight="semibold" as="dt" minWidth="180px">
                    {"City:"}
                  </Box>
                  <Box maxW={"200"} as="dd" flex="1" fontWeight="semibold">
                    <Field
                      name="zone"
                      options={cityOptions}
                      component={SelectField}
                      placeholder="City..."
                      isMulti={false}
                    />
                    {errors ? <Box color={"red"}>{errors.zone}</Box> : null}
                  </Box>
                </Flex>
                <EditField name="pricing" label="Pricing:" />
                {errors ? <Box color={"red"}>{errors.pricing}</Box> : null}
                <Flex
                  as="dl"
                  direction={{ base: "column", sm: "row" }}
                  px="6"
                  py="4"
                >
                  <Box fontWeight="semibold" as="dt" minWidth="180px">
                    {"Delivry Time:"}
                  </Box>
                  <Box maxW={"200"} as="dd" flex="1" fontWeight="semibold">
                    <Field
                      name="duration"
                      options={durationOptions}
                      component={SelectField}
                      placeholder="Delivery time..."
                      isMulti={false}
                    />
                    {errors ? <Box color={"red"}>{errors.duration}</Box> : null}
                  </Box>
                </Flex>
                <Button
                  display={"none"}
                  ref={updateRef}
                  isLoading={isSubmitting}
                  type={"submit"}
                  mx={"auto"}
                  w={"70%"}
                  colorScheme={"blue"}
                  variant={"solid"}
                >
                  Update
                </Button>
              </Form>
            );
          }}
        </Formik>
        <Flex
          mx={"auto"}
          direction={{ base: "column", sm: "row" }}
          px="6"
          py="4"
        >
          <Box fontWeight="semibold" minWidth="180px">
            <Text>Pictures:</Text>
          </Box>
          <Flex flex="1" fontWeight="semibold">
            <PicturesField
              skill={skill}
              skillId={skill.id}
              index={0}
              worker={worker}
              f={file}
            />
            <PicturesField
              skill={skill}
              skillId={skill.id}
              index={1}
              worker={worker}
              f={file}
            />
            <PicturesField
              skill={skill}
              skillId={skill.id}
              index={2}
              worker={worker}
              f={file}
            />
            <PicturesField
              skill={skill}
              skillId={skill.id}
              index={3}
              worker={worker}
              f={file}
            />
          </Flex>
        </Flex>
      </CardContent>
    </Card>
  );
};

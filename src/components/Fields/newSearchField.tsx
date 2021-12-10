import {
  Flex,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import { Formik, Form, Field, useField } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { cityOptions, jobOptions } from "../../utils/selectOptions";
import SelectField, { SelectFieldProps } from "./SelectField";

type inputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
};

const MyInputField: React.FC<inputFieldProps> = ({ label, size, ...props }) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <Input
        h={"38px"}
        bg={"white"}
        borderColor="transparent"
        {...field}
        {...props}
        id={field.name}
        placeholder={props.placeholder}
      />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export const NewSearchField = ({
  fn,
  initialValues,
}: {
  fn: () => void;
  initialValues?: any;
}) => {
  const router = useRouter();
  const [display, setDisplay] = useState("none");
  jobOptions.sort((e1, e2) => e1.label.localeCompare(e2.label));

  return (
    <Formik
      initialValues={
        initialValues
          ? {
              category: initialValues.category,
              city: initialValues.city,
              keyword: initialValues.keyword,
            }
          : { category: "", city: "", keyword: "" }
      }
      onSubmit={async (values) => {
        if (
          (values.city == "" || values.city == "Everywhere") &&
          values.category == "" &&
          values.keyword == ""
        ) {
          // router.reload();

          setDisplay("");
        } else {
          router.push({
            pathname: "/search/result",
            query: {
              category: values.category,
              city: values.city,
              keyword: values.keyword,
              orderBy: "rating",
            },
          });
          fn();
        }
      }}
    >
      <Form>
        <Flex
          rounded={"md"}
          flexDirection={{ base: "column", sm: "row" }}
          bg="alpha"
          py={4}
        >
          <Box
            border={"8px"}
            borderLeft={{ base: "ppx", sm: "none" }}
            borderColor={"alpha"}
            rounded="lg"
            w={"100%"}
          >
            <MyInputField name="keyword" placeholder="Rechercher..." />
          </Box>

          <Box border={"8px"} borderColor={"alpha"} rounded="lg" w={"100%"}>
            <Field
              name="category"
              options={jobOptions}
              component={SelectField}
              placeholder="Selectionner une catégorie..."
              isMulti={false}
            />
          </Box>

          <Box border={"8px"} borderColor={"alpha"} rounded="lg" w={"100%"}>
            <Field
              name="city"
              options={cityOptions}
              component={SelectField}
              placeholder="Selectionner une ville..."
              isMulti={false}
            />
          </Box>

          <Button
            ml={2}
            maxW={"24"}
            type={"submit"}
            rounded={"lg"}
            size={"lsm"}
            fontWeight={"normal"}
            px={6}
            h={10}
            my={"auto"}
            bg={"black"}
            color={"white"}
            _hover={{ bg: "blue.900" }}
          >
            Rechercher
          </Button>
        </Flex>
        <Box position={"absolute"} ml={6} display={display} color={"red"}>
          {" "}
          Entrez au moins un critère de recherche .{" "}
        </Box>
      </Form>
    </Formik>
  );
};

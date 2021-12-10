import { Box, Link } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import InputField from "../../components/Fields/InputField";
import { Layout } from "../../components/Layout";
import {
  useChangePasswordMutation,
  useForgetPasswordMutation,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { toErrorMap } from "../../utils/toErrorMap";

const forgot_password = () => {
  const router = useRouter();
  const [, forgetPassword] = useForgetPasswordMutation();
  const [complete, setComplete] = useState(false);
  return (
    <>
      <Head>
        <title>Récuperer mon mot de passe</title>
      </Head>
      <Box mt={"24"}>
        <Box w={"50%"} mx={"auto"}>
          <Formik
            initialValues={{ email: "" }}
            onSubmit={async (values, { setErrors }) => {
              const resp = await forgetPassword({ email: values.email });
              setComplete(true);
            }}
          >
            {({ isSubmitting, values }) =>
              complete ? (
                <Box>An email has been sent to {values.email} </Box>
              ) : (
                <Box mx={"auto"}>
                  <Form>
                    <InputField
                      flex
                      name="email"
                      label={"Email"}
                      placeholder={"Email ..."}
                    />

                    <Button
                      type={"submit"}
                      isLoading={isSubmitting}
                      variant={"solid"}
                      bgColor={"black"}
                      color={"white"}
                      border={"1px"}
                      borderColor={"black"}
                      _hover={{ bgColor: "white", color: "black" }}
                    >
                      Submit
                    </Button>
                  </Form>
                </Box>
              )
            }
          </Formik>
        </Box>
      </Box>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(
  forgot_password
);

import { Button } from "@chakra-ui/button";
import { Box, Link } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import InputField from "../../../components/Fields/InputField";
import { Layout } from "../../../components/Layout";
import { useChangePasswordMutation } from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { toErrorMap } from "../../../utils/toErrorMap";

const token = () => {
  const router = useRouter();
  const { token } = router.query;
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");
  return (
    <Layout>
      <Head>
        <title>Récuperer le mot de passe</title>
      </Head>
      <Formik
        initialValues={{ password: "", confirmedPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          const resp = await changePassword({
            password: values.password,
            confirmedPassword: values.confirmedPassword,
            token: token as string,
          });
          if (resp.data?.changePassword.errors) {
            const errorMap = toErrorMap(resp.data.changePassword.errors);
            if ("token" in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
          } else if (resp.data?.changePassword.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <InputField
              flex
              type={"password"}
              name="password"
              label={"New Password"}
              placeholder={" New Password ..."}
            />
            <InputField
              flex
              type={"password"}
              name="confirmedPassword"
              label={"Confirm Password"}
              placeholder={" Confirm Password ..."}
            />
            {tokenError ? (
              <>
                <Box color={"red"}>{tokenError}</Box>
                <Link>Send a new email</Link>
              </>
            ) : null}
            <Button type={"submit"} isLoading={isSubmitting} variant={"solid"}>
              Change Password
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: false })(token);

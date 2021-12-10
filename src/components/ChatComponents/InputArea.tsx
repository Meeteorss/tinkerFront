import { gql, useMutation } from "@apollo/client";
import { Button } from "@chakra-ui/button";
import { Flex, Stack } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import React from "react";
import InputField from "../Fields/InputField";

const SEND_MESSAGE = gql`
  mutation createChat($recieverId: String!, $message: String!) {
    createChat(recieverId: $recieverId, message: $message) {
      id
      senderId
      recieverId
      message
      createdAt
    }
  }
`;
const InputArea = ({ recieverId }: { recieverId: string }) => {
  const [sendMessage, { data }] = useMutation(SEND_MESSAGE);
  return (
    <Formik
      initialValues={{ message: "" }}
      onSubmit={async (values, { setErrors }) => {
        const response = await sendMessage({
          variables: {
            recieverId: recieverId,
            message: values.message,
          },
        });
        values.message = "";
      }}
    >
      {({ isSubmitting, values, setErrors }) => (
        <Form>
          <Flex pb={10} px={5} flexDirection={"row"}>
            <InputField
              name="message"
              placeholder="Send message ..."
              hideLabel
              chatarea
              //   fn={async (values: any) => {
              //     const response = await sendMessage({
              //       variables: {
              //         recieverId: recieverId,
              //         message: values.message,
              //       },
              //     });
              //     values.message = "";
              //   }}
            />

            <Stack spacing={6}>
              <Button
                mt={4}
                isLoading={isSubmitting}
                type={"submit"}
                mx={"auto"}
                w={"70%"}
                colorScheme={"blue"}
                variant={"solid"}
              >
                Send
              </Button>
            </Stack>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};
export default InputArea;

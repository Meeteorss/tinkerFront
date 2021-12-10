import {
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Flex,
  Box,
  Link,
  Textarea,
  Stack,
  FormControl,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useField } from "formik";
import Rate from "./Rate";
import { useCommentMutation } from "../../generated/graphql";

type inputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  textarea?: boolean;
  showLabel?: boolean;
};

const InputField: React.FC<inputFieldProps> = ({
  label,
  size,
  textarea,
  showLabel,
  ...props
}) => {
  let InputOrTextarea: any = Input;
  if (textarea) {
    InputOrTextarea = Textarea;
  }

  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <InputOrTextarea
        bgColor={"white"}
        {...field}
        {...props}
        id={field.name}
        placeholder={props.placeholder}
      />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

const Feedback = ({ worker, skill }: any) => {
  const [, comment] = useCommentMutation();

  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover isOpen={isOpen}>
      <PopoverTrigger>
        <Button
          justifyItems={"center"}
          fontWeight={"hairline"}
          color={"gray.700"}
          bgColor={"transparent"}
          as={Link}
          onClick={() => setIsOpen(true)}
        >
          Laisses un avis.
        </Button>
      </PopoverTrigger>
      <PopoverContent width={"md"} bgColor={"beta"}>
        <PopoverArrow />
        <PopoverCloseButton onClick={() => setIsOpen(false)} />
        <PopoverHeader
          textAlign={"center"}
          fontWeight={"semibold"}
          bgColor={"alpha"}
        >
          Ce que vous pensez de {worker.userName}
        </PopoverHeader>
        <PopoverBody>
          <Flex flexDirection={"column"}>
            <Flex flexDirection={"row"}>
              <Box mx={"auto"}>
                <Rate worker={worker} />
              </Box>
            </Flex>
            <Flex mt={4} flexDirection={"row"}>
              <Box>Laissez un commentaire</Box>
              <Box w={"full"} mx={"auto"}>
                <Formik
                  initialValues={{ content: "" }}
                  onSubmit={async (values) => {
                    const response = await comment({
                      content: values.content,
                      skillId: skill.id,
                    });
                    setIsOpen(false);
                    // console.log("response", response);
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <InputField
                        textarea
                        name="content"
                        placeholder="Votre commentaire..."
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
                          Envoyer
                        </Button>
                      </Stack>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Flex>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
export default Feedback;

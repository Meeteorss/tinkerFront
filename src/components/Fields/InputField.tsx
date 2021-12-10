import { Input } from "@chakra-ui/input";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  Box,
  Flex,
} from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";

type inputFieldProps = React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    name: string;
    label?: string;
    textarea?: boolean;
    commentarea?: boolean;
    hideLabel?: boolean;
    chatarea?: boolean;
    flex?: boolean;
  };

const InputField: React.FC<inputFieldProps> = ({
  label,
  size,
  textarea,
  commentarea,
  chatarea,
  hideLabel,
  flex,
  style,
  maxLength,
  width,

  ...props
}) => {
  let InputOrTextarea: any = Input;
  if (textarea) {
    InputOrTextarea = Textarea;
  }
  if (commentarea) {
    InputOrTextarea = Textarea;
  }
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <Flex
        flexDirection={flex ? "row" : "column"}
        justifyContent={flex ? "space-between" : "normal"}
        alignItems={flex ? "center" : "normal"}
      >
        {hideLabel ? null : (
          <FormLabel htmlFor={field.name}>{label}:</FormLabel>
        )}
        <Flex flexDirection={"column"}>
          <Box mt={-1} rounded={"md"} bg={"white"}>
            <InputOrTextarea
              {...field}
              {...props}
              height={
                textarea ? "lg" : commentarea ? "4xs" : chatarea ? 20 : 10
              }
              maxLength={commentarea ? "110" : chatarea ? "200" : "1400"}
              width={"full"}
              style={{
                resize: "none",
                borderColor: "gray",
                textAlign: "top",
              }}
              textOverflow={"clip"}
              id={field.name}
              textAlign={"top"}
              placeholder={props.placeholder}
              _placeholder={{ alignItems: "top" }}
              sx={{
                "&::-webkit-scrollbar": { display: "none" },
              }}
            />
          </Box>
          {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </Flex>
      </Flex>
    </FormControl>
  );
};

export default InputField;

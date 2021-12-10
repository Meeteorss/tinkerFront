import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import * as React from "react";
import { useField } from "formik";

type editFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  textarea?: boolean;
  flexColumn?: boolean;
};

export const EditField: React.FC<editFieldProps> = ({
  label,
  size,
  textarea,
  maxLength,
  flexColumn,
  height,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isRequired isInvalid={!!error}>
      <Flex
        as="dl"
        direction={flexColumn ? "column" : { base: "column", sm: "row" }}
        px="6"
        py="4"
        alignItems={"flex-start"}
      >
        <Flex
          textAlign={"center"}
          fontWeight="semibold"
          as="dt"
          minWidth="180px"
        >
          {label}
        </Flex>
        <Box w={"100%"} minHeight={10} as="dd" flex="1" fontWeight="semibold">
          <Input
            as={textarea ? Textarea : undefined}
            bg={"white"}
            maxLength={1400}
            style={{ resize: "none", borderColor: "#d9d9d9", minHeight: 12 }}
            height={textarea ? "sm" : "8"}
            _hover={{ borderColor: "black" }}
            borderColor={"beta"}
            borderRadius={"sm"}
            border={"1px"}
            {...field}
            {...props}
            id={field.name}
            placeholder={props.placeholder}
            sx={{
              "&::-webkit-scrollbar": { display: "none" },
            }}
          />
          {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </Box>
      </Flex>
    </FormControl>
  );
};

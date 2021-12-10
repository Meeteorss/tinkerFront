import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  FlexProps,
  Textarea,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import * as React from "react";

interface Props extends FlexProps {
  label?: string;
  value: string;
  isDisabled: boolean;
}

export const Field = (props: Props) => {
  const { label, value, isDisabled, minHeight, ...flexProps } = props;
  return (
    <Flex as="dl" direction={{ base: "column", sm: "row" }} px="6" py="4">
      <Box fontWeight="semibold" as="dt" minWidth="180px">
        {label}
      </Box>
      <Box
        as="dd"
        flex="1"
        fontWeight="semibold"
        px={3}
        py={1}
        minHeight={minHeight ? minHeight : 7}
        border={"1px"}
        borderRadius={"sm"}
        borderColor={"alpha"}
        w={{ base: "100%", sm: "60%" }}
        maxW={800}
      >
        {value}
      </Box>
    </Flex>
  );
};

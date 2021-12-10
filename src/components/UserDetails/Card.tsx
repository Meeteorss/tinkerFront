import { Box, BoxProps, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";

export const Card = (props: BoxProps) => (
  <Box
    bg={"white"}
    rounded={"none"}
    roundedTopLeft={"none"}
    shadow="base"
    overflow="hidden"
    {...props}
  />
);

import { BellIcon } from "@chakra-ui/icons";
import {
  Box,
  HStack,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { useState } from "react";
import { useSendConfirmationEmailMutation } from "../../generated/graphql";
import { BannerLink } from "./BannerLink";

export const Banner = ({
  email,
  display,
}: {
  email: string;
  display: string;
}) => {
  const [, sendConfirmationEmail] = useSendConfirmationEmailMutation();
  const [disabled, setDisabled] = useState(false);
  return (
    <Box display={display} as="section">
      <Stack
        direction={{ base: "column", sm: "row" }}
        justifyContent="center"
        alignItems="center"
        py="3"
        px={{ base: "3", md: "6", lg: "8" }}
        color="white"
        bg={"blue.400"}
        disabled={disabled}
        _disabled={{ cursor: "pointer" }}
      >
        <HStack spacing="3">
          <Icon as={BellIcon} fontSize="2xl" h="10" />
          <Text fontWeight="medium" marginEnd="2">
            Confimer votre email,nous avons envoyé un email de vérification à{" "}
            <b>{email}</b>
          </Text>
        </HStack>
        <BannerLink
          w={{ base: "full", sm: "auto" }}
          flexShrink={0}
          onClick={() => {
            if (!disabled) {
              sendConfirmationEmail();
            }

            setDisabled(true);
            setTimeout(() => setDisabled(false), 1000 * 60 * 3);
          }}
        >
          Renvoyer l'email.
        </BannerLink>
      </Stack>
    </Box>
  );
};

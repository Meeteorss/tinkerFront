import {
  Box,
  Button,
  Flex,
  FlexProps,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { HiPencilAlt } from "react-icons/hi";
import { useMeQuery } from "../../generated/graphql";
import ContactPopup from "../ContactPopup";
import { formatDuration } from "../UserDetails/UserDetails";
import { Card } from "./Card";
import { CardContent } from "./CardContent";
import { CardHeader } from "./CardHeader";
import { Property } from "./Property";

export const PreviewCard = ({ worker, skill }: { worker: any; skill: any }) => {
  const createdAt = new Date(worker.createdAt);
  const [{ data: dataMe }] = useMeQuery();

  return (
    <Box as="section" bg={"white"} py="8">
      <Card maxW="3xl" mx="auto">
        <CardHeader title={`Informations`} />
        <CardContent>
          <Property label="Zone d'activité" value={skill.zone} />
          <Property label="Prix" value={`A partir de ${skill.pricing} Dh`} />
          <Property
            label="Durée de livraison"
            value={formatDuration(skill.duration)}
          />
          <Property
            label="Membre depuis"
            value={createdAt.toLocaleDateString("fr-FR")}
          />
          <Flex
            as="dl"
            direction={{ base: "column", sm: "row" }}
            px="6"
            py="4"
            _even={{ bg: useColorModeValue("alpha", "beta") }}
          >
            <Box as="dt" minWidth="180px">
              Contacter
            </Box>
            <Box as="dd" flex="1" fontWeight="semibold">
              <ContactPopup
                worker={worker}
                state={!dataMe?.me ? false : true}
              />
            </Box>
          </Flex>
        </CardContent>
      </Card>
    </Box>
  );
};

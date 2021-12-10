import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import * as React from "react";
import { useState } from "react";
import { HiPencilAlt } from "react-icons/hi";
import { UploadField } from "../Fields/UploadField";
import { Card } from "./Card";
import { CardContent } from "./CardContent";
import { CardHeader } from "./CardHeader";
import { Field } from "./Field";

export const formatDuration = (duration: number) => {
  console.log("duration----", duration);

  if (duration < 24) {
    if (duration == null) {
      return "Not Specified";
    } else if (duration == 1) {
      return `${duration} heure`;
    } else {
      return `${duration} heures`;
    }
  } else if (duration <= 24 * 30) {
    return `${Math.floor(duration / 24)} jours`;
  } else if (duration == 24 * 31) {
    return "Plus de 30 jours";
  } else {
    return "Pas spécifié";
  }
};

export const UserDetails = ({ worker }: { worker: any }) => {
  const router = useRouter();

  const imgSrc = worker?.profilePicture as string;
  const time = new Date().toString();
  const suffix = "?random=".concat(time);
  const [file, setFile] = useState([] as any);
  let newImgSrc = "";
  if (imgSrc) {
    newImgSrc = imgSrc?.concat(suffix);
  }

  if (!worker) {
    return <Box> 404 Not found</Box>;
  }
  return (
    <Card w={{ base: "100%", xl: 1200 }}>
      <CardHeader
        title="Mes Informations"
        action={
          <>
            <Button
              bg={"gray.100"}
              color={"black"}
              minW="20"
              leftIcon={<HiPencilAlt />}
              onClick={() => {
                router.push({
                  pathname: "/profile/edit",
                  query: { id: worker.id, action: "edit" },
                });
              }}
            >
              Editer
            </Button>
          </>
        }
      />
      <CardContent>
        <Flex
          w={"100%"}
          fontWeight={"semibold"}
          as="dl"
          direction={{ base: "column", sm: "row" }}
          mt={"4"}
          px="6"
          py="4"
          _even={{ bg: "gray.100" }}
        >
          <Box my={"auto"} minWidth="180px">
            <Text>Photo de profil:</Text>
          </Box>
          <Flex flex="1" fontWeight="semibold">
            {/* <Box>
              <Avatar
                size={"2xl"}
                src={newImgSrc}
                _hover={{ cursor: "pointer" }}
              />
            </Box> */}
            <UploadField worker={worker} f={file} />
          </Flex>
        </Flex>
        <Field label="Prénom:" value={worker.firstName} isDisabled={true} />
        <Field label="Nom:" value={worker.lastName} isDisabled={true} />
        <Field
          label="Nom d'utilisateur:"
          value={worker.userName}
          isDisabled={true}
        />
        <Field label="Email:" value={worker.email} isDisabled={true} />
        <Field
          label="Numero de téléphone:"
          value={worker.phone}
          isDisabled={true}
        />
        <Field label="Ville:" value={worker.city} isDisabled={true} />
        <Field label="Sexe:" value={worker.sexe} isDisabled={true} />
        <Field label="Age:" value={`${worker.age} ans`} isDisabled={true} />
        <Field
          label="Description:"
          value={worker.description}
          minHeight={"32"}
          isDisabled={true}
        />
      </CardContent>
    </Card>
  );
};

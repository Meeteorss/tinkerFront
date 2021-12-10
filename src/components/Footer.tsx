import React, { ReactNode } from "react";

import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  Image,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { FaTwitter } from "react-icons/fa";

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

const Footer = () => {
  return (
    <Box mt={10} bg={"betaWhite"} color={"gray.700"}>
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid
          // templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 1fr 1fr" }}
          templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr " }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Flex flexDirection={"row"}>
              <Image
                boxSize={"16"}
                src={
                  "https://projecta-profile-pictures.s3.eu-west-3.amazonaws.com/staticImages/logo+tinker.png"
                }
                _hover={{ cursor: "pointer" }}
              ></Image>
              <Box
                as={Link}
                href={"/"}
                fontSize={"lg"}
                fontWeight={"semibold"}
                h={"fit-content"}
                mt={"auto"}
                mb={1}
                ml={2}
              >
                Tinker.ma
              </Box>
            </Flex>
            <Text fontSize={"sm"}>© 2021 Tinker. All rights reserved</Text>
          </Stack>
          {/* <Stack align={"flex-start"}>
            <ListHeader>Product</ListHeader>
            <Link href={"#"}>Overview</Link>
            <Link href={"#"}>Features</Link>
            <Link href={"#"}>Tutorials</Link>
            <Link href={"#"}>Pricing</Link>
            <Link href={"#"}>Releases</Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Company</ListHeader>
            <Link href={"#"}>About</Link>
            <Link href={"#"}>Press</Link>
            <Link href={"#"}>Careers</Link>
            <Link href={"#"}>Contact</Link>
            <Link href={"#"}>Partners</Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Support</ListHeader>
            <Link href={"#"}>Help Center</Link>
            <Link href={"#"}>Terms of Service</Link>
            <Link href={"#"}>Legal</Link>
            <Link href={"#"}>Privacy Policy</Link>
            <Link href={"#"}>Status</Link>
          </Stack> */}
          <Stack align={"flex-start"}>
            <ListHeader>Nous suivre</ListHeader>
            {/* <Link href={"#"}>Facebook</Link> */}
            <Link target="_blank" href={"https://twitter.com/use_tinker"}>
              <Icon as={FaTwitter} /> Twitter
            </Link>

            {/* <Link href={"#"}>Instagram</Link> */}
            {/* <Link href={"#"}>LinkedIn</Link> */}
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
};
export default Footer;

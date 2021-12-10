import Icon from "@chakra-ui/icon";
import { Flex, Link, Text } from "@chakra-ui/layout";
import { Menu, MenuButton } from "@chakra-ui/menu";
import React from "react";

export const NavItem = ({ title, active, icon, ...props }: any) => {
  return (
    <Flex
      {...props}
      mt={30}
      flexDir={"column"}
      w={"100%"}
      alignItems={{ base: "center", sm: "flex-start" }}
    >
      <Menu placement={"right"}>
        <Link
          bgColor={active && "#f0f0f0"}
          p={3}
          borderRadius={4}
          _hover={{ textDecor: "none", bgColor: "gray.100" }}
          w={"100%"}
        >
          <MenuButton w={"100%"}>
            <Flex>
              <Icon
                mx={"auto"}
                as={icon}
                display={{ base: "flex", sm: "none" }}
              />
              <Text
                textAlign={"start"}
                fontWeight={"semibold"}
                display={{ base: "none", sm: "flex" }}
              >
                {" "}
                {title}{" "}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
};

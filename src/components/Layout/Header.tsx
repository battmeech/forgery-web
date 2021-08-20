import { Box, Heading, HStack } from "@chakra-ui/layout";
import { Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { GiBlacksmith } from "react-icons/gi";

export const Header = () => {
  return (
    <Box as="header" width="full" bgColor="ThreeDHighlight" h="24" p="9">
      <Box maxW={1200} m="auto">
        <HStack>
          <GiBlacksmith size="32px" />
          <Link as={NextLink} href="/">
            <Heading size="md">Forgery</Heading>
          </Link>
        </HStack>
      </Box>
    </Box>
  );
};

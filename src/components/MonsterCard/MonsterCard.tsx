import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Center,
  chakra,
  Divider,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Monster } from "types";

export const MonsterCard = ({
  monster,
  amount,
}: {
  monster: Monster;
  amount: number;
}) => {
  return (
    <VStack p="4" borderWidth="1px" borderRadius="lg">
      <Image
        boxSize="250px"
        src={monster.img_url}
        alt={`Image of ${monster.name}`}
      />

      <Divider />

      <Text fontSize="lg">
        {amount} {monster.name}
      </Text>

      <Accordion allowToggle w="full">
        <AccordionItem>
          <AccordionButton>
            <Center w="full">More details</Center>
          </AccordionButton>

          <AccordionPanel>
            <VStack>
              <Text fontSize="sm">{monster.meta}</Text>

              <Text fontSize="sm">
                {monster["Armor Class"]}{" "}
                <chakra.span color="gray.500">AC</chakra.span>
              </Text>

              <Text fontSize="sm">
                {monster.xp} <chakra.span color="gray.500">XP</chakra.span>
              </Text>

              <Text fontSize="sm">
                {monster["Hit Points"]}{" "}
                <chakra.span color="gray.500">HP</chakra.span>
              </Text>
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </VStack>
  );
};

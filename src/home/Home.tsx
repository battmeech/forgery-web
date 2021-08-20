import {
  Button,
  Center,
  chakra,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import { MonsterCard } from "components";
import { generateEncounter } from "encounter/generate";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Difficulty, Encounter, Environment } from "types";

type Input = {
  environment?: Environment;
  difficulty?: Difficulty;
  averageLevel: number;
  partySize: number;
};

export const Home = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();

  const [encounter, setEncounter] = useState<Encounter | undefined>(undefined);

  const onSubmit: SubmitHandler<Input> = (data: Input) => {
    const party = Array(data.partySize).fill(data.averageLevel);
    const newEncounter = generateEncounter(
      party,
      data.environment,
      data.difficulty
    );
    setEncounter(newEncounter);
  };

  const reset = () => {
    setEncounter(undefined);
  };

  const levelsError = () => {
    if (!errors.averageLevel) return undefined;
    if (errors.averageLevel.message) return errors.averageLevel.message;
    if (errors.averageLevel.type === "max")
      return "Your level cannot be greater than 20";
    if (errors.averageLevel.type === "min")
      return "Your level must be greater than 1";
  };

  const sizeError = () => {
    if (!errors.partySize) return undefined;
    if (errors.partySize.message) return errors.partySize.message;
    if (errors.partySize.type === "min")
      return "You need at least 1 party member";
  };

  if (!encounter)
    return (
      <Center>
        <VStack spacing="10">
          <chakra.form onSubmit={handleSubmit(onSubmit)}>
            <VStack w="full">
              <FormControl isInvalid={!!errors.averageLevel}>
                <FormLabel>Average level *</FormLabel>
                <Input
                  {...register("averageLevel", {
                    required: "Please enter a value",
                    valueAsNumber: true,
                    min: 1,
                    max: 20,
                  })}
                  placeholder="Between 1 and 20"
                />
                <FormErrorMessage>{levelsError()}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.partySize}>
                <FormLabel>Party size *</FormLabel>
                <Input
                  {...register("partySize", {
                    required: "Please enter a value",
                    valueAsNumber: true,
                    min: 1,
                  })}
                  placeholder="How many players?"
                />
                <FormErrorMessage>{sizeError()}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.difficulty}>
                <FormLabel>Difficulty</FormLabel>
                <Select {...register("difficulty")} placeholder="Select one">
                  <option value={Difficulty.EASY}>Easy</option>
                  <option value={Difficulty.MEDIUM}>Medium</option>
                  <option value={Difficulty.HARD}>Hard</option>
                  <option value={Difficulty.DEADLY}>Deadly</option>
                </Select>
              </FormControl>

              <Button type="submit">Generate</Button>
            </VStack>
          </chakra.form>
        </VStack>
      </Center>
    );

  return (
    <VStack>
      {encounter.monsters.map((monster) => (
        <MonsterCard
          key={monster.monster.name}
          amount={monster.amount}
          monster={monster.monster}
        />
      ))}

      <Button onClick={reset}>Reset encounter</Button>
    </VStack>
  );
};

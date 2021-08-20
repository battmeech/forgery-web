import { Environment, Monster, Encounter, Difficulty } from "types";
import monsters from "reference/monsters.json";
import { calculateXpBudgetForDifficulty } from "./xp";

function getRandomValueFromArray<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function generateEncounter(
  partyMemberLevels: number[],
  environment?: Environment,
  difficulty?: Difficulty
) {
  let potentialMonsters: Monster[] = [];

  if (environment) {
    //  Monsters don't have environment at the mo
  } else {
    potentialMonsters = [...monsters];
  }

  const xpBudget = calculateXpBudgetForDifficulty(
    partyMemberLevels,
    difficulty || Difficulty.MEDIUM
  );

  let encounter = new Encounter();

  while (encounter.getAdjustedXP(partyMemberLevels.length) < xpBudget) {
    // We don't want a monster where the XP is higher than this value
    const xpDifference =
      xpBudget - encounter.getAdjustedXP(partyMemberLevels.length);

    const monstersWithCorrectXP = potentialMonsters.filter(
      (monster) => monster.xp <= xpDifference
    );

    // If there are no monsters left to use, get out of this while
    if (monstersWithCorrectXP.length === 0) break;

    const monster = getRandomValueFromArray(monstersWithCorrectXP);

    let monsterInEncounter = encounter.monsters.find(
      (encounterMonster) => encounterMonster.monster === monster
    );

    if (monsterInEncounter) {
      monsterInEncounter.amount = monsterInEncounter.amount + 1;
    } else {
      encounter.monsters.push({ monster, amount: 1 });
    }

    encounter.totalXP = encounter.totalXP + monster.xp;
  }

  return encounter;
}

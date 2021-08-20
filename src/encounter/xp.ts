import { Difficulty, XPBudget, XPBudgets } from "types";

export function calculateXpBudget(levels: number[]): XPBudget {
  const budgets: XPBudget[] = [];
  let budget: XPBudget = {
    level: 0,
    easy: 0,
    medium: 0,
    hard: 0,
    deadly: 0,
    dailyBudget: 0,
  };

  levels.forEach((level) =>
    budgets.push(XPBudgets.find((XPBudget) => XPBudget.level === level)!)
  );

  budgets.forEach((xpBudget) => {
    budget = addXPBudgets(budget, xpBudget);
  });

  return budget;
}

export function calculateXpBudgetForDifficulty(
  levels: number[],
  encounterDifficulty: Difficulty
): number {
  const budget = calculateXpBudget(levels);

  let xpBudget: number;

  switch (encounterDifficulty) {
    case Difficulty.EASY:
      xpBudget = budget.easy;
      break;
    case Difficulty.HARD:
      xpBudget = budget.hard;
      break;
    case Difficulty.DEADLY:
      xpBudget = budget.deadly;
      break;
    case Difficulty.MEDIUM:
      xpBudget = budget.medium;
      break;
  }

  return xpBudget;
}

export function addXPBudgets(
  xpBudgetA: XPBudget,
  xpBudgetB: XPBudget
): XPBudget {
  return {
    level: xpBudgetA.level + xpBudgetB.level,
    easy: xpBudgetA.easy + xpBudgetB.easy,
    medium: xpBudgetA.medium + xpBudgetB.medium,
    hard: xpBudgetA.hard + xpBudgetB.hard,
    deadly: xpBudgetA.deadly + xpBudgetB.deadly,
    dailyBudget: xpBudgetA.dailyBudget + xpBudgetB.dailyBudget,
  };
}

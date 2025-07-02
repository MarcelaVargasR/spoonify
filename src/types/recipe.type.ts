import type { IngredientType } from "../types/ingredient.type";

export type RecipeType = {
  title: string;
  description: string;
  image: string;
  ingredients: IngredientType[];
  preparationSteps: string;
  preparationTime: string;
  cookingTime: string;
  difficultyLevel: "easy" | "medium" | "hard";
  priceEstimate: number;
  isPrivate: boolean;
};

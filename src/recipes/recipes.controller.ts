import { Request, Response } from "express";
import { RecipeModel } from "./Recipe.model";

async function getrecipes(_req: Request, res: Response) {
  const recipes = await RecipeModel.find();

  res.json({
    recipes,
  });
}

export { getrecipes };

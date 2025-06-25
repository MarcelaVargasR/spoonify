import { Request, Response } from "express";
import { RecipeModel } from "./Recipe.model";
import { RecipeType } from "../types/recipe.type";

async function getrecipes(_req: Request, res: Response) {
  const recipes = await RecipeModel.find();

  res.json({
    recipes,
  });
}

async function createRecipe(req: Request, res: Response) {
  const body: RecipeType = req.body;

  const newRecipe = await new RecipeModel({
    title: body.title,
    description: body.description,
  }).save();

  res.json({
    newRecipe,
  });
}

export { getrecipes, createRecipe };

import { Response } from "express";
import { RecipeModel } from "./Recipe.model";
import { RecipeType } from "../types/recipe.type";
import { Request } from "../types/platform-request.type";

async function createRecipe(req: Request, res: Response) {
  const body: RecipeType = req.body;

  const newRecipe = await new RecipeModel({
    title: body.title,
    description: body.description,
    image: body.image,
    ingredients: body.ingredients,
    preparationSteps: body.preparationSteps,
    preparationTime: body.preparationTime,
    cookingTime: body.cookingTime,
    difficultyLevel: body.difficultyLevel,
    priceEstimate: body.priceEstimate,
    isPrivate: body.isPrivate,
    author: req.user?._id
  }).save();

  res.json({
    newRecipe,
  });
}

async function getrecipes(_req: Request, res: Response) {
  const recipes = await RecipeModel.find();

  res.json({
    recipes,
  });
}

async function getRecipeById(req: Request, res: Response) {
  const recipe = await RecipeModel.findById(req.params.id);
  res.json({
    success: true,
    data: recipe,
  });
}

async function updateRecipeById(req: Request, res: Response) {
  const body: RecipeType = req.body;
  const recipeId = req.params.id;
  const updateRecipe = await RecipeModel.findByIdAndUpdate(recipeId, body, {
    new: true,
  });

  res.json(updateRecipe);
}

async function deleteRecipeById(req: Request, res: Response) {
  const recipeId = req.params.id;
  const deleteRecipe = await RecipeModel.findByIdAndDelete(recipeId);

  res.json({ _id: deleteRecipe });
}

export {
  createRecipe,
  getrecipes,
  getRecipeById,
  updateRecipeById,
  deleteRecipeById,
};

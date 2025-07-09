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
    popularity: 0, //BD
    author: req.user?._id,
  }).save();

  res.json({
    newRecipe,
  });
}

async function getrecipes(req: Request, res: Response) {
  const recipes = await RecipeModel.find({
    ...(req.query.title ? { title: req.query.title } : {}), //validate title not be undefined// if
  }).populate(["author"]);
  console.log("🚀 ~ getrecipes ~ recipes:", recipes);

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

async function addRecipeLike(req: Request, res: Response) {
  const user = req.user!;
  const recipeId = req.params.id;

  //make sure recipe with that id exist
  const recipe = await RecipeModel.findById(recipeId);
  if (!recipe) {
    res.status(404).json({ message: "Recipe not found" });
  }

  // this validation is for the recipe is in favorite and not duplicate, is not we continue adding in favorite
  // const isRecipeInLikes = req.user!.favoriteRecipes.some((id)=>{
  //   return recipeId === id
  // })
  // if (isRecipeInLikes) {
  //   res.status(500).json({
  //     message: "Recipe is in favorites"
  //   })
  // }
  // console.log("🚀 ~ isRecipeInLikes ~ isRecipeInLikes:", isRecipeInLikes)

  const doesRecipeHasUserLike = recipe!.likes.some((id) => {
    return (user._id = id);
  });
  if (doesRecipeHasUserLike) {
    res.status(500).json({
      message: "Recipe is in favorite",
    });
  }

  //adding the user inside the recipe likes, asuring no duplicate
  await RecipeModel.findByIdAndUpdate(recipe!._id, {
    //add to set is a push referent to arrays
    $addToSet: { likes: user._id },
  });

  // IF in that list, then return error 500
  // If not in that list, then add it to the list

  // do a user.update
  // increase the amount of likes on the recipe model and do a update
  // return 200

  res.status(200).json({
    message: "Like successfully added",
  });
}

export {
  createRecipe,
  getrecipes,
  getRecipeById,
  updateRecipeById,
  deleteRecipeById,
  addRecipeLike,
};

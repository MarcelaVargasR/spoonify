import { Response } from "express";
import { RecipeModel } from "./Recipe.model";
import { RecipeType } from "../types/recipe.type";
import { Request } from "../types/platform-request.type";
// import { PaginationType } from "../types/pagination.type";
import { getPagination, getPaginationInfo } from "../utils/pagination.util";

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
  const { page, limit, skip } = getPagination(req.query);

  const filters = req.query.title ? { title: req.query.title } : {};
  const totalCount = await RecipeModel.countDocuments(filters);

  //pagination
  // const currentPage = Number.isNaN(parseInt(req.query.page!))
  //   ? 1
  //   : parseInt(req.query.page!) === 0
  //   ? 1
  //   : parseInt(req.query.page!); //validation if the user gives you 0  === 0 ? 1 : parseInt(req.query.page!)

  // const limit = Number.isNaN(parseInt(req.query.limit!))
  //   ? 10
  //   : parseInt(req.query.limit!) === 0
  //   ? 10
  //   : parseInt(req.query.limit!); //validation if the user gives you 0

  // const totalCount = await RecipeModel.countDocuments();

  const recipes = await RecipeModel.find({
    ...(req.query.title ? { title: req.query.title } : {}), //validate title not be undefined// if
  })
    .sort({
      title: "ascending",
    })
    .skip(skip)
    .limit(limit)
    // .skip((currentPage - 1) * limit)
    // .limit(limit)
    .populate(["author"]);

  // const previousPage = currentPage > 1 ? currentPage - 1 : null;

  // const pageCount = limit === 0 ? 1 : Math.ceil(totalCount / limit);

  // const nextPage = currentPage < pageCount ? currentPage + 1 : null;

  const pagination = getPaginationInfo(totalCount, page, limit);

  res.json({
    pagination,

    // pagination: {
    //   currentPage,
    //   nextPage, //quantity of pages
    //   pageCount,
    //   previousPage,
    //   totalCount, // quantity of items
    // } as PaginationType,
    data: recipes,
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
  const doesRecipeHasUserLike = recipe!.likes.some((id) => {
    return (user._id = id);
  });
  if (doesRecipeHasUserLike) {
    res.status(500).json({
      message: "Recipe is already liked by this user",
    });
  }

  //adding the user inside the recipe likes, asuring no duplicate
  await RecipeModel.findByIdAndUpdate(recipe!._id, {
    //add to set is a push referent to arrays
    $addToSet: { likes: user._id },
  });

  res.status(200).json({
    message: "Like successfully added",
  });
}

async function deleteRecipeLike(req: Request, res: Response) {
  const user = req.user!;
  const recipeId = req.params.id;

  const recipe = await RecipeModel.findById(recipeId);
  if (!recipe) {
    res.status(404).json({ message: "Recipe not found" });
  }

  const doesRecipeHasUserLike = recipe!.likes.some((id) => {
    return (user._id = id);
  });
  if (!doesRecipeHasUserLike) {
    res.status(500).json({
      message: "Recipe has not been liked by this user",
    });
  }

  await RecipeModel.findByIdAndUpdate(recipe!.id, {
    $pull: { likes: user._id },
  });

  res.status(200).json({
    message: "Like successfully deleted",
  });
}

export {
  createRecipe,
  getrecipes,
  getRecipeById,
  updateRecipeById,
  deleteRecipeById,
  addRecipeLike,
  deleteRecipeLike,
};

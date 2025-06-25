import { Router } from "express";
import {
  getrecipes,
  createRecipe,
  updateRecipeById,
  getRecipeById,
  deleteRecipeById,
} from "./recipes.controller";

const router = Router();

router.route("/").get(getrecipes);
router.route("/").post(createRecipe);
router.route("/:id").put(updateRecipeById);
router.route("/:id").get(getRecipeById);
router.route("/:id").delete(deleteRecipeById);

export { router };

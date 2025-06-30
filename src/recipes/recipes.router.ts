import { Router } from "express";
import {
  getrecipes,
  createRecipe,
  updateRecipeById,
  getRecipeById,
  deleteRecipeById,
} from "./recipes.controller";
import { isAuthenticated } from "../middlewares/is-authenticated.middleware";

const router = Router();

router.route("/").get(getrecipes);
router.route("/").post(createRecipe);
router.route("/:id").put(updateRecipeById);
router.route("/:id").get(isAuthenticated, getRecipeById);
router
  .route("/:id")
  .delete(isAuthenticated, deleteRecipeById);

export { router };

import { Router } from "express";
import {
  getrecipes,
  createRecipe,
  updateRecipeById,
  getRecipeById,
  deleteRecipeById,
} from "./recipes.controller";
import { isAuthenticated } from "../middlewares/is-authenticated.middleware";
import {isAdmin} from "../middlewares/is-admin.middleware"

const router = Router();

router.route("/").get(isAuthenticated,getrecipes);
router.route("/").post(isAuthenticated, isAdmin, createRecipe);
router.route("/:id").put(isAuthenticated, updateRecipeById);
router.route("/:id").get(isAuthenticated, getRecipeById);
router
  .route("/:id")
  .delete(isAuthenticated, deleteRecipeById);

export { router };

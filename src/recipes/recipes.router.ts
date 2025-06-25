import { Router } from "express";
import { getrecipes, createRecipe } from "./recipes.controller";

const router = Router();

router.route("/").get(getrecipes);
router.route("/").post(createRecipe);

export { router };

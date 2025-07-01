import { Router } from "express";
import { createIngredient } from "../ingredients/ingredients.controller";

const router = Router();

router.route("/").post(createIngredient);

export { router };

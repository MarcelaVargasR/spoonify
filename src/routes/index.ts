import { Router } from "express";
import { router as recipesRouter } from "../recipes/recipes.router";

const router = Router();

router.use("/recipes", recipesRouter);

export { router };

import { Router } from "express";
import { router as recipesRouter } from "../recipes/recipes.router";
import { router as usersRouter } from "../users/users.router";
import { router as authRouter } from "../auth/auth.router";
// import { router as ingredientRouter } from "../ingredients/ingredients.router";

const router = Router();

router.use("/recipes", recipesRouter);
router.use("/users", usersRouter);
router.use("/auth", authRouter);
// router.use("/ingredient", ingredientRouter);

export { router };

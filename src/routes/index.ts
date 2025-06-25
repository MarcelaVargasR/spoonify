import { Router } from "express";
import { router as recipesRouter } from "../recipes/recipes.router";
import { router as userRouter } from "../users/users.router";

const router = Router();

router.use("/recipes", recipesRouter);
router.use("/users", userRouter);

export { router };

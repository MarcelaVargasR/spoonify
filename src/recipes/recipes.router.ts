import { Router } from "express";
import { getrecipes } from "./recipes.controller";

const router = Router();

router.route("/").get(getrecipes);

export { router };

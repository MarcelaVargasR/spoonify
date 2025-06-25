import { Router } from "express";
import {
  createUser,
  getAllUser,
  getUserById,
  updateUserById,
  deleteUserById,
} from "./users.controller";

const router = Router();

router.route("/").post(createUser);
router.route("/").get(getAllUser);
router.route("/:id").get(getUserById);
router.route("/:id").put(updateUserById);
router.route("/:id").delete(deleteUserById);

export { router };

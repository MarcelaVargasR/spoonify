import { login, register, logout } from "../auth/auth.controller";
import {Router} from "express"

const router = Router();

router.route("/login").post(login)
router.route("/register").post(register)
router.route("/logout").post(logout)


export { router };

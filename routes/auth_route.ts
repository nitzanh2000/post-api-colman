import * as express from "express";
import { login, register, logout, refreshToken } from "../controllers/auth_controller";

const router = express.Router();

router.post("/login", login);

router.post("/logout", () => void logout);

router.post("/register", register);

router.post("/refresh-token", () => void refreshToken);

module.exports = router;
import * as express from "express";
import {
  getUserById,
  getAllUsers,
  deleteUserById,
  createUser,
  updateUser,
} from "../controllers/users_controller";

const router = express.Router();

router.get("/", getAllUsers);

router.get("/:id", getUserById);

router.post("/", createUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUserById);

module.exports = router;

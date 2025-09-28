import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

router.post("/", UserController.createUser);
router.get("/", UserController.getAllUsers);
router.post("/:id", UserController.updateUser);

router.get("/:id", UserController.getUserById);

export const UserRouter = router;
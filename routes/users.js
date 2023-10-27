import { Router } from "express";
import UserController from "./../controllers/users.js";
import auth from "./../middlewares/auth.js"
const router = Router();

router.post("/", UserController.createUser);
router.post("/login", UserController.login);
router.get("/", UserController.getAll);
router.get("/:id",auth, UserController.getUser);
router.put("/:id",auth, UserController.editUser);
router.delete("/:id", auth, UserController.deleteUser);

export default router;

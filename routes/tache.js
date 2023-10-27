import { Router } from "express";
import TacheController from "../controllers/tache.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.post("/", auth, TacheController.createTache);
router.put("/:id", auth, TacheController.editTache);
router.delete("/:id", auth, TacheController.deleteTache);
router.get("/", auth, TacheController.getAllTache);
router.get("/:id", auth, TacheController.getTache);

export default router;

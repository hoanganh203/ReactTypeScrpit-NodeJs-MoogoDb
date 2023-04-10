import express from "express";
import { create, getAll, getOne, remove, update } from "../controller/product";
import { checkAdmin } from "../middlewares/checkAdmin";

const router = express.Router();

router.post("/products", checkAdmin, create);
router.get("/products", getAll);
router.put("/products/:id", checkAdmin, update);
router.get("/products/:id", getOne);
router.delete("/products/:id", checkAdmin, remove);

export default router;
import express from "express";
import { create, getAll, getOne, remove, update } from "../controller/category";
import { checkAdmin } from "../middlewares/checkAdmin";

const router = express.Router();

router.post("/categorys", checkAdmin, create);
router.get("/categorys", getAll);
router.put("/categorys/:id", checkAdmin, update);
router.get("/categorys/:id", getOne);
router.delete("/categorys/:id", checkAdmin, remove);





export default router;
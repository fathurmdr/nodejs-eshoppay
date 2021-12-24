import { Router } from "express";
import IndexController from "../controllers/IndexController";

const router = Router();

router.get("/",IndexController.CategoryController.findAll)
router.get("/:id", IndexController.CategoryController.findOne)
router.post("/",IndexController.CategoryController.create)
router.put("/:id",IndexController.CategoryController.update)
router.delete("/:id",IndexController.CategoryController.deleteRow)

export default router;
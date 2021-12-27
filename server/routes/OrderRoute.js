import { Router } from "express";
import IndexController from "../controllers/IndexController";

const router = Router();

router.get("/",IndexController.OrderController.findAll)
router.get("/:id", IndexController.OrderController.findOne)
router.post("/",IndexController.OrderController.create)
router.put("/:id",IndexController.OrderController.update)
router.delete("/:id",IndexController.OrderController.deleteRow)

export default router;
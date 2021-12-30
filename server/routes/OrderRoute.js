import { Router } from "express";
import IndexController from "../controllers/IndexController";

const router = Router();

// method post
router.post("/createOrder",
    IndexController.CartCtrl.summaryCart,
    IndexController.OrderCtrl.getOrderNumber,
    IndexController.OrderCtrl.createOrder,
    IndexController.OrderCtrl.updateStock,
    IndexController.CartCtrl.updateLineItemOrder,
    IndexController.CartCtrl.updateCartOrder);


export default router;
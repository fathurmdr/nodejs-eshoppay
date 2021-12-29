import { Router } from "express";
import IndexController from "../controllers/IndexController";



const router = Router();


// method post
router.post("/addToCart",
    IndexController.CartCtrl.isCartOpen,
    IndexController.CartCtrl.saveLineItem);

router.post("/checkout",
    IndexController.CartCtrl.checkout,
    IndexController.CartCtrl.updateCart
    )

export default router;
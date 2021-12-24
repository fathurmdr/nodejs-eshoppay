import { Router } from "express";
import IndexCtrl from '../controllers/IndexController'

const router = Router();


router.get("/:id",IndexCtrl.UserController.findOne);
router.post("/login",IndexCtrl.UserController.signin)

export default router;
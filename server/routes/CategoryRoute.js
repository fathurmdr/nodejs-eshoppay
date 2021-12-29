import { Router } from "express";
import IndexController from "../controllers/IndexController"
import authJWT from "../helpers/authJWT";


const router = Router();

router.get("/rawSQL",IndexController.CategoryCtrl.findCategoryBySQL);
router.get("/",IndexController.CategoryCtrl.findAllRows);
router.get("/detail",IndexController.CategoryCtrl.categoryProduct);

router.get("/:id",IndexController.CategoryCtrl.findRowById);



// method post
router.post("/",IndexController.CategoryCtrl.createRow);
// put
router.put("/:id",IndexController.CategoryCtrl.updateRow);
// delete
router.delete("/:id",IndexController.CategoryCtrl.deleteRow);

export default router;
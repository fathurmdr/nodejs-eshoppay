import { Router } from "express";
import IndexController from "../controllers/IndexController";
import UploadDownloadHelper from "../middleware/UploadDownloadHelper";

const router = Router();

router.get("/", IndexController.ProductController.findAll);
router.get("/:id", IndexController.ProductController.findOne)
router.post("/",UploadDownloadHelper.uploadImages,IndexController.ProductController.create,IndexController.PrimController.create)
router.put("/:id",IndexController.ProductController.update)
router.delete("/:id",IndexController.ProductController.deleteRow)

export default router;
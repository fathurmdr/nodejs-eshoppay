import { Router } from "express";
import IndexController from "../controllers/IndexController";
import UpDownloadHelper from "../helpers/UpDownloadHelper";

const router = Router();

router.get("/", IndexController.ProductCtrl.findAllRows);
router.get("/images/:filename", UpDownloadHelper.showProductImage);

router.post("/",
    UpDownloadHelper.uploadSingleFile,
    IndexController.ProductCtrl.createProduct
);

//upload multiple images
router.post("/multiple",
    UpDownloadHelper.uploadMultipleFile,
    IndexController.ProductImageCtrl.createProductImage
    )

router.put("/:id", IndexController.ProductCtrl.updateProduct);
router.delete("/:id", IndexController.ProductCtrl.deleteRow);


export default router;
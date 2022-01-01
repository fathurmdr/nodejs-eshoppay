"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _IndexController = _interopRequireDefault(require("../controllers/IndexController"));

var _UpDownloadHelper = _interopRequireDefault(require("../helpers/UpDownloadHelper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
router.get("/", _IndexController.default.ProductCtrl.findAllRows);
router.get("/images/:filename", _UpDownloadHelper.default.showProductImage);
router.post("/", _UpDownloadHelper.default.uploadSingleFile, _IndexController.default.ProductCtrl.createProduct); //upload multiple images

router.post("/multiple", _UpDownloadHelper.default.uploadMultipleFile, _IndexController.default.ProductImageCtrl.createProductImage);
router.put("/:id", _IndexController.default.ProductCtrl.updateProduct);
router.delete("/:id", _IndexController.default.ProductCtrl.deleteRow);
var _default = router;
exports.default = _default;
//# sourceMappingURL=ProductRoute.js.map
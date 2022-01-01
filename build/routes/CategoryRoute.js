"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _IndexController = _interopRequireDefault(require("../controllers/IndexController"));

var _authJWT = _interopRequireDefault(require("../helpers/authJWT"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
router.get("/rawSQL", _IndexController.default.CategoryCtrl.findCategoryBySQL);
router.get("/", _IndexController.default.CategoryCtrl.findAllRows);
router.get("/detail", _IndexController.default.CategoryCtrl.categoryProduct);
router.get("/:id", _IndexController.default.CategoryCtrl.findRowById); // method post

router.post("/", _IndexController.default.CategoryCtrl.createRow); // put

router.put("/:id", _IndexController.default.CategoryCtrl.updateRow); // delete

router.delete("/:id", _IndexController.default.CategoryCtrl.deleteRow);
var _default = router;
exports.default = _default;
//# sourceMappingURL=CategoryRoute.js.map
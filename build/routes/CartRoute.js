"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _IndexController = _interopRequireDefault(require("../controllers/IndexController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)(); // method post

router.post("/addToCart", _IndexController.default.CartCtrl.isCartOpen, _IndexController.default.CartCtrl.saveLineItem);
router.post("/checkout", _IndexController.default.CartCtrl.checkout, _IndexController.default.CartCtrl.updateCart);
var _default = router;
exports.default = _default;
//# sourceMappingURL=CartRoute.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _authJWT = _interopRequireDefault(require("../helpers/authJWT"));

var _IndexController = _interopRequireDefault(require("../controllers/IndexController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
router.post("/signin", _authJWT.default.authenticate, _authJWT.default.login);
router.post("/signup", _IndexController.default.UsersCtrl.signup); //router.post("/refreshtoken",authJWT.refreshToken)

var _default = router;
exports.default = _default;
//# sourceMappingURL=AuthRoute.js.map
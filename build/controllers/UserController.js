"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SALT_ROUND = 10;

const signup = async (req, res) => {
  const {
    username,
    user_firstname,
    user_lastname,
    email,
    user_password,
    user_phone
  } = req.body;
  let hashPassword = user_password;
  hashPassword = await _bcrypt.default.hash(hashPassword, SALT_ROUND);

  try {
    const result = await req.context.models.users.create({
      user_name: username,
      user_firstname: user_firstname,
      user_lastname: user_lastname,
      user_email: email,
      user_password: hashPassword,
      user_phone: user_phone
    });
    const {
      user_name,
      user_email
    } = result.dataValues;
    res.send({
      user_name,
      user_email
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
  /*  test dulu   
  
  let userPassword = user_password
  userPassword = await bcrypt.hash(userPassword,SALT_ROUND);
  console.log(userPassword);
        console.log(await bcrypt.compare("rahasia",userPassword));
  console.log(await bcrypt.compare("rahasiax",userPassword)); */

}; // use sigin with token in authJWT


const signin = async (req, res) => {
  const {
    email,
    password
  } = req.body;

  try {
    const result = await req.context.models.users.findOne({
      where: {
        user_email: email
      }
    });
    const {
      user_name,
      user_email,
      user_password
    } = result.dataValues;
    const compare = await _bcrypt.default.compare(password, user_password);

    if (compare) {
      return res.send({
        user_name,
        user_email
      });
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    return res.sendStatus(404);
  }
};

var _default = {
  signup,
  signin
};
exports.default = _default;
//# sourceMappingURL=UserController.js.map
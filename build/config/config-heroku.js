"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const configHeroku = {
  database: 'demvukl1372kea',
  username: 'akspvqendeqejv',
  password: '6fa743705a0ee75d85c2efc443fbdb6bbc67bff0eb18ce2c71a77f5a8fa60b85',
  host: 'ec2-3-228-75-39.compute-1.amazonaws.com',
  port: 5432,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
var _default = configHeroku;
exports.default = _default;
//# sourceMappingURL=config-heroku.js.map
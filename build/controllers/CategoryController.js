"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _initModels = require("../models/init-models");

var _middleware = _interopRequireDefault(require("../helpers/middleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const findCategoryBySQL = async (req, res) => {
  const result = await _initModels.sequelize.query("select cate_id,cate_name from category", {
    type: _initModels.sequelize.QueryTypes.SELECT,
    model: req.context.models.Category,
    mapToModel: true
  });
  return res.send(result);
};

const findAllRows = async (req, res, next) => {
  // if(!req.isSeller) middleware.forbidden(next)
  try {
    const result = await req.context.models.category.findAll();
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const categoryProduct = async (req, res) => {
  const result = await req.context.models.category.findAll({
    include: [{
      model: req.context.models.products
    }]
  });
  return res.send(result);
};

const findRowById = async (req, res) => {
  const result = await req.context.models.category.findByPk(req.params.id);
  return res.send(result);
};

const createRow = async (req, res) => {
  const {
    cate_id,
    cate_name
  } = req.body;
  const result = await req.context.models.category.create({
    cate_id: cate_id,
    cate_name: cate_name
  });
  return res.send(result);
}; // update category set cate_name=${1} where cate_id=${2}


const updateRow = async (req, res) => {
  const {
    cate_name
  } = req.body;
  const result = await req.context.models.category.update({
    cate_name: cate_name
  }, {
    returning: true,
    where: {
      cate_id: req.params.id
    }
  });
  return res.send(result);
}; // delete from category where cate_id=${id}


const deleteRow = async (req, res) => {
  const id = req.params.id;
  await req.context.models.category.destroy({
    where: {
      cate_id: id
    }
  }).then(result => {
    return res.send("delete " + result + " rows.");
  }).catch(error => {
    return res.sendStatus(404).send("Data not found.");
  });
};

var _default = {
  findCategoryBySQL,
  findAllRows,
  findRowById,
  createRow,
  updateRow,
  deleteRow,
  categoryProduct
};
exports.default = _default;
//# sourceMappingURL=CategoryController.js.map
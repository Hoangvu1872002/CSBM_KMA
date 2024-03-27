const asyncModel = require("express-async-handler");
const userModel = require("../models/userModel");
const authorizationModel = require("../models/authorizationModel");
const jwt = require("jsonwebtoken");

const userRegister = asyncModel(async (req, res) => {
  const response = await userModel.create(req.body);

  return res.status(200).json({
    success: response ? true : false,
    mes: response ? "Register success." : "Register error.",
  });
});

const userLogin = asyncModel(async (req, res) => {
  const response = await userModel.findOne({
    citizenIdentificationNumber: req.body.citizenIdentificationNumber,
  });
  console.log(response._id);

  return res.status(200).json({
    success: response ? true : false,
    token: jwt.sign({ _id: response._id }, "masobimat"),
    citizenIdentificationNumber: response
      ? response.citizenIdentificationNumber
      : "Login error.",
  });
});

const getDataUser = asyncModel(async (req, res) => {
  const emailFind = await userModel.findOne({
    citizenIdentificationNumber: req.params.citizenIdentificationNumber,
  });

  if (emailFind) {
    const dataUsers = await userModel.find({});
    return res.status(200).json({
      success: dataUsers ? true : false,
      listDataUser: dataUsers ? dataUsers : "Get data user fail.",
      // individual: emailFind,
    });
  } else {
    return res.status(200).json({
      success: false,
      mes: "Get data user fail.",
    });
  }
});

const getInfPersonal = asyncModel(async (req, res) => {
  const inf = await userModel.findOne({
    citizenIdentificationNumber: req.params.citizenIdentificationNumber,
  });
  return res.status(200).json({
    success: inf ? true : false,
    individual: inf ? inf : "Get data user fail.",
  });
});

const getDecentralization = asyncModel(async (req, res) => {
  const dataAuthorizations = await authorizationModel.find({
    id_main: req.params.citizenIdentificationNumber,
  });
  return res.status(200).json({
    success: dataAuthorizations ? true : false,
    listDataUserAuthorizations: dataAuthorizations
      ? dataAuthorizations
      : "Get data authorizations fail.",
  });
});

const updateDecentralization = asyncModel(async (req, res) => {
  const dataAuthorizationsOld = await authorizationModel.deleteMany({
    id_main: req.body.id_main,
    id_others: req.body.id_others,
  });
  if (dataAuthorizationsOld) {
    const dataAuthorizationsNew = await authorizationModel.create(
      req.body.dataChange
    );

    return res.status(200).json({
      success: dataAuthorizationsNew ? true : false,
      mes: dataAuthorizationsNew
        ? "Update data authorizations success."
        : "Update data authorizations fail.",
    });
  } else {
    return res.status(400).json({
      success: false,
      mes: "Update data authorizations fail.",
    });
  }
});

const addDecentralization = asyncModel(async (req, res) => {
  const dataAuthorizationsAdd = await authorizationModel.create(req.body);

  return res.status(200).json({
    success: dataAuthorizationsAdd ? true : false,
    mes: dataAuthorizationsAdd
      ? "Add data authorizations success."
      : "Add data authorizations fail.",
  });
});

const deleteDecentralization = asyncModel(async (req, res) => {
  const dataAuthorizationsDelete = await authorizationModel.deleteMany({
    id_main: req.body.id_main,
    id_others: req.body.id_others,
  });

  return res.status(200).json({
    success: dataAuthorizationsDelete ? true : false,
    mes: dataAuthorizationsDelete
      ? "Delete data authorizations success."
      : "Delete data authorizations fail.",
  });
});

module.exports = {
  userRegister,
  getDataUser,
  getInfPersonal,
  userLogin,
  getDecentralization,
  updateDecentralization,
  addDecentralization,
  deleteDecentralization,
};

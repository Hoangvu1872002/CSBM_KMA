var express = require("express");
const {
  userRegister,
  userLogin,
  getDataUser,
  getDecentralization,
  updateDecentralization,
  addDecentralization,
  deleteDecentralization,
  getInfPersonal,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");
var router = express.Router();

/* GET users listing. */
router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/getDataUsers/:citizenIdentificationNumber", protect, getDataUser);
router.get(
  "/getInfPersonal/:citizenIdentificationNumber",
  protect,
  getInfPersonal
);
router.get(
  "/getDecentralization/:citizenIdentificationNumber",
  protect,
  getDecentralization
);
router.put("/updateDecentralization", protect, updateDecentralization);
router.post("/addDecentralization", protect, addDecentralization);
router.post("/deleteDecentralization", protect, deleteDecentralization);
module.exports = router;

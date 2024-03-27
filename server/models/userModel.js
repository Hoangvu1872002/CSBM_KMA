const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  name: {
    reuired: true,
    type: String,
  },
  email: {
    reuired: true,
    type: String,
  },
  citizenIdentificationNumber: {
    required: true,
    type: String,
  },
  birthday: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  address: {
    required: true,
    type: String,
  },
  phoneNumber: {
    required: true,
    type: String,
  },
  atm: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("userInf", userSchema);

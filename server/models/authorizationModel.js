const mongoose = require("mongoose");
const schema = mongoose.Schema;

const authorizationSchema = new schema({
  id_main: {
    type: String,
    require: true,
  },
  columnName: {
    type: String,
    require: true,
  },
  id_others: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("authorization", authorizationSchema);

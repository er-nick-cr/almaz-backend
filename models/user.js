const mongoose = require("mongoose");
const validator = require("validator");
const regex = require("../utils/regex");

const userSchema = new mongoose.Schema({
  login: {
    type: String,
    minlength: 2,
    maxlength: 30,
    unique: true,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Работник алмаза",
  },
  avatar: {
    type: String,
    default:
      "https://yt3.ggpht.com/ytc/AAUvwniCRdXDeHHqJUWQCVL2R_suljf2jWwgqmWWcljk=s900-c-k-c0x00ffffff-no-rj",
    validate: {
      validator(v) {
        return regex.test(v);
      },
    },
  },
  password: {
    type: String,
    require: true,
    select: false,
  },
  role: [
    {
      type: String,
      ref: "Role",
    },
  ],
});

module.exports = mongoose.model("user", userSchema);

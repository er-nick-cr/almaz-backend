const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  partner: [
    {
      name: {
        type: String,
        minlength: 2,
        maxlength: 30,
      },
      inn: {
        type: Number,
        minlength: 6,
        maxlength: 30,
      },
    },
  ],
  manager: [
    {
      name: {
        type: String,
        minlength: 2,
        maxlength: 30,
      },
      tel: {
        type: Number,
        minlength: 6,
        maxlength: 30,
      },
    },
  ],
  email: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  address: {
    type: String,
    default: [],
  },
  price: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "price",
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

module.exports = mongoose.model("customer", customerSchema);

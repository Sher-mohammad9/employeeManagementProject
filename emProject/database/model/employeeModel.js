const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  mobile: {
    type: Number,
    required: true,
    validate: {
      validator: function (number) {
        return /^[6-9]\d{9}$/.test(number);
      },
      message: "Invalid mobile number",
    },
  },

  email: {
    type: String,
    required: true,
    unique : true,
    validate: {
      validator: function (email) {
        return /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(
          email
        );
      },
      message: "Invalid email",
    },
  },

  type: {
    type: String,
    required: true,
  },

  salary: {
    type: Number,
    default: 5000,
  },

  experience: {
    type: String,
    default: "Fersher",
  },

  address: {
    type: String,
    required: true,
  },

  joiningDate: {
    type: Date,
    default: () => Date.now(),
  },
});

module.exports = mongoose.model("employee", employeeSchema);

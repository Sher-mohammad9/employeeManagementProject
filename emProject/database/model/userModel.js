const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("../.././config.js")

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },

    mobile : {
        type : Number,
        required : true,
        validate :{
            validator : function(number){
                return /^[6-9]\d{9}$/.test(number);
            },
            message : "Invalid mobile number"
        }
    },

    email : {
        type : String,
        required : true,
        unique : true,
        validate :{
            validator : function(email){
                return /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(email)
            },
            message : "Invalid email"
        }
    },

    password : {
        type : String,
        required : true
    },

    confirmPassword : {
        type : String
    },

    activity : {
        type : Boolean,
        default : true
    }
});

module.exports = mongoose.model("user", userSchema);
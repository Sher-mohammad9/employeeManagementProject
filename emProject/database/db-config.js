const mongoose = require("mongoose");
const config = require("../config.js");

mongoose.connect("mongodb://127.0.0.1:27017/employee-management", {UseNewUrlParser : true})
.then(()=>console.log("Conntection successfully")).catch((error)=>console.log("error ",error.message));

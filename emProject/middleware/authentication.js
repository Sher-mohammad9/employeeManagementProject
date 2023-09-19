const jwt = require("jsonwebtoken");
const config = require("../config");

const auth_user = async (req, resp, next)=>{
   const headers = req.headers["authorization"];
   if(headers){
    const token = headers.split(" ")[1]
   jwt.verify(token, config.secretKey, (error)=>{
    if(error){
        resp.status(401).send({status : 401, Error : error.message, message : "Authentication Field"})
    }else{
        req.token = token
        next();
    }
   })
}else{
    resp.status(403).send({status : 403, message : "Authorization Field"})
}
}

module.exports = auth_user;
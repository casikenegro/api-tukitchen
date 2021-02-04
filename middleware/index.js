const jwt = require("jsonwebtoken");
const constants = require("../utils/constants");
const models = require("../models");

const returnUserByToken = async (req) => {
  let token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, constants.secretTokenKey);
    const user = await models.User.findOne({_id: decoded.id});
    return user;
  } catch (error) {
    return false;
  }
};

const isAdmin = async (req,res,next) => {
  const user = await returnUserByToken(req);
  if( user.rol === 1 ) next();
  return res.status(401).json({ message: "Unauthorized!" });

}
const verifyToken = async (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) return res.status(403).json({ message: "No token provided" });
  try {
    const user = await returnUserByToken(req);
    if (!user) return res.status(404).json({ message: "No user found" });   
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};
module.exports = {
  verifyToken,
  returnUserByToken,
  isAdmin
}
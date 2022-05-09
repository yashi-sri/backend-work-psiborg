const jwt = require("jsonwebtoken");
const db = require("../modules");

const User = db.User;

const auth = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    // console.log(token);
    if (!token) {
      console.log("Token not found");
      return res.status(401).json({ success: false, msg: "Token not found" });
    }
    // console.log("yyyy", "Authorization");
    token = req.header("Authorization");

    let decoded = jwt.decode(token, { complete: true });
    // console.log(decoded);
    if (!decoded.payload.id) throw new Error("Invalid token");
    let user = await User.findOne({ where: { id: decoded.payload.id } });
    if (user) {
      req.user = user;
      return next();
    }

    return res.status(401).json({ msg: "User not found", success: false });
  } catch (error) {
    console.log("Error in auth middleware >> ", error);
    return res.status(401).json({ success: false, msg: "Invalid token" });
  }
};

module.exports = auth;

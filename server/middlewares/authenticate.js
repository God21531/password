const jwt = require("jsonwebtoken");
const User = require("../models/schema");
const { decrypt } = require("../models/EncDecManager");
const SECRET_KEY = `sGhT7z&*Lp2qR#9W`;

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    const verify = jwt.verify(token, SECRET_KEY);

    var rootUser = await User.findOne({
      _id: verify._id,
      "tokens.token": token,
    });

    if (!rootUser) {
      throw new Error("User now found");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;

    next();
  } catch (error) {
    res.status(400).json({ error: "Unauthorised user." });
    console.log(">>>>>>>>>>>>>>>>>>>", error);
  }
};

module.exports = authenticate;

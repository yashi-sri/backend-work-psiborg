const { v4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const db = require("../modules");

const User = db.User;

const register = (req, res) => {
  try {
    let { fullName, email, password } = req.body;
    const userID = v4();

    User.findOne({ where: { email } }).then((user) => {
      if (user) {
        console.log("email found");
        return res.status(403).json({
          msg: "you are already registered.",
        });
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            password = hash;
            User.create({
              fullName,
              email,
              password,
              id: userID,
            })
              .then(() => {
                res.status(200).json({
                  msg: "Registration Successful",
                  success: true,
                });
              })
              .catch((err) => {
                res.status(500).json({ err });
              });
          });
        });
      }
    });
  } catch (err) {
    console.log("error in register", err);
  }
};

// Login handler
const login = (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  User.findOne({
    where: {
      email,
    },
    raw: true,
  })
    .then((user) => {
      //check for user
      if (!user) {
        return res.status(401).json({
          error: "User not found!",
          success: false,
          msg: "Invalid credentials.",
        });
      }
      let originalPassword = user.password;
      bcrypt
        .compare(password, originalPassword)
        .then((isMatch) => {
          if (isMatch) {
            console.log("pwd match");
            const { id, email } = user;
            const payload = { id, email };
            jwt.sign(
              payload,
              "secret",
              {
                expiresIn: 3600,
              },
              (err, token) => {
                return res.status(200).json({
                  success: true,
                  token: token,
                  msg: "Logged in successfully !",
                  // role: user.role,
                  userID: user.id,
                  fullName: user.fullName,
                  // lastName: user.lastName,
                  email,
                });
              }
            );
          } else {
            console.log("pwd not match");
            return res.status(400).json({
              error: "Password not correct",
              success: false,
              msg: "Invalid credentials.",
            });
          }
        })
        .catch((err) => console.log("catch err >>", err));
    })
    .catch((err) => console.log("catch 2 err >>", err));
};

module.exports = { login, register };

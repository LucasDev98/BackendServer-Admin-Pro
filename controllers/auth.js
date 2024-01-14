const { response } = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { JSONWebTokenGenerator } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const userDB = await User.findOne({ email });

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "Email Invalido",
      });
    }

    const isPassword = await bcrypt.compareSync(password, userDB.password);

    if (!isPassword) {
      return res.status(404).json({
        ok: false,
        msg: "Password Invalido",
      });
    }

    //Generate JWT
    const token = await JSONWebTokenGenerator(userDB.id);

    res.json({
      ok: true,
      token,
      msg: "Logeando",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Algo salio mal",
    });
  }
};

const googleSingIn = async (req, res = response) => {
  console.log(req.body);
  try {
    const googleUser = await googleVerify(req.body.token);

    const { email, name, picture, family_name } = googleUser;

    const userDB = await User.findOne({ email });
    let user;

    if (!userDB) {
      user = new User({
        email,
        name,
        img: picture,
        lastName: family_name,
        password: "@@@",
        google: true,
      });
    } else {
      user = userDB;
      user.google = true;
    }

    await user.save();

    const token = await JSONWebTokenGenerator(user.id);

    res.json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      ok: true,
      msg: "Invalid token",
    });
  }
};

const renewToken = async (req, res = response) => {
  const uid = req.uid;
  console.log(uid);
  try {
    const userDB = await User.findById(uid);
    const token = await JSONWebTokenGenerator(uid);
    return res.json({
      ok: true,
      token: token,
      user: userDB,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  login,
  googleSingIn,
  renewToken,
};

/*
    PATH: api/login
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCampos");
const { login, googleSingIn, renewToken } = require("../controllers/auth");
const { valdidarToken } = require("../middlewares/validarJWT");
const router = Router();

router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  login
);

router.post(
  "/google",
  [check("token", "El password es obligatorio").not().isEmpty(), validarCampos],
  googleSingIn
);

router.get("/renew", valdidarToken, renewToken);

module.exports = router;

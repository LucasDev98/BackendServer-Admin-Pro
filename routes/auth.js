/*
    PATH: api/login
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCampos");
const { login, googleSingIn } = require("../controllers/auth");

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

module.exports = router;

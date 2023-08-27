/*
    Hospitals
    PATH: api/hospitals
*/
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCampos");
const { valdidarToken } = require("../middlewares/validarJWT");
const {
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital,
} = require("../controllers/hospitals");
const Router = require("express");

const router = Router();

router.get("/", [], getHospitals);

router.post(
  "/",
  [
    valdidarToken,
    check("name", "Name is required").not().isEmpty(),
    validarCampos,
  ],
  createHospital
);

router.put(
  "/:id",
  [valdidarToken, check("token", "Token is required"), validarCampos],
  updateHospital
);

router.delete(
  "/:id",
  [valdidarToken, check("token", "Token is required"), validarCampos],
  deleteHospital
);

module.exports = router;

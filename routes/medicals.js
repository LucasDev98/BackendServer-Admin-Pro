/*
    Medicals
    PATH : api/medicals
*/

const Router = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCampos");
const { valdidarToken } = require("../middlewares/validarJWT");
const {
  getMedical,
  createMedical,
  updateMedical,
  deleteMedical,
} = require("../controllers/medicals");

const router = Router();

router.get("/", [], getMedical);

router.post(
  "/",
  [
    valdidarToken,
    check("name", "name is required").not().isEmpty(),
    check("hospital", "Hospital is invalid").isMongoId(),
    validarCampos,
  ],
  createMedical
);

router.put(
  "/:id",
  [valdidarToken, check("token", "Token is required").isEmpty(), validarCampos],
  updateMedical
);

router.delete("/:id", [], deleteMedical);

module.exports = router;

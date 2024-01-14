/*
    Medicals
    PATH : api/medicals
*/

const Router = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCampos");
const { valdidarToken } = require("../middlewares/validarJWT");
const {
  createMedical,
  updateMedical,
  deleteMedical,
  getMedicals,
  getMedical,
} = require("../controllers/medicals");

const router = Router();

router.get("/", [], getMedicals);

router.get(
  "/:id",
  [valdidarToken, check("token", "Token is required").isEmpty()],
  getMedical
);

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

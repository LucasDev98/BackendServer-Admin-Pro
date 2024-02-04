/* 
    PATH : /api/usuarios
*/
const { Router } = require("express");
const { validarCampos } = require("../middlewares/validarCampos");
const { valdidarToken, validarAdmin, validarAdminOMismoUsuario } = require("../middlewares/validarJWT");
const { check } = require("express-validator");
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

const router = Router();

// Get Users
router.get("/", valdidarToken, getUsers);
// Create User
router.post(
  "/",
  [
    check("name", "name is required").not().isEmpty(),
    check("lastName", "last name is required").not().isEmpty(),
    check("email", "email is invalid").isEmail(),
    check("password", "pasword is required").not().isEmpty(),
    validarCampos,
  ],
  createUser
);

router.put(
  "/:id",
  [
    valdidarToken,
    validarAdminOMismoUsuario,
    check("name", "name is required").not().isEmpty(),
    check("lastName", "last name is required").not().isEmpty(),
    check("email", "email is invalid").isEmail(),
    check("role", "role is required").not().isEmpty(),
    validarCampos,
  ],
  updateUser
);

router.delete(
  "/:id",
  [
    valdidarToken,
    validarAdmin,
    // check('name', "name is required").not().isEmpty(),
    // check('lastName', "last name is required").not().isEmpty(),
    // check('email', "email is invalid").isEmail(),
    // check('role', "role is required").not().isEmpty(),
    validarCampos,
  ],
  deleteUser
);

module.exports = router;

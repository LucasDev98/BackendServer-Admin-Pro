const { Router } = require('express');
const fileUpload  = require('express-fileupload');
const { UploadFile } = require('../controllers/uploads');
const { valdidarToken } = require('../middlewares/validarJWT');
const { getImage } = require('../controllers/uploads');

const router = Router();

router.use( fileUpload() )

router.put('/:collection/:id', valdidarToken,  UploadFile );

router.get('/:collection/:img', getImage );







module.exports = router;
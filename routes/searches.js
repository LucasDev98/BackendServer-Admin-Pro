/*
    PATH : api/todo/
*/

const { getAll, getColecctionData } = require('../controllers/searches');
const { valdidarToken } = require('../middlewares/validarJWT');
const Router = require('express');



const router = Router('')


router.get('/:word',
    [valdidarToken],
    getAll
)


router.get('/collection/:table/:word',
    [valdidarToken],
    getColecctionData
)



module.exports = router;
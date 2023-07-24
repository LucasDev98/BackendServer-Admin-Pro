require('dotenv').config()
const expres = require('express');
const cors = require('cors')
const { dbConection } = require('./database/config');

/******************
 * USER :mean_user
 * PASS :WJ335c8lWjttIAbx
 ******************/

//CORS
app.use(cors())
//DB Connect
dbConection();

//Crear El Servidor de express 
const app = expres();


//Rutas
app.get( '/', ( req, res )=> {
    res.json({
        ok : true,
        msg : 'Api Consumiendo'
    })
})

//Levantar el Servidor
app.listen( process.env.PORT , ()=> {
    console.log( 'Servidor Corriendo en el puerto' + 3000 )
})




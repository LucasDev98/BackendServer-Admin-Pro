require('dotenv').config() 
const express = require('express');
const cors = require('cors')
const { dbConection } = require('./database/config');

/******************
 * USER :mean_user
 * PASS :WJ335c8lWjttIAbx
 ******************/
//Crear El Servidor de express 
const app = express();
//Configurar CORS
app.use(cors())
//Lectura y parseo del body
app.use( express.json() );
//DB Connect
dbConection();

//Rutas
//Users
app.use( '/api/usuarios', require('./routes/users') );
//Login
app.use( '/api/login', require('./routes/auth') );
//Hospitals
app.use( '/api/hospitals', require('./routes/hospitals') );
//Medicals
app.use( '/api/medicals', require('./routes/medicals') );
//Searches
app.use( '/api/search', require('./routes/searches') );
//Uploads
app.use( '/api/uploads', require('./routes/uploads') );



//Levantar el Servidor
app.listen( process.env.PORT , ()=> {
    console.log( 'Servidor Corriendo en el puerto' + 3000 )
})




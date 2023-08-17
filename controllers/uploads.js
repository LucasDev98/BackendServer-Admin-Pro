const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { updateImage } = require('../helpers/update-image-db');
const fs = require('fs');
const  path  = require('path');

const UploadFile = ( req, res = response ) => {
    const id = req.params.id
    const collection = req.params.collection;
    const extensions = ['jpg', 'png', 'jpge'];
    const colecctions = [ 'users', 'medicals', 'hospitals'];
    
        try {
            //If collection is invalid
            if( !colecctions.includes(collection) ) {
                return res.status(400).json({
                    ok: false,
                    error : 'No valid Collection'
                })
            } 

            //If not send files
            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).json({
                    ok: false,
                    error : 'No files were uploaded.'
                });
            }

            //Get File extensions 
            const file = req.files.image;
            console.log( file )
            const SeparateExtensions = file.name.split('.');
            
            const fileExtension = SeparateExtensions[ SeparateExtensions.length -1 ];

            //If extension file is invalid
            if(! extensions.includes( fileExtension) ) {
                return res.status(400).json({
                    ok: false,
                    error : 'Invalid extensions file'
                })
            }   


            //If Extensions is valid

            const fileName = `${ uuidv4() }.${ fileExtension }`;
            
            const path = `./uploads/${collection}/${fileName}`;
            
            console.log( path );

            file.mv( path, (err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        ok : false,
                        error : 'Error to upload file'
                    })
                }
                  
            //Update DB image
            updateImage( id, collection, fileName );
                res.json({
                    ok : true,
                    msg : 'File uploaded!'
                });
              });
           
           

        } catch (error) {
            console.log( error )
            res.status(500).json({
                ok : false,
                error : "Error inesperado"
            })
        }
}


const getImage = ( req, res = response ) => {
     const { collection,  img } = req.params;

     
      try {


        const pathImg = path.join(  __dirname, `../uploads/${collection}/${img}` );

        if( fs.existsSync() ){
            res.sendFile( pathImg );
        }else {
            const noImage = path.join(  __dirname, `../uploads/no-img.jpg` );
            res.sendFile( noImage );
        }
      


        
      } catch (error) { 
        console.log( error );
        res.status(400).json({
            ok : false,
            error
        })
      }
}   


module.exports = {
    UploadFile,
    getImage
};
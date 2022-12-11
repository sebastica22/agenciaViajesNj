import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';




const app = express();

//conectar base de datos
db.authenticate()
    .then( () => console.log('base de datos conect'))
    .catch( error => console.log(error) ); 


//definir el puerto
const port = process.env.PORT || 4200;

//habilitar pug
app.set('view engine', 'pug');

//obtener el año actual
app.use( (req, res, next) => {

    const year = new Date();

    res.locals.actualYear = year.getFullYear(); 
    res.locals.nombreSitio = 'Agencia de viajes';

    return next();
});

//agregar body parser para leer los datos del form
app.use(express.urlencoded({extended: true}));

//Definir la carpeta publica
app.use(express.static('public'));

//agregar router
app.use('/', router);



app.listen(port, ()=>{
    console.log(`el server ${port}`)
});
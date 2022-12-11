import { Viaje } from '../models/Viaje.js';
import { Testimonio } from '../models/TestimoniosModel.js';

const paginaInicio = async (req, res) =>  {

    //consultar 3 viaes del modelo viae

    const promiseDB = [];

    promiseDB.push(Viaje.findAll({ limit: 3 }));
    promiseDB.push(Testimonio.findAll({ limit: 3 }));

    try {
        const resultado = await Promise.all(promiseDB);

        res.render('inicio', {
            pagina: 'inicio',
            clase: 'home',
            viajes: resultado[0],
            testimonio: resultado[1] 
        });
    } catch (error) {
        console.log(error);
    }
   
};
const paginaNosotros = (req, res) =>{

    res.render('nosotros', {
        pagina: 'Nosotros'
    });
};
const paginaViajes = async (req, res) =>{

    //consultar base de datos
    const viajes = await Viaje.findAll();
    


    res.render('viajes', {
        pagina: 'Proximos viajes',
        viajes
    });

};

const paginaTestimonios = async (req, res) =>  {

    try{

        const testimonio = await Testimonio.findAll();

        res.render('testimonios', {
            pagina: 'Testimonios', 
            testimonio
        });
   }catch (error) {
        console.log(error);
   }

};

//muestra viaje por slug
const paginaDetalleViaje = async (req, res) => {
    const { slug } = req.params;
    try {

        const viaje = await Viaje.findOne({ where: { slug }});

        res.render('viaje', {
            pagina: 'Informacion viaje',
            viaje
        })
        
    } catch (error) {
        console.log(error);
        
    }
}

export{
    paginaInicio, 
    paginaNosotros, 
    paginaViajes, 
    paginaTestimonios, 
    paginaDetalleViaje
}
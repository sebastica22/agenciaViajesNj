import{ Testimonio } from '../models/TestimoniosModel.js';

const guardarTestimonio = async (req, res) => {

    //validar
    const{ nombre, email, mensaje } = req.body;

    const errores = [];

    if(nombre.trim() === ''){
        errores.push({mensaje : 'El nombre esta vacio'});
    }
    if(email.trim() === ''){
        errores.push({mensaje : 'Email vacio'});
    }
    if(mensaje.trim() === ''){
        errores.push({mensaje : 'El mensaje esta vacio'});
    }

    if(errores.length > 0){

        //consultar testimoniales existentes
        const testimonio = await Testimonio.findAll();

        //mostrar la vista con errores
        res.render('testimonios', {
            pagina: 'Testimonios',
            errores, 
            nombre,
            email,
            mensaje,
            testimonio
        })
    }else{
        //almacenar base de datos

        try {
            await Testimonio.create({
                nombre,
                email,
                mensaje
            });
            res.redirect('/testimonios');
        } catch (error) {
            console.log(error);
        }
    }
    
}

export {
    guardarTestimonio
}
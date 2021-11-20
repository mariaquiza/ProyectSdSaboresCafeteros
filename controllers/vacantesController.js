const mongoose = require('mongoose');
const Vacante = require('../models/Vacantes');

//Página de Inicio - Home
exports.formularioNuevaVacante =(request, response)=>{
    response.render('nueva-vacante',{
        nombrePagina:'Nueva Reserva',
        tagline:'Llene el formulario para hacer tu Reserva!',
        nombre: request.user.nombre,
        cerrarSesion: true,
        imagen: request.user.imagen,
    })
}
//Formulario de Agregar Vacante 
exports.agregarVacante = async (request, response)=>{
    //console.log(request.body);
    try {
        const vacante = new Vacante(request.body);

        //Pedir el id del usuario para guardar la vacante
        vacante.autor = request.user._id;

        //Arreglo de Habilidades
        vacante.skills = request.body.skills.split(',');

        const nuevaVacante = await vacante.save();

        response.redirect(`/vacantes/${nuevaVacante.url}`);
    } catch(e) {
        console.log('Error:', e.message);
    } 
    

}

//Mostrar Vacante por Url
exports.mostrarVacante = async(request, response, next)=>{
    const vacante = await Vacante.findOne({url:request.params.url}).populate('autor');

    console.log(vacante);

    if(!vacante) return next();

    response.render('vacante',{
        vacante,
        nombrePagina: vacante.nombre,
        barra:true
    })
}

// Mostrar formulario para editar vacante
exports.formularioEditarVacante = async(request, response, next)=>{
    const vacante = await Vacante.findOne({url: request.params.url});

    if(!vacante) return next();

    response.render('editar-vacante',{
        vacante,
        nombrePagina: `Editar - ${vacante.nombre}`,
        nombre: request.user.nombre,
        cerrarSesion: true,
        imagen: request.user.imagen,
    })

}

// Editar Vacante por URL
exports.editarVacante = async(request, response)=>{
    const vacanteActualizada = request.body;
   //console.log(vacanteActualizada);
    vacanteActualizada.skills = request.body.skills.split(',');

    const vacante = await Vacante.findOneAndUpdate({url: request.params.url}, 
        vacanteActualizada,{
            new:true,
            runValidators:true
        });
    
    response.redirect(`/vacantes/${vacante.url}`);

}

//validar y sanitizar campos de vacante
exports.validarVacante =(request, response, next) =>{
    //sanitizar campos
    request.sanitizeBody('nombre').escape();
    request.sanitizeBody('motivo').escape();
    request.sanitizeBody('fecha').escape();
    request.sanitizeBody('cantidad').escape();
    request.sanitizeBody('zona').escape();
    request.sanitizeBody('skills').escape();

    //validar
    request.checkBody('nombre','Agrega nombre de la reserva').notEmpty();
    request.checkBody('motivo','Agrega el motivo de la reserva').notEmpty();
    request.checkBody('fecha','Agrega la fecha de la reserva').notEmpty();
    request.checkBody('zona','Selecciona la zona en la que deseas la reserva').notEmpty();
    request.checkBody('skills','Agrega productos a tu reserva').notEmpty();

    const errores = request.validationErrors();

    if(errores){
        //recargar la vista con errores
        request.flash('error', errores.map(error=> error.msg));

        response.render('nueva-vacante',{
            nombrePagina:'Nueva Reserva',
            tagline:'Llene el formulario para Hacer Tu Reserva',
            nombre: request.user.nombre,
            cerrarSesion: true,
            mensajes: request.flash(),
            imagen: request.user.imagen,
        })
    }

    next();
}

//Eliminar Vacante
exports.eliminarVacante =async (request, response)=>{
    const {id}= request.params;

    const vacante = await Vacante.findById(id);

    //console.log(vacante);

    if(verificarAutor(vacante, request.user)){
        //eliminar vacante
        vacante.remove();
        response.status(200).send('Vacante eliminada correctamente');
    }else{
        //Error
        response.status(403).send('Error no se pudo eliminar vacante');
    }
    
}

const verificarAutor = (vacante={}, usuario={})=>{
    if(!vacante.autor.equals(usuario._id)){
        return false
    }
    return true;
}




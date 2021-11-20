const mongoose = require('mongoose');
const Pedido = require('../models/Pedidos');

//Página de Inicio - Home
exports.formularioNuevaPedidos =(request, response)=>{
    response.render('nuevo-pedido',{
        nombrePagina:'Nuevo Pedido',
        tagline:'Por favor llene el formulario para su pedido!',
        nombre: request.user.nombre,
        cerrarSesion: true,
        imagen: request.user.imagen,
    })
}
//Formulario de Agregar Vacante 
exports.agregarPedidos = async (request, response)=>{
    //console.log(request.body);
    try{
        const pedido = new Pedido(request.body);
        
        //Pedir el id del usuario para guardar la vacante
        pedido.autor = request.user._id;
        
        //Arreglo de Habilidades
        pedido.skills = request.body.skilll.split(',');
        
        const nuevaPedido = await pedido.save();
        
        response.redirect(`/pedidos/${nuevaPedido.url}`);
    }catch(e) {
        console.log('Error:', e.message);
    }
    

}

//Mostrar Vacante por Url
exports.mostrarPedidos = async(request, response, next)=>{
    const pedido = await Pedido.findOne({url:request.params.url}).populate('autor');

    if(!pedido) return next();

    response.render('pedido',{
        pedido,
        nombrePagina: pedido.nombre,
        barra:true
    })
}

// Mostrar formulario para editar vacante
exports.formularioEditarPedidos = async(request, response, next)=>{
    const pedido = await Pedido.findOne({url: request.params.url});

    if(!pedido) return next();

    response.render('editar-pedido',{
        pedido,
        nombrePagina: `Editar - ${pedido.nombre}`,
        nomre: request.user.nombre,
        cerrarSesion: true,
        imagen: request.user.imagen,
    })

}

// Editar Vacante por URL
exports.editarPedidos = async(request, response)=>{
    const pedidoActualizada = request.body;
   //console.log(vacanteActualizada);
    pedidoActualizada.skilll = request.body.skilll.split(',');

    const pedido = await Pedido.findOneAndUpdate({url: request.params.url}, 
        pedidoActualizada,{
            new:true,
            runValidators:true
        });
    
    response.redirect(`/pedidos/${pedido.url}`);

}

//validar y sanitizar campos de vacante
exports.validarPedidos =(request, response, next) =>{
    //sanitizar campos
    request.sanitizeBody('nombre').escape();
    request.sanitizeBody('telefono').escape();
    request.sanitizeBody('direccion').escape();
    request.sanitizeBody('barrio').escape();
    request.sanitizeBody('pago').escape();
    request.sanitizeBody('skilll').escape();

    //validar
    request.checkBody('nombre','Agrega un nombre').notEmpty();
    request.checkBody('direccion','Agrega la direccion').notEmpty();
    request.checkBody('barrio','Agrega el barrio').notEmpty();
    request.checkBody('pago','Selecciona el tipo de pago').notEmpty();
    request.checkBody('skilll','Agrega productos a tu pedido').notEmpty();

    const errores = request.validationErrors();

    if(errores){
        //recargar la vista con errores
        request.flash('error', errores.map(error=> error.msg));

        response.render('nuevo-pedido',{
            nombrePagina:'Nuevo Pedido',
            tagline:'Llene el formulario para hacer tu Pedido',
            nombre: request.user.nombre,
            cerrarSesion: true,
            mensajes: request.flash(),
            imagen: request.user.imagen,
        })
    }

    next();
}

//Eliminar Vacante
exports.eliminarPedidos =async (request, response)=>{
    const {id}= request.params;

    const pedido = await Pedido.findById(id);

    //console.log(vacante);

    if(verificarAutor(pedido, request.user)){
        //eliminar vacante
        pedido.remove();
        response.status(200).send('Pedido eliminado correctamente');
    }else{
        //Error
        response.status(403).send('Error no se pudo eliminar el Pedido');
    }
    
}

const verificarAutor = (pedido={}, usuario={})=>{
    if(!pedido.autor.equals(usuario._id)){
        return false
    }
    return true;
}
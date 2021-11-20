const { response, request } = require('express');
const mongoose = require('mongoose');
const Usuarios = require('../models/Usuarios');
const multer = require('multer');
const shortid = require('shortid');

exports.subirImagen=(request, response, next)=>{
    upload(request, response, function(error){
        if(error){
            //imprimir error
            //console.log(error);
            if(error instanceof multer.MulterError){
                if(error.code === 'LIMIT_FILE_SIZE'){
                    request.flash('error', 'El archivo es muy grande Máximo 100Kb');
                }else{
                    request.flash('error',error.message);
                }
            }else{
                //console.log(error.message);
                request.flash('error', error.message);
            }
            response.redirect('/administracion');
            return;
        } else{
            return  next();
        }
    });
   
}

//Configuracion del Multer
const configuracionMulter ={
    limits:{fileSize:100000},
    storage: fileStorage = multer.diskStorage({
        destination: (request, file, cb)=>{
            cb(null, __dirname+'../../public/uploads/perfiles');
        },
        filename:(request, file, cb)=>{
            //console.log(file);
            const extension = file.mimetype.split('/')[1];
            //console.log(`${shortid.generate()}.${extension}`);
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(request, file, cb){
        if(file.mimetype==='image/jpeg' || file.mimetype==='image/png'){
            cb(null, true);
        }else{
            cb(new Error('Formato no Válido'), false);
        }
    }
}

//Metodo upload
const upload = multer(configuracionMulter).single('imagen');


// Formulario de Crear Cuenta
exports.formularioCrearCuenta = (request, response)=>{
    response.render('crear-cuenta',{
        nombrePagina: 'Crea tu Cuenta!',
        tagline:'Publica tus Vacantes de Manera Gratuita, Registrate!'
    } )
}

//Módulo para validarRegistro del Usuario

exports.ValidarRegistro = (request, response, next)=>{
    //Sanitizar
    request.sanitizeBody('nombre').escape();
    request.sanitizeBody('email').escape();
    request.sanitizeBody('password').escape();
    request.sanitizeBody('confirmar').escape();

    //validar
    request.checkBody('nombre', 'El campo Nombre no puede ir Vacío').notEmpty();
    request.checkBody('email', 'El email debe ser Válido').isEmail();
    request.checkBody('password', 'El campo Password no puede ir Vacío').notEmpty();
    request.checkBody('confirmar', 'El campo de Confirmación no puede ir Vacío').notEmpty();
    request.checkBody('confirmar', 'El Password es diferente de la Confirmación').equals(request.body.password);
    
    //Guarda en un json los errores
    const errores = request.validationErrors();
    //console.log(errores);
    if(errores){
       request.flash('error', errores.map(error => error.msg)); 

       response.render('crear-cuenta',{
        nombrePagina: 'Crea tu Cuenta!',
        tagline:'Haz Tus Reservas y Pedidos, Registrate!',
        mensajes: request.flash(),
        imagen: request.user.imagen
       });
       return;
    }
    next();
    
}

// Módulo para insertar el usuario en MongoDB
exports.CrearUsuario = async(request, response, next)=>{
    const usuario = new Usuarios(request.body);

    const errores = request.validationErrors();

    if(!errores){
        try {
            await usuario.save();
            request.flash('correcto', 'Se ha creado un Usuario!');
            response.redirect('/iniciar-sesion');
        } catch (error) {
            console.log(error);
            request.flash('error', error);
            response.redirect('/crear-cuenta');
        }
    }

}

//Formulario Autenticación de Usuarios
exports.formularioIniciarSesion = (request, response)=>{
    response.render('iniciar-sesion',{
        nombrePagina: 'Bienvenido a Iniciar Sesión!'
    })
}

//Formulario para editar Perfil
exports.formularioEditarPerfil = (request, response)=>{
    response.render('editar-perfil', {
        nombrePagina: 'Edita tu Perfil',
        usuario: request.user,
        nombre: request.user.nombre,
        cerrarSesion: true,
        imagen: request.user.imagen,
    })
}

//Editar el perfil
exports.editarPerfil = async(request, response)=>{
    const usuario = await Usuarios.findById(request.user._id);

    try {
        //console.log(usuario);
    usuario.nombre = request.body.nombre;
    usuario.email = request.body.email;

    if(request.body.password){
        usuario.password = request.body.password
    }

    //console.log(request.file);
    if(request.file){
        usuario.imagen = request.file.filename;
    }
    await usuario.save();

    response.redirect('/administracion');

     } catch(e) {
        console.log('Error:', e.message);
     } 
    

}

//Validar y sanitizar formulario perfiles
exports.validarPerfil =(request, response, next)=>{

    //sanitizar campos
    request.sanitizeBody('nombre').escape();
    request.sanitizeBody('email').escape();
    if(request.body.password){
        request.sanitizeBody('password').escape();
    }
    //validar
    request.checkBody('nombre','Agrega un Nombre al perfil').notEmpty();
    request.checkBody('email','Agrega un Email al perfil').notEmpty();

    const errores = request.validationErrors();

    if(errores){
        //recargar la vista con errores
        request.flash('error', errores.map(error=> error.msg));
        response.render('editar-perfil', {
            nombrePagina: 'Edita tu Perfil',
            usuario: request.user,
            nombre: request.user.nombre,
            cerrarSesion: true,
            mensajes:request.flash(),
            imagen: request.user.imagen,
        })
    }

    next();
    
}
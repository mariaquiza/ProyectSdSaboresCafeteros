const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const vacantesController = require('../controllers/vacantesController');
const pedidosController = require('../controllers/pedidosController');
const productosController = require('../controllers/productosController');
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');


module.exports=()=>{
    router.get('/', homeController.mostrarTrabajos);
    router.get('/productos/nueva', productosController.mostrarProductos);
   
    //creación de ruta para Mostrar Formulario Vacantes
    router.get('/vacantes/nueva', authController.verificarUsuario,vacantesController.formularioNuevaVacante);
    router.get('/pedidos/nueva', authController.verificarUsuario,pedidosController.formularioNuevaPedidos);
    

    //Creación de ruta para guardar
    router.post('/vacantes/nueva', authController.verificarUsuario,vacantesController.agregarVacante);
    router.post('/pedidos/nueva', authController.verificarUsuario, pedidosController.agregarPedidos);
    

    //Creación de ruta para visualizar una vacante por Url
    router.get('/vacantes/:url', vacantesController.mostrarVacante);
    router.get('/pedidos/:url', pedidosController.mostrarPedidos);
    

    //creación de ruta para Formulario de Edición
    router.get('/vacantes/editar/:url', authController.verificarUsuario,vacantesController.formularioEditarVacante);
    router.get('/pedidos/editar/:url', authController.verificarUsuario, pedidosController.formularioEditarPedidos);
    router.post('/vacantes/editar/:url', authController.verificarUsuario,vacantesController.editarVacante);
    router.post('/pedidos/editar/:url', authController.verificarUsuario,pedidosController.editarPedidos);

    //Creación ruta para eliminar vacantes
    router.delete('/vacantes/eliminar/:id',vacantesController.eliminarVacante);
    router.delete('/pedidos/eliminar/:id',pedidosController.eliminarPedidos);

    //Creación de Usuarios
    router.get('/crear-cuenta', usuariosController.formularioCrearCuenta);
    router.post('/crear-cuenta', usuariosController.ValidarRegistro,usuariosController.CrearUsuario);

    //Autenticación de Usuarios
    router.get('/iniciar-sesion', usuariosController.formularioIniciarSesion);
    router.post('/iniciar-sesion', authController.autenticarUsuario);

    //Cerrar Sesión
    router.get('/cerrar-sesion', authController.verificarUsuario, authController.cerrarSesion);
    
    // Panel de administración
    router.get('/administracion', authController.verificarUsuario, authController.mostrarPanel);
    
    //Editar Perfil
    router.get('/editar-perfil', authController.verificarUsuario, usuariosController.formularioEditarPerfil);
    router.post('/editar-perfil', authController.verificarUsuario,
    //usuariosController.validarPerfil,
    usuariosController.subirImagen, usuariosController.editarPerfil);

    return router;
}
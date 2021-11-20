const passport = require('passport');
const mongoose = require('mongoose');
const { response } = require('express');
require('../config/db');
const Vacante = require('../models/Vacantes');
const Pedido = require('../models/Pedidos');

exports.autenticarUsuario = passport.authenticate('local',{
    successRedirect:'/administracion',
    failureRedirect:'/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Todos los campos son obligatorios'
})

exports.verificarUsuario = (request, response, next)=>{
    //verificar si esta logueado
    if(request.isAuthenticated()){
        return next();//Usuario autenticado
    }
    //Si no esta logueado lo obligamos
    response.redirect('/iniciar-sesion');
}

exports.mostrarPanel = async(request, response)=>{
    //Busqueda por id usuario
    const vacantes = await Vacante.find({autor: request.user._id});
    const pedidos = await Pedido.find({autor: request.user._id});

    response.render('administracion',{
        nombrePagina: 'Panel de Administración',
        tagline: 'Haz tus Pedidos, Reservas y Administra tu Perfil',
        vacantes,
        pedidos,
        nombre: request.user.nombre,
        imagen: request.user.imagen,
        vacantes,
        pedidos,
        cerrarSesion: true
    })
}

exports.cerrarSesion =(request, response)=>{
    request.logout();

    request.flash('correcto', 'Haz cerrado sesión');

    return response.redirect('/iniciar-sesion');
}
const mongoose = require('mongoose');
const Vacante = require('../models/Vacantes');
const Pedido = require('../models/Pedidos');

exports.mostrarTrabajos = async (request, response, next)=>{
    const vacantes = await Vacante.find();
    const pedidos = await Pedido.find();

    if(!vacantes) return next();
    if(!pedidos) return next();

    response.render('home',{
        nombrePagina: 'Sabores Cafeteros',
        tagline:'Haz tus Pedidos y Reservas Aqui',
        barra: true,
        boton: true,
        vacantes,
        pedidos
    })
}
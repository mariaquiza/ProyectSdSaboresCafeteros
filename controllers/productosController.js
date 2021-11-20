const mongoose = require('mongoose');
const Vacante = require('../models/Vacantes');
const Pedidos = require('../models/Pedidos');

exports.mostrarProductos = async (request, response, next) => {
    const vacantes = await Vacante.find();
    const pedidos = await Pedidos.find();

    if (!vacantes) return next();
    if (!pedidos) return next();

    response.render('productos', {
        nombrePagina: 'Coffee Time',
        tagline: 'Bienvenido a Sabores Cafeteros, un lugar donde podrás adquirir una nueva sensación a tu paladar, descubrirás nuevos sabores, y podrás elegir el café que desees, además de poder hacer reservación para cualquier ocasión y tendrás servicio a domicilio.',
        barra: true,
        boton: true,
        vacantes,
        pedidos
    })
}
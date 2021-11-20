//Importar Mongoose
//const mongoose = require('mongoose');
require('./config/db');

const express = require('express');
const router = require('./routes');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess}= require('@handlebars/allow-prototype-access');
const path = require('path');
require('dotenv').config({path:'variables.env'});

//Firmar Sesión
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash= require('connect-flash');
const passport = require('passport');
require('./config/passport');

const app = express();

//uso del bodyParser para estipular la data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Validador express version 5.3.0
app.use(expressValidator());

//Inicializando Handlebars
app.engine('handlebars', exphbs({
    defaultLayout:'layout',
    helpers: require('./helpers/handlebars'),
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})
);


app.set('view engine','handlebars');

//Asociar la carpeta Public para css y maquetación
app.use(express.static(path.join(__dirname, 'public')));

//Abrir sesión con cookieParser y session
app.use(cookieParser());

//Creando la sesión
app.use(session({
    secret:process.env.SECRETO,
    key: process.env.KEY,
    resave: false,
    saveUninitialized:false,
    store: MongoStore.create({mongoUrl:process.env.DATABASE})
}));

//Uso de passport
app.use(passport.initialize());
app.use(passport.session());

//Connect flash
app.use(flash());

//Middleware
app.use((request, response, next)=>{
    response.locals.mensajes = request.flash();
    next();
});

//Router & Servidor en puerto 5000
app.use('/', router());

app.listen(process.env.PUERTO);
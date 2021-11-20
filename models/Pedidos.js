const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slug');
const shortid = require('shortid');

const pedidosSchema = new mongoose.Schema({
  nombre:{
      type:String,
      required: 'El nombre de la Persona es obligatorio',
      trim:true,
      lowercase:true
  },
  telefono:{
      type: String,
      trim:true
  },
  direccion:{
      type: String,
      trim: true,
      required: 'La direccion es Obligatoria'
  },
  barrio:{
      type: String,
      default:0,
      trim:true
  },
  pago:{
      type: String,
      trim:true
  },
  description:{
      type: String,
      trim: true
  },
  url:{
      type: String,
      lowercase:true
  },
  skills:[String],
  clientes:[
      {
          nombre: String,
          email: String,
          telefono:String
      }
  ]  
});

pedidosSchema.pre('save', function(next){
    const url = slug(this.nombre);
    this.url = `${url}-${shortid.generate()}`;
    next();
});

module.exports = mongoose.model('pedidos', pedidosSchema);
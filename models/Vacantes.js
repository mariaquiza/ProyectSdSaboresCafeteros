const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slug');
const shortid = require('shortid');

const vacantesSchema = new mongoose.Schema({
  nombre:{
      type:String,
      required: 'El nombre de la Persona es obligatorio',
      trim:true,
      lowercase:true
  },
  motivo:{
      type: String,
      trim:true
  },
  fecha:{
      type: String,
      trim: true,
      required: 'La fecha es Obligatoria'
  },
  cantidad:{
      type: String,
      default:0,
      trim:true
  },
  zona:{
      type: String,
      trim:true
  },
  descripcion:{
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

vacantesSchema.pre('save', function(next){
    const url = slug(this.nombre);
    this.url = `${url}-${shortid.generate()}`;
    next();
});

module.exports = mongoose.model('Vacante', vacantesSchema);
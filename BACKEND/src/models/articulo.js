const mongoose = require('mongoose')
const validator = require('validator')

const articuloSchema = new mongoose.Schema({
  name: {
    type: String,
    default: true,
    unique: true
  },
  description: {
    type: String,
    required: false
  },
  type: {
    type: String,
    required: false,
    emum: ["acrilico", "carta", "foil", "marbled"]
  },
  stock: {
    type: Number,
    required: true,
    validate(value) {
      if(value < 0) {
        throw new Error('El stock debe ser mayor a 0')
      }
    }
  },
  price: {
    type: Number,
    required: true,
    validate(value) {
      if(value < 0) {
        throw new Error('El precio debe ser mayor que 0')
      }
    }
  }
})

const Articulo = mongoose.model('Articulo', articuloSchema)

module.exports = Articulo

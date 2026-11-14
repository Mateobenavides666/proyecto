const mongoose = require('mongoose');

const mensajeSchema = new mongoose.Schema({
  emisor:   { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  receptor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  servicio: { type: mongoose.Schema.Types.ObjectId, ref: 'Servicio' },
  texto:    { type: String, required: true, trim: true, maxlength: 1000 },
  leido:    { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Mensaje', mensajeSchema);
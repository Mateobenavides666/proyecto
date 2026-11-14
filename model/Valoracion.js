const mongoose = require('mongoose');

const valoracionSchema = new mongoose.Schema({
  autor:      { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  servicio:   { type: mongoose.Schema.Types.ObjectId, ref: 'Servicio', required: true },
  puntaje:    { type: Number, required: true, min: 1, max: 5 },
  comentario: { type: String, default: '', maxlength: 500 }
}, { timestamps: true });

// Una valoración por usuario y servicio
valoracionSchema.index({ autor: 1, servicio: 1 }, { unique: true });

module.exports = mongoose.model('Valoracion', valoracionSchema);
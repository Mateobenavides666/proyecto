const mongoose = require('mongoose');

const CATEGORIAS = ['cocina', 'tutorias', 'diseno', 'costura', 'tecnologia', 'cuidado', 'oficios', 'otros'];

const servicioSchema = new mongoose.Schema({
  usuario:     { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  titulo:      { type: String, required: true, trim: true, maxlength: 100 },
  descripcion: { type: String, required: true, maxlength: 1000 },
  categoria:   { type: String, enum: CATEGORIAS, required: true },
  modalidad:   { type: String, enum: ['presencial', 'virtual', 'ambas'], default: 'presencial' },
  precio:      { type: String, default: 'A convenir' },
  estado:      { type: String, enum: ['activo', 'pausado'], default: 'activo' }
}, { timestamps: true });

module.exports = mongoose.model('Servicio', servicioSchema);
module.exports.CATEGORIAS = CATEGORIAS;
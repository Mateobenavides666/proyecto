const mongoose = require('mongoose');

const perfilSchema = new mongoose.Schema({
  usuario:     { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true, unique: true },
  foto:        { type: String, default: '' },
  biografia:   { type: String, default: '', maxlength: 500 },
  ubicacion:   { type: String, default: '' },
  habilidades: { type: [String], default: [] },
  grupo:       { type: String, enum: ['mujer', 'joven', 'ambos', ''], default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Perfil', perfilSchema);

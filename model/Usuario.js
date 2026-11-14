const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre:   { type: String, required: true, trim: true },
  correo:   { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  rol:      { type: String, enum: ['usuario', 'admin'], default: 'usuario' },
  estado:   { type: String, enum: ['activo', 'suspendido'], default: 'activo' }
}, { timestamps: true });

module.exports = mongoose.model('Usuario', usuarioSchema);

const Usuario = require('../model/Usuario');
const Servicio = require('../model/Servicio');
const Valoracion = require('../model/Valoracion');

exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select('-password').sort({ createdAt: -1 });
    res.json(usuarios);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.cambiarEstado = async (req, res) => {
  try {
    const { estado } = req.body;
    if (!['activo', 'suspendido'].includes(estado)) {
      return res.status(400).json({ error: 'Estado inválido' });
    }
    if (req.params.id === req.usuario.id) {
      return res.status(400).json({ error: 'No puedes suspender tu propia cuenta' });
    }
    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id, { estado }, { new: true }
    ).select('-password');
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (e) {
    res.status(400).json({ error: 'ID inválido' });
  }
};

exports.listarServicios = async (req, res) => {
  try {
    const servicios = await Servicio.find()
      .populate('usuario', 'nombre correo')
      .sort({ createdAt: -1 });
    res.json(servicios);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.eliminarServicio = async (req, res) => {
  try {
    const servicio = await Servicio.findByIdAndDelete(req.params.id);
    if (!servicio) return res.status(404).json({ error: 'Servicio no encontrado' });
    await Valoracion.deleteMany({ servicio: servicio._id });
    res.json({ mensaje: 'Servicio eliminado por moderación' });
  } catch (e) {
    res.status(400).json({ error: 'ID inválido' });
  }
};

exports.eliminarValoracion = async (req, res) => {
  try {
    const v = await Valoracion.findByIdAndDelete(req.params.id);
    if (!v) return res.status(404).json({ error: 'Valoración no encontrada' });
    res.json({ mensaje: 'Valoración eliminada por moderación' });
  } catch (e) {
    res.status(400).json({ error: 'ID inválido' });
  }
};
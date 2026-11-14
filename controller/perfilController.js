const Perfil = require('../model/Perfil');

const CAMPOS = ['foto', 'biografia', 'ubicacion', 'habilidades', 'grupo'];

const filtrar = (body) =>
  CAMPOS.reduce((o, c) => (body[c] !== undefined ? { ...o, [c]: body[c] } : o), {});

exports.crear = async (req, res) => {
  try {
    if (await Perfil.findOne({ usuario: req.usuario.id })) {
      return res.status(400).json({ error: 'Ya tienes un perfil, usa PUT para editarlo' });
    }
    const perfil = await Perfil.create({ ...filtrar(req.body), usuario: req.usuario.id });
    res.status(201).json(perfil);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.miPerfil = async (req, res) => {
  try {
    const perfil = await Perfil.findOne({ usuario: req.usuario.id }).populate('usuario', 'nombre correo');
    if (!perfil) return res.status(404).json({ error: 'Aún no has creado tu perfil' });
    res.json(perfil);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.obtener = async (req, res) => {
  try {
    const perfil = await Perfil.findById(req.params.id).populate('usuario', 'nombre');
    if (!perfil) return res.status(404).json({ error: 'Perfil no encontrado' });
    res.json(perfil);
  } catch (e) {
    res.status(400).json({ error: 'ID inválido' });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const perfil = await Perfil.findOneAndUpdate(
      { usuario: req.usuario.id },
      filtrar(req.body),
      { new: true, runValidators: true }
    );
    if (!perfil) return res.status(404).json({ error: 'Primero crea tu perfil' });
    res.json(perfil);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
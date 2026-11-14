const Mensaje = require('../model/Mensaje');
const Usuario = require('../model/Usuario');

exports.enviar = async (req, res) => {
  try {
    const { receptor, servicio, texto } = req.body;
    if (receptor === req.usuario.id) {
      return res.status(400).json({ error: 'No puedes escribirte a ti mismo' });
    }
    if (!(await Usuario.findById(receptor))) {
      return res.status(404).json({ error: 'Destinatario no encontrado' });
    }
    const mensaje = await Mensaje.create({
      emisor: req.usuario.id, receptor, servicio, texto
    });
    res.status(201).json(mensaje);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.recibidos = async (req, res) => {
  try {
    const mensajes = await Mensaje.find({ receptor: req.usuario.id })
      .populate('emisor', 'nombre')
      .populate('servicio', 'titulo')
      .sort({ createdAt: -1 });
    res.json(mensajes);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.enviados = async (req, res) => {
  try {
    const mensajes = await Mensaje.find({ emisor: req.usuario.id })
      .populate('receptor', 'nombre')
      .populate('servicio', 'titulo')
      .sort({ createdAt: -1 });
    res.json(mensajes);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.marcarLeido = async (req, res) => {
  try {
    const mensaje = await Mensaje.findOneAndUpdate(
      { _id: req.params.id, receptor: req.usuario.id },
      { leido: true },
      { new: true }
    );
    if (!mensaje) return res.status(404).json({ error: 'Mensaje no encontrado' });
    res.json(mensaje);
  } catch (e) {
    res.status(400).json({ error: 'ID inválido' });
  }
};
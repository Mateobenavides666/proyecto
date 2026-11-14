const mongoose = require('mongoose');
const Valoracion = require('../model/Valoracion');
const Servicio = require('../model/Servicio');

exports.crear = async (req, res) => {
  try {
    const { servicio, puntaje, comentario } = req.body;
    const s = await Servicio.findById(servicio);
    if (!s) return res.status(404).json({ error: 'Servicio no encontrado' });
    if (String(s.usuario) === req.usuario.id) {
      return res.status(400).json({ error: 'No puedes valorar tu propio servicio' });
    }
    const v = await Valoracion.create({
      autor: req.usuario.id, servicio, puntaje, comentario
    });
    res.status(201).json(v);
  } catch (e) {
    if (e.code === 11000) {
      return res.status(400).json({ error: 'Ya valoraste este servicio' });
    }
    res.status(400).json({ error: e.message });
  }
};

exports.porServicio = async (req, res) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const valoraciones = await Valoracion.find({ servicio: id })
      .populate('autor', 'nombre')
      .sort({ createdAt: -1 });
    const stats = await Valoracion.aggregate([
      { $match: { servicio: id } },
      { $group: { _id: null, promedio: { $avg: '$puntaje' }, total: { $sum: 1 } } }
    ]);
    res.json({
      promedio: stats[0] ? Number(stats[0].promedio.toFixed(1)) : 0,
      total: stats[0] ? stats[0].total : 0,
      valoraciones
    });
  } catch (e) {
    res.status(400).json({ error: 'ID inválido' });
  }
};
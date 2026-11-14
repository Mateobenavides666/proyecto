const Servicio = require('../model/Servicio');

const CAMPOS = ['titulo', 'descripcion', 'categoria', 'modalidad', 'precio', 'estado'];

const filtrar = (body) =>
  CAMPOS.reduce((o, c) => (body[c] !== undefined ? { ...o, [c]: body[c] } : o), {});

// Devuelve un mensaje de error si el precio trae números y todos suman 0 ("0", "$0", "00")
const errorPrecio = (precio) => {
  if (precio === undefined || precio === null) return null;
  const digitos = String(precio).replace(/\D/g, '');
  if (digitos !== '' && Number(digitos) <= 0) return 'El precio debe ser mayor que 0';
  return null;
};

exports.crear = async (req, res) => {
  try {
    const errPrecio = errorPrecio(req.body.precio);
    if (errPrecio) return res.status(400).json({ error: errPrecio });
    const servicio = await Servicio.create({ ...filtrar(req.body), usuario: req.usuario.id });
    res.status(201).json(servicio);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.listar = async (req, res) => {
  try {
    const filtro = { estado: 'activo' };
    if (req.query.categoria) filtro.categoria = req.query.categoria;
    if (req.query.q) filtro.titulo = { $regex: req.query.q, $options: 'i' };
    const servicios = await Servicio.find(filtro)
      .populate('usuario', 'nombre')
      .sort({ createdAt: -1 });
    res.json(servicios);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.misServicios = async (req, res) => {
  try {
    res.json(await Servicio.find({ usuario: req.usuario.id }).sort({ createdAt: -1 }));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.obtener = async (req, res) => {
  try {
    const servicio = await Servicio.findById(req.params.id).populate('usuario', 'nombre');
    if (!servicio) return res.status(404).json({ error: 'Servicio no encontrado' });
    res.json(servicio);
  } catch (e) {
    res.status(400).json({ error: 'ID inválido' });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const errPrecio = errorPrecio(req.body.precio);
    if (errPrecio) return res.status(400).json({ error: errPrecio });
    const servicio = await Servicio.findOneAndUpdate(
      { _id: req.params.id, usuario: req.usuario.id },
      filtrar(req.body),
      { new: true, runValidators: true }
    );
    if (!servicio) return res.status(404).json({ error: 'Servicio no encontrado o no es tuyo' });
    res.json(servicio);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.eliminar = async (req, res) => {
  try {
    const servicio = await Servicio.findOneAndDelete({ _id: req.params.id, usuario: req.usuario.id });
    if (!servicio) return res.status(404).json({ error: 'Servicio no encontrado o no es tuyo' });
    res.json({ mensaje: 'Servicio eliminado' });
  } catch (e) {
    res.status(400).json({ error: 'ID inválido' });
  }
};
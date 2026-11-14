const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../model/Usuario');

const generarToken = (u) =>
  jwt.sign({ id: u._id, rol: u.rol }, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.registro = async (req, res) => {
  try {
    const { nombre, correo, password } = req.body;
    if (await Usuario.findOne({ correo })) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }
    const hash = await bcrypt.hash(password, 10);
    const usuario = await Usuario.create({ nombre, correo, password: hash });
    res.status(201).json({
      token: generarToken(usuario),
      usuario: { id: usuario._id, nombre: usuario.nombre, correo: usuario.correo, rol: usuario.rol }
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { correo, password } = req.body;
    const usuario = await Usuario.findOne({ correo });
    if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    if (usuario.estado === 'suspendido') {
      return res.status(403).json({ error: 'Cuenta suspendida' });
    }
    res.json({
      token: generarToken(usuario),
      usuario: { id: usuario._id, nombre: usuario.nombre, correo: usuario.correo, rol: usuario.rol }
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

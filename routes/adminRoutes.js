const router = require('express').Router();
const { verificarToken, soloAdmin } = require('../middleware/auth');
const c = require('../controller/adminController');

router.use(verificarToken, soloAdmin);

router.get('/usuarios', c.listarUsuarios);
router.patch('/usuarios/:id', c.cambiarEstado);
router.get('/servicios', c.listarServicios);
router.delete('/servicios/:id', c.eliminarServicio);
router.delete('/valoraciones/:id', c.eliminarValoracion);

module.exports = router;
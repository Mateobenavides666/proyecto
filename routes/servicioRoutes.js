const router = require('express').Router();
const { verificarToken } = require('../middleware/auth');
const c = require('../controller/servicioController');

router.get('/', c.listar);
router.get('/mios', verificarToken, c.misServicios);
router.get('/:id', c.obtener);
router.post('/', verificarToken, c.crear);
router.put('/:id', verificarToken, c.actualizar);
router.delete('/:id', verificarToken, c.eliminar);

module.exports = router;
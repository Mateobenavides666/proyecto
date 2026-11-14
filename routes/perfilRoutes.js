const router = require('express').Router();
const { verificarToken } = require('../middleware/auth');
const c = require('../controller/perfilController');

router.post('/', verificarToken, c.crear);
router.get('/me', verificarToken, c.miPerfil);
router.put('/me', verificarToken, c.actualizar);
router.get('/:id', c.obtener);

module.exports = router;

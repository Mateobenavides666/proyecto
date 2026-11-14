const router = require('express').Router();
const { verificarToken } = require('../middleware/auth');
const c = require('../controller/mensajeController');

router.post('/', verificarToken, c.enviar);
router.get('/recibidos', verificarToken, c.recibidos);
router.get('/enviados', verificarToken, c.enviados);
router.patch('/:id/leido', verificarToken, c.marcarLeido);

module.exports = router;
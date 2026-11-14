const router = require('express').Router();
const { verificarToken } = require('../middleware/auth');
const c = require('../controller/valoracionController');

router.post('/', verificarToken, c.crear);
router.get('/servicio/:id', c.porServicio);

module.exports = router;
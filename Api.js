require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ mensaje: 'API Banco de Habilidades funcionando' }));
app.use('/auth', require('./routes/authRoutes'));
app.use('/perfiles', require('./routes/perfilRoutes'));
app.use('/servicios', require('./routes/servicioRoutes'));

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conectado a MongoDB Atlas');
    app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
  })
  .catch(err => {
    console.error('Error de conexión:', err.message);
    process.exit(1);
  });

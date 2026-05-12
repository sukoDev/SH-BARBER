const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: "API de SH-BARBER está funcionando"
    });
});

app.use('/api', apiRoutes);

module.exports = app;


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const districtsRouter = require('./routes/districtsRouter');
const datesRouter = require('./routes/datesRouter');
const climatesRouter = require('./routes/climatesRouter');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());

app.use(express.json());

app.use('/districts', districtsRouter);

app.use('/dates', datesRouter);

app.use('/climates', climatesRouter);

app.listen(PORT, () => { console.log(`Ouvindo a porta ${PORT}`); });

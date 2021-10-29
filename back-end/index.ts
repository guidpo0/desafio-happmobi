require('dotenv').config();
const express = require('express');
const cors = require('cors');
const carsRouter = require('./routes/carsRouter.ts');
const rentsRouter = require('./routes/rentsRouter.ts');
const usersRouter = require('./routes/usersRouter.ts');

const PORT: string = process.env.PORT || '3001';
const app = express();

app.use(cors());

app.use(express.json());

app.use('/cars', carsRouter);

app.use('/rents', rentsRouter);

app.use('/users', usersRouter);

app.listen(PORT, () => { console.log(`Ouvindo a porta ${PORT}`); });

import dotenv from 'dotenv';
import express from 'express';
import examRouter from './examLab/routes.js';
import labRouter from './laboratory/routes.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/exam', examRouter);
app.use('/lab', labRouter);

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({ error: err.message});
});

app.listen(3000, () => console.log('Server is running!'));
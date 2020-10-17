import './database/dBconnection';
import 'express-async-errors';

import cors from 'cors';
import express from 'express';
import path from 'path';

import { errorHandler } from './errors/handler';
import { Routes } from './routes';

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

app.all('https://happy-srv.herokuapp.com', (req, resp, next) => {
  const origin = req.get('origin');
  resp.header('Access-Control-Allow-Origin', origin);
  resp.header('Access-Control-Allow-Headers', 'X-Requested-With');
  resp.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.json());
app.use(Routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(errorHandler);
app.listen(port);

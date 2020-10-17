import './database/dBconnection';
import 'express-async-errors';

import cors from 'cors';
import express from 'express';
import path from 'path';

import { errorHandler } from './errors/handler';
import { Routes } from './routes';

const app = express();
const port = process.env.PORT || 8080;

app.use(cors({ origin: 'https://happy-srv.herokuapp.com/' }));

app.use(express.json());
app.use(Routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(errorHandler);
app.listen(port);

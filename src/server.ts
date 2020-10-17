import express from 'express';
import path from 'path';
import 'express-async-errors';
import cors from 'cors';

import { errorHandler } from './errors/handler';
import { Routes } from './routes.ts';
import './database/dBconnection.ts';

const app = express();

app.use(cors());
app.use(express.json());
app.use(Routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(errorHandler);
app.listen(3333);

/*
Databases no back-end
  Driver nativo
  Query Builder
  ORM

- Driver native
  sqlite3.query('SELECT * FROM users')
- Query Builder
  knex('users').select('*').where('name')
- ORM
  Converte instâncias de uma classe em objeto de relacionamento
*/

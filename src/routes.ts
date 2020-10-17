import { Router } from 'express';
import multer from 'multer';

import OrphanagesController from './controllers/orphanagesController.ts';
import uploadConfig from './config/uploadImages.ts';

const upload = multer(uploadConfig);

const Routes = Router();

Routes.get('/orphanages', OrphanagesController.index);
Routes.get('/orphanages/:id', OrphanagesController.show);
Routes.post('/orphanages', upload.array('images'), OrphanagesController.create);

export { Routes };

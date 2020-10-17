import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import { Orphanages } from '../models/Orphanages';
import OrphanageView from '../views/orphanages_view';

export default {

  async index(req: Request, resp: Response) {
    try {
      const orphanagesRespository = getRepository(Orphanages);

      const orphanages = await orphanagesRespository.find({
        relations: ['images'],
      });

      if (!orphanages) {
        return resp.status(500).json({ message: 'It was not possible to find registered orphanages' });
      }

      return resp.status(200).json(OrphanageView.renderMany(orphanages));
    } catch (error) {
      return resp.status(500).json({ message: 'Error fetching data' });
    }
  },

  async show(req: Request, resp: Response) {
    try {
      const { id } = req.params;

      const orphanagesRespository = getRepository(Orphanages);

      const orphanage = await orphanagesRespository.findOneOrFail(id, {
        relations: ['images'],
      });

      if (!orphanage) {
        return resp.status(501).json({ message: 'It was not possible to find registered orphanages' });
      }

      return resp.status(200).json(OrphanageView.render(orphanage));
    } catch (error) {
      return resp.status(500).json({ message: 'Error fetching data' });
    }
  },

  async create(req: Request, resp: Response) {
    const requestImages = req.files as Express.Multer.File[];
    const images = requestImages.map((image) => ({ path: image.filename }));

    const {
      name, latitude, longitude, about, instructions, open_on_wekends, opening_hours,
    } = req.body;

    const orphanagesRespository = getRepository(Orphanages);

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      open_on_wekends: open_on_wekends === 'true',
      opening_hours,
      images,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      open_on_wekends: Yup.boolean().required(),
      opening_hours: Yup.string().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        }),
      ),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const orphanage = orphanagesRespository.create(data);

    if (!orphanage) {
      return resp.status(400).json({ message: 'It was not possible to register the orphanage' });
    }

    await orphanagesRespository.save(orphanage);

    return resp.status(201).json(orphanage);
  },
};

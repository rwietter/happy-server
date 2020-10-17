import { Orphanages } from '../models/Orphanages';
import ImagesView from './images_view';

export default {
  render(orphanage: Orphanages) {
    const {
      id,
      name,
      latitude,
      longitude,
      about,
      instructions,
      open_on_wekends,
      opening_hours,
      images,
    } = orphanage;

    return {
      id,
      name,
      latitude,
      longitude,
      about,
      instructions,
      open_on_wekends,
      opening_hours,
      images: ImagesView.renderMany(images),
    };
  },

  renderMany(orphanages: Orphanages[]) {
    const manyOrphanages = (orphanage) => this.render(orphanage);
    return orphanages.map(manyOrphanages);
  },
};

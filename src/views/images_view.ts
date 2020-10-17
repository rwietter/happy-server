import { Images } from '../models/Images';
import { Orphanages } from '../models/Orphanages';

export default {
  render(image: Images) {
    return {
      id: image.id,
      url: `http://localhost:3333/uploads/${image.path}`,
    };
  },

  renderMany(images: Images[]) {
    const manyImages = (image) => this.render(image);
    return images.map(manyImages);
  },
};

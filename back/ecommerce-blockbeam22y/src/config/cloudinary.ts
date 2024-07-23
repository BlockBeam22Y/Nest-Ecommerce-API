import { v2 as cloudinary } from 'cloudinary';
import { cloud } from './envs';

export const CloudinaryConfig = {
  provide: 'cloudinary',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: cloud.cloud_name,
      api_key: cloud.api_key,
      api_secret: cloud.api_secret,
    });
  },
};

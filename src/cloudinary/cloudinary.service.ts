import { Injectable } from '@nestjs/common';
import { ImageTransformationOptions, v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  async uploadImage(file: Express.Multer.File) {
    // console.log('cloudinary', file);
    return await cloudinary.uploader.upload(file.path);
  }

  async removeImage(publicId: string) {
    return await cloudinary.uploader.destroy(publicId);
  }

  getUrl(publicId: string, options?: ImageTransformationOptions) {
    return cloudinary.url(publicId, {
      secure: true,
      ...options,
    });
  }
}

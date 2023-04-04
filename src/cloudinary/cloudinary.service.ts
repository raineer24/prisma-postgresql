import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  async uploadImage(file: Express.Multer.File) {
    // console.log('cloudinary', file);
    return await cloudinary.uploader.upload(file.path);
  }

  async removeImage(publicId: string) {
    return await cloudinary.uploader.destroy(publicId);
  }
}

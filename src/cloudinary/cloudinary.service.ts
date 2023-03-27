import { Global, Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
// import {cloudinary  } from "cloudinary/lib/v2";
// const cloudinary = require('cloudinary').v2;
import cloudinary, { v2 } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
  async uploadFile(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    // cloudinary.config({
    //     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    //     api_key: process.env.CLOUDINARY_API_KEY,
    //     api_secret: process.env.CLOUDINARY_API_SECRET,
    // })
    v2.config({
      cloud_name: 'dwsbpkgvr',
      api_key: '246382268158277',
      api_secret: 'OEJwFk8xMOuNID7Z7L5MNDJ9nY8',
    });
    const config = v2.uploader.upload(file.path, {
      folder: 'sajha-book',
      use_filename: true,
      unique_filename: false,
    });
    return config;
  }
}

import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UploadedFile,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

import { AuthDto, UpdatedProfileDto, CreateUserDto } from '../dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { SharesService } from '../shares/shares.service';

import * as fsExtra from 'fs-extra';
import { ITokenPayload, ITokens, IUser } from '../interfaces';
import {
  IImageUploadResponse,
  IMessageResponse,
} from '../../features/interfaces';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly sharedService: SharesService,
  ) {}

  /****************************
   * Sign In
   */
  async signin() {
    return;
  }

  /****************************
   * Get Profile
   */
  async getProfileById() {
    return;
  }

  /****************************
   * Sign Out
   */
  async logout() {
    return;
  }

  /****************************
   * Upload profile photo
   */
  async setProfile(file: Express.Multer.File, userId: number) {
    let uploadedResult: IImageUploadResponse;
    const curUser = await this.prismaService.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!curUser) {
      // Remove image from the temporary path
      // Remove image from the temporary path
      await fsExtra.remove(file.path);
      throw new BadRequestException(`User not found`);
    }

    // Make sure user is attach a file
    if (file) {
      if (curUser?.image_id || curUser?.image_url) {
        await this.cloudinaryService.removeImage(curUser.image_id);
      }
      uploadedResult = await this.cloudinaryService.uploadImage(file);

      // Remove image from the temporary path
      await fsExtra.remove(file.path);
    }

    const newUser: IUser = await this.prismaService.user.update({
      where: { id: userId },
      data: {
        image_id: uploadedResult?.public_id
          ? uploadedResult.public_id
          : curUser.image_id,
        image_url: uploadedResult?.secure_url
          ? uploadedResult.secure_url
          : curUser.image_url,
      },
    });

    if (!newUser) throw new BadRequestException('User not found');

    return newUser;
  }
}

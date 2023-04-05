import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
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

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly sharedService: SharesService,
  ) {}

  /****************************
   * Sign Up
   */

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
   * Update Profile
   */
  async updateProfile() {
    return;
  }
}

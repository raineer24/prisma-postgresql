import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UploadedFile,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Paginate } from '../../users/paginate/paginate';
import { AuthDto, UpdatedProfileDto, CreateUserDto } from '../dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';
import { SharesService } from '../shares/shares.service';

import * as fsExtra from 'fs-extra';
import { ITokenPayload, ITokens, IUser } from '../interfaces';
import {
  IImageUploadResponse,
  IMessageResponse,
} from '../../features/interfaces';
import { UserResponse } from '../../users/models/user.response';
import { UpdateUserRequest } from '../../users/models/request/update-user-request.model';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly sharedService: SharesService,
    private paginate: Paginate,
  ) {}

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

  async getUsers() {
    return await this.prismaService.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        username: true,
        role: true,
        image_url: true,
      },
    });
  }

  async findAll(page: number, size: number, search: string) {
    const { results, totalItems } = await this.paginate.pages(
      page,
      size,
      search,
    );
    const totalPages = Math.ceil(totalItems / size) - 1;
    const currentPage = Number(page);
    return {
      results,
      pagination: {
        length: totalItems,
        size: size,
        lastPage: totalPages,
        page: currentPage,
        startIndex: currentPage * size,
        endIndex: currentPage * size + (size - 1),
      },
    };
  }

  public async getUserEntityById(id: number): Promise<UserResponse> {
    const user = await this.prismaService.user.findUnique({
      where: { id: id },
    });
    return UserResponse.fromUserEntity(user);
  }

  async updateUser(
    userId: number,
    updateRequest: UpdateUserRequest,
  ): Promise<UserResponse> {
    try {
      const updatedUser = await this.prismaService.user.update({
        where: { id: userId },
        data: {
          ...updateRequest,
        },
      });
      return UserResponse.fromUserEntity(updatedUser);
    } catch (err) {
      Logger.error(JSON.stringify(err));
      throw new ConflictException();
    }
  }

  async updateRoleOfUser(
    userId: number,
    updateRequest: UpdateUserRequest,
  ): Promise<UserResponse> {
    try {
      const updatedRole = await this.prismaService.user.update({
        data: { ...updateRequest },
        where: {
          id: userId,
        },
      });

      return UserResponse.fromUserEntity(updatedRole);
    } catch (err) {
      Logger.error(JSON.stringify(err));
      throw new ConflictException();
    }
  }
}

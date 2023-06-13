import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  Logger,
  ConflictException,
  UploadedFile,
  HttpException,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { AuthUser } from '../auth/auth-user';
import { Usr } from './user.decorator';
import { IUser, UserResponse } from './models/user.response';
import { UpdateUserRequest } from './models/request/update-user-request.model';
import { Paginate } from './paginate/paginate';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { IImageUploadResponse } from '../features/interfaces/my-global-types.interface';
import { UserType } from '@prisma/client';
@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private paginate: Paginate,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  /****************************
   * Update Profile
   */
  async updatedProfile(
    userId: number,
    body: UpdateUserRequest,
    file: Express.Multer.File,
  ): Promise<IUser> {
    const curUser = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    return;
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

  // async updateRoleOfUser(
  //   userId: number,
  //   updateRequest: UpdateUserRequest,
  // ): Promise<UserResponse> {
  //   try {
  //     const updatedRole = await this.prisma.user.update({
  //       data: { ...updateRequest },
  //       where: {
  //         id: userId,
  //       },
  //     });

  //     return UserResponse.fromUserEntity(updatedRole);
  //   } catch (err) {
  //     Logger.error(JSON.stringify(err));
  //     throw new ConflictException();
  //   }
  // }
}

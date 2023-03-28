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
import { PrismaService } from '../prisma.service';
import { AuthUser } from '../auth/auth-user';
import { Usr } from './user.decorator';
import { UserResponse } from './models/user.response';
import { UpdateUserRequest } from './models/request/update-user-request.model';
import { Paginate } from './paginate/paginate';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private paginate: Paginate,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async setProfile(@UploadedFile() file: Express.Multer.File, userId: number) {
    if (!file) {
      throw new HttpException('Image is required', 400);
    }

    const profileImage = await this.cloudinaryService.uploadFile(file);
    console.log('profileimage', profileImage);
    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        image: profileImage.url,
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

  async updateRoleOfUser(
    userId: number,
    updateRequest: UpdateUserRequest,
  ): Promise<UserResponse> {
    try {
      const updatedRole = await this.prisma.user.update({
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

  async updateUser(
    userId: number,
    updateRequest: UpdateUserRequest,
  ): Promise<UserResponse> {
    try {
      const updatedUser = await this.prisma.user.update({
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

  public async getUserEntityById(id: number): Promise<UserResponse> {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });
    return UserResponse.fromUserEntity(user);
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });
    return user;
  }

  async getUsers() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        username: true,
      },
    });
  }
}

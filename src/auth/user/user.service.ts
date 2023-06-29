import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UploadedFile,
  Logger,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { PostI } from '../../blog/models/post';
import { User } from '../models/user';
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
import { User as UserII } from '@prisma/client';
import { AuthUser } from '../auth-user';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly sharedService: SharesService,
    private paginate: Paginate,
  ) {}

  public errorMessage() {
    return new HttpException(
      'There is a problem. Please try to login again later.',
      HttpStatus.NOT_FOUND,
    );
  }

  update(id: number, user: AuthUser): Promise<AuthUser> {
    const data = {
      firstName: user.firstName,
      lastName: user.lastName,
    };

    return this.prismaService.user.update({ where: { id }, data });
  }

  /****************************
   * Upload profile photo
   */
  async setProfile(file: Express.Multer.File, userId: number) {
    let uploadedResult: IImageUploadResponse;
    const curUser = await this.prismaService.user.findUnique({
      where: { id: userId },
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

  //   return this.userService.updateOne(user.id, {profileImage: file.filename}).pipe(
  //     tap((user: User) => console.log(user)),
  //     map((user:User) => ({profileImage: user.profileImage}))
  // )

    if (!newUser) throw new BadRequestException('User not found');
    console.log('setprofile newUser', newUser);
    return newUser.image_url;
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
        Post: {
          select: {
            id: true,
            title: true,
            content: true,
            authorId: true,
          },
        },
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

  public async getUser(id: number): Promise<User | HttpException> {
    const user: User = await this.prismaService.user.findUnique({
      where: { id },
      include: { Post: true },
    });
    if (user) {
      return user;
    } else {
      throw this.errorMessage();
    }
  }

  // public async getUserEntityById(id: number): Promise<UserResponse> {
  //   const user = await this.prismaService.user.findUnique({
  //     where: { id: id },
  //     include: {
  //       Post: true,
  //     },
  //   });
  //   console.log('user', user);
  //   //return UserResponse.fromUserEntity(user);
  // }

  async updateUser(
    userId: number,
    updateRequest: UpdateUserRequest,
  ): Promise<UserResponse> {
    console.log('update!');
    console.log('updaterequest', updateRequest);
    try {
      const updatedUser = await this.prismaService.user.update({
        where: { id: userId },
        data: {
          ...updateRequest,
        },
      });
      console.log('updateUser', updatedUser);
      return updatedUser;
    } catch (err) {
      console.log('err', err);
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

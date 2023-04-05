import {
  BadRequestException,
  ForbiddenException,
  Get,
  Injectable,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { SignupRequest, LoginRequest } from './models/';
import { JwtPayload } from './jwt-payload';
import { AuthUser } from './auth-user';
import { UserRole } from '../core/entities/user.entity';
import { Tokens } from './types/tokens.types';
import { UserType } from '@prisma/client';
import { SharesService } from './shares/shares.service';
import { ITokenPayload, ITokens } from './interfaces';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private readonly sharedService: SharesService,
  ) {}

  /****************************
   * Sign In
   */
  async signin(signinDto: LoginRequest): Promise<ITokenPayload & ITokens> {
    const userData = await this.prisma.user.findUnique({
      where: {
        email: signinDto.email,
      },
    });

    if (!userData) {
      throw new ForbiddenException('There is no user with this email');
    }

    const passwordMatches = await bcrypt.compare(
      signinDto.password,
      userData.hashedPassword,
    );

    console.log('passwordm', userData);
    if (!passwordMatches) {
      throw new ForbiddenException('Incorrect password');
    }

    const tokens = await this.getTokens(userData.id, userData.email);
    //await this.updateRtHash(userData.id, tokens.access_token);

    delete userData.hashedPassword;

    return {
      userData,
      ...tokens,
    };
  }

  async getTokens(userId: number, email: string): Promise<Tokens> {
    const payload: JwtPayload = {
      id: userId,
      email: email,
    };
    const access_token = await this.jwt.signAsync(payload);
    console.log('access_token', access_token);
    return {
      access_token,
    };
  }

  async updateRtHash(userId: number, access_token: string): Promise<void> {
    const hashedRt = await bcrypt.hash(access_token, 10);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedPassword: hashedRt,
      },
    });
  }

  /****************************
   * Sign Up
   */
  async register(signupRequest: SignupRequest) {
    const foundUser = await this.prisma.user.findUnique({
      where: { email: signupRequest.email },
    });
    console.log('foundUser', foundUser);

    if (foundUser) {
      throw new BadRequestException('Email already exists');
    }
    const user = await this.prisma.user.create({
      data: {
        email: signupRequest.email.toLowerCase(),
        hashedPassword: await bcrypt.hash(signupRequest.password, 10),
        firstName: signupRequest.firstName,
        lastName: signupRequest.lastName,
        username: signupRequest.username,
        role: UserType.USER,
      },
    });

    const payload: ITokenPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const { access_token, refresh_token } = await this.sharedService.getTokens(
      user.id,
      signupRequest.email,
    );
    await this.sharedService.updateRefreshToken(user.id, refresh_token);

    console.log('user', user);
    delete user.hashedPassword;

    //return res.send({ user });

    return {
      ...user,
      access_token,
      refresh_token,
    };
  }

  async validateUser(payload: JwtPayload): Promise<AuthUser> {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.id },
    });

    if (user !== null && user.email === payload.email) {
      return user;
    }
    throw new UnauthorizedException();
  }

  async signout(req: Request, res: Response) {
    res.clearCookie('token');

    return res.send({ message: 'Logged out successfully' });
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10;

    return await bcrypt.hash(password, saltOrRounds);
  }

  async comparePasswords(args: { hash: string; password: string }) {
    return await bcrypt.compare(args.password, args.hash);
  }

  async signToken(args: { userId: string; email: string }) {
    const payload = args;

    return this.jwt.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });
  }
}

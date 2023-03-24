import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { SignupRequest, LoginRequest } from './models/';
import { JwtPayload } from './jwt-payload';
import { AuthUser } from './auth-user';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async login(loginRequest: LoginRequest): Promise<string> {
    const normalizedIdentifier = loginRequest.identifier.toLowerCase();
    const user = await this.prisma.user.findFirst({
      where: { email: normalizedIdentifier },
      select: {
        id: true,
        hashedPassword: true,
        email: true,
      },
    });
    console.log('user', user);

    if (
      user === null ||
      !bcrypt.compareSync(loginRequest.password, user.hashedPassword)
    ) {
      throw new UnauthorizedException();
    }

    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
    };
    console.log('payload', payload);
    return this.jwt.signAsync(payload);
  }
  async register(signupRequest: SignupRequest, res: Response) {
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
      },
    });

    console.log('user', user);
    delete user.hashedPassword;

    return res.send({ user });
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

  async signup(dto: AuthDto) {
    const { email, password } = dto;

    const foundUser = await this.prisma.user.findUnique({ where: { email } });

    if (foundUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await this.hashPassword(password);

    await this.prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    });

    return { message: 'User created successfully' };
  }

  // async signin(dto: AuthDto, req: Request, res: Response) {
  //   const { email, password } = dto;

  //   const foundUser = await this.prisma.user.findUnique({ where: { email } });

  //   if (!foundUser) {
  //     throw new BadRequestException('Wrong credentials');
  //   }

  //   const compareSuccess = await this.comparePasswords({
  //     password,
  //     hash: foundUser.hashedPassword,
  //   });

  //   if (!compareSuccess) {
  //     throw new BadRequestException('Wrong credentials');
  //   }
  //   const token = await this.signToken({
  //     userId: foundUser.id,
  //     email: foundUser.email,
  //   });

  //   if (!token) {
  //     throw new ForbiddenException('Could not signin');
  //   }

  //   res.cookie('token', token, {});

  //   return res.send({ message: 'Logged in successfully' });
  // }

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

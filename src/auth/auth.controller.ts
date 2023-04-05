import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
  Request,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { SignupRequest, LoginResponse, LoginRequest } from './models';
import { AuthResponse } from './types';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}
  /********************************
   * desc      Register new member
   * route     Post /api/auth/user/signin
   * access    Public
   */
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() signupRequest: SignupRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { sub, email, role, access_token, refresh_token } =
      await this.authService.register(signupRequest);

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') !== 'development',
      sameSite: 'strict',
    });

    return {
      user: {
        sub,
        email,
        role,
      },
      access_token,
    };
  }

  @Post('login')
  signinLocal(@Body() signinDto: LoginRequest): Promise<AuthResponse> {
    return this.authService.signinLocal(signinDto);
  }

  // @Get('signout')
  // signout(@Request() req, @Response() res) {
  //   return this.authService.signout(req, res);
  // }
}

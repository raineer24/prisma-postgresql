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
  Response,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { SignupRequest, LoginResponse, LoginRequest } from './models';
import { AuthResponse } from './types';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() signupRequest: SignupRequest,
    @Response() res,
  ): Promise<void> {
    await this.authService.register(signupRequest, res);
  }

  // @Post('login')
  // @HttpCode(HttpStatus.OK)
  // async login(@Body() loginRequest: LoginRequest): Promise<LoginResponse> {
  //   return new LoginResponse(await this.authService.login(loginRequest));
  // }

  @Post('login')
  signinLocal(@Body() signinDto: LoginRequest): Promise<AuthResponse> {
    return this.authService.signinLocal(signinDto);
  }

  @Get('signout')
  signout(@Request() req, @Response() res) {
    return this.authService.signout(req, res);
  }
}

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
import { IPageOptions, PageOptionsPipe } from '../helpers/pagination';
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

  @Get()
  paginate(@Query(new PageOptionsPipe()) options: IPageOptions) {
    return this.authService.paginate(options);
  }
  @Post('login')
  signinLocal(@Body() signinDto: LoginRequest): Promise<AuthResponse> {
    return this.authService.signinLocal(signinDto);
  }

  @Get('signout')
  signout(@Request() req, @Response() res) {
    return this.authService.signout(req, res);
  }
}

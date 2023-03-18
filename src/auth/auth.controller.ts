import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup() {
    return 'signup route'
  }

  @Post('signup')
  signup() {
    return 'signup route'
  }

  @Post('signup')
  signup() {
    return 'signup route'
  }
}

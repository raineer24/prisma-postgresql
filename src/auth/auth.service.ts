import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async signup(dto: AuthDto) {
    const { email, password } = dto;
    return { message: 'signup was successfull' };
  }

  async signin() {
    return '';
  }
}

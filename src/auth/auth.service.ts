import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async signup() {
    return { message: 'signup was successfull' };
  }

  async signin() {
    return '';
  }
}

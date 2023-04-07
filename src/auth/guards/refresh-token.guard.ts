import { AuthGuard } from '@nestjs/passport';
import { REFRESH_TOKEN } from '../utils/keys.const';

export class RefreshTokenGuard extends AuthGuard(REFRESH_TOKEN) {
  constructor() {
    super();
  }
}

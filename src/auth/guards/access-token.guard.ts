import { AuthGuard } from '@nestjs/passport';

import { ACCESS_TOKEN } from '../utils/keys.const';

export class AccessTokenGuard extends AuthGuard(ACCESS_TOKEN) {
  constructor() {
    super();
  }
}

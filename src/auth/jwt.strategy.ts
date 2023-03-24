import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
//import { jwtSecret } from 'src/utils/constants';
import { Request } from 'express';
import config from '../config';
import { JwtPayload } from './jwt-payload';
import { AuthUser } from './auth-user';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwt.secretOrKey,
    });
  }

  async validate(payload: JwtPayload): Promise<AuthUser> {
    const user = await this.authService.validateUser(payload);
    console.log('user payload', user);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

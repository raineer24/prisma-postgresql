import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PassportStrategy } from '@nestjs/passport';
import { UserType } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
// import { Request } from 'express';

import { PrismaService } from '../../prisma.service';
import { ITokenPayload, ITokenPayloadWithRole } from '../interfaces';

import { ACCESS_TOKEN } from '../utils/keys.const';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  ACCESS_TOKEN,
) {
  constructor(
    configService: ConfigService,
    private prismaService: PrismaService,
  ) {
    super({
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('ACCESS_TOKEN_KEY'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // passReqToCallback: true,
    });
  }

  async validate(payload: ITokenPayload): Promise<ITokenPayloadWithRole> {
    const { role } = await this.prismaService.user.findUnique({
      where: { id: payload.sub },
    });

    return { ...payload, role };
  }
}

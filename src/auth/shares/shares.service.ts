import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { PrismaService } from '../../prisma.service';
import { ITokenPayload, ITokens } from '../../auth/interfaces/tokens.interface';

@Injectable()
export class SharesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /*************************************************
   *  Encoding data
   */

  /*************************************************
   *  Compared data
   */

  /*************************************************
   *  Generated a access_token and refresh_token
   */

  /*************************************************
   *  Update new refresh token to user
   */
}

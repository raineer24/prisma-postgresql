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
  async hashData(data: string): Promise<string> {
    return await bcrypt.hash(data, 10);
  }
  /*************************************************
   *  Compared data
   */
  async compareData(data: string, hashData: string): Promise<boolean> {
    return await bcrypt.compare(data, hashData);
  }
  /*************************************************
   *  Generated a access_token and refresh_token
   */
  async getTokens(userId: number, email: string): Promise<ITokens> {
    const payload: ITokenPayload = {
      sub: userId,
      email,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.sign(payload, {
        secret: this.configService.get<string>('ACCESS_TOKEN_KEY'),
        expiresIn: '7d',
      }),
      this.jwtService.sign(payload, {
        secret: this.configService.get<string>('REFRESH_TOKEN_KEY'),
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token,
      refresh_token,
    };
  }
  /*************************************************
   *  Update new refresh token to user
   */
  async updateRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<void> {
    const hashToken = await this.hashData(refreshToken);

    const user = await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        refresh_token: hashToken,
      },
    });

    if (!user) {
      throw new BadRequestException('User not found(Update refresh_token)');
    }
    return;
  }
}

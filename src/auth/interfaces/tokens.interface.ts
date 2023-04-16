import { UserType } from '@prisma/client';

export interface ITokenPayload {
  sub: string;
  email: string;
  role?: string;
}

export interface ITokenPayloadWithRefreshToken extends ITokenPayload {
  refresh_token: string;
}

export interface ITokenPayloadWithRole extends ITokenPayload {
  role: UserType;
}

export interface ITokens {
  access_token: string;
  refresh_token: string;
}

import { UserType } from '@prisma/client';

export interface ITokenPayload {
  sub: number;
  email: string;
  role?: string;
}

export interface ITokenPayloadWithRole extends ITokenPayload {
  role: UserType;
}


 

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

import { ITokenPayload, ITokenPayloadWithRefreshToken } from '../interfaces';
import { REFRESH_TOKEN } from '../utils/keys.const';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy() {}
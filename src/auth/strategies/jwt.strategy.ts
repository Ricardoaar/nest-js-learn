import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../services/auth.service';
import config from '../../config';
import { ConfigType } from '@nestjs/config';
import { JwtPayload } from '../models/token.models';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private authService: AuthService, @Inject(config.KEY) configObject: ConfigType<typeof config>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configObject.jwt.secret,
    });
  }

  async validate(payload: JwtPayload): Promise<any> {
    if (payload.role !== 'admin') {
      throw new UnauthorizedException();
    }

    return payload;
  }

}
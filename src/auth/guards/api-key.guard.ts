import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { PUBLIC_KEY } from '../../common/constants/security.constants';
import { ConfigType } from '@nestjs/config';
import config from '../../config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, @Inject(config.KEY) private configService: ConfigType<typeof config>) {
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

    const httpRequests = context.switchToHttp().getRequest();
    const isPublic = this.reflector.get<boolean>(PUBLIC_KEY, context.getHandler());

    const authHeader = httpRequests.header('auth');
    const hasPermission = authHeader === this.configService.api_key;

    if (hasPermission || isPublic) {
      return true;
    }

    throw new UnauthorizedException('Unauthorized!!!!!!!');
  }
}

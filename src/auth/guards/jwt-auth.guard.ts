import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { isPublic } from '../decorators/isPublic.decorator';
import { PUBLIC_KEY } from '../../common/constants/security.constants';


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {

  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get(PUBLIC_KEY, context.getHandler());
    if (isPublic) return true;
    return super.canActivate(context);
  }
}

import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Roles } from 'src/decorators/roles.decorator';
import { IRequest } from 'src/types/request.type';
import * as messages from '../../const/messages';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) return true;

    const request: IRequest = context.switchToHttp().getRequest();
    const user = request.user;

    if (!roles.includes(user.role)) {
      throw new UnauthorizedException(messages.MISSING_ROLE);
    }
    return true;
  }
}

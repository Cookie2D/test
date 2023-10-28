import { PrismaService } from 'src/core/prisma.service';
import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { IRequest } from 'src/types/request.type';
import * as messages from '../../const/messages';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prismaService: PrismaService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) return true;
    const request: IRequest = context.switchToHttp().getRequest();

    const user = await this.prismaService.user.findUnique({
      where: { id: request.user.sub },
      include: { role: true },
    });

    if (!roles.includes(user.role.name)) {
      throw new UnauthorizedException(messages.MISSING_ROLE);
    }
    return true;
  }
}

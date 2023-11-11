import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import * as messages from '../../const/messages';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    const refreshToken = request.cookies?.[process.env.REFRESH_TOKEN];
    if (refreshToken) {
      try {
        const payload = await this.jwtService.verifyAsync(refreshToken, {
          secret: process.env.JWT_REFRESH_SECRET,
        });

        //validate refresh token
        request['user'] = payload;
        return true;
      } catch (e) {
        console.log(e);
      }
    }

    try {
      if (!token) {
        throw new UnauthorizedException(messages.MISSING_TOKEN);
      }
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });

      request['user'] = payload;
    } catch (e) {
      throw new UnauthorizedException(
        e.message || messages.SOMETHING_WENT_WRONG,
      );
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

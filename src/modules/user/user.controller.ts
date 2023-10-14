import { IRequest } from 'src/types/request.type';
import { user } from '@prisma/client';
import { UserService } from './services/user.service';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { ResponseInterceptor } from 'src/interceptors/response.interceptor';

@UseInterceptors(ResponseInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('details')
  @HttpCode(HttpStatus.OK)
  async getDetails(@Request() req: IRequest): Promise<user> {
    return await this.userService.getOne(req.user.sub);
  }
}

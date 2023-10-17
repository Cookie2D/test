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
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { Role } from 'src/const/roles';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles([Role.WAITER, Role.USER])
  @Get('details')
  @HttpCode(HttpStatus.OK)
  async getDetails(@Request() req: IRequest): Promise<user> {
    return await this.userService.getOne(req.user.sub);
  }
}

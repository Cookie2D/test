import { IRequest } from 'src/types/request.type';
import { user } from '@prisma/client';
import { UserService } from './services/user.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { Role } from 'src/const/roles';
import {
  UpdateUserDetailsDto,
  updateCurrentUserDetaisDto,
} from './dto/updateUserDetails.dto';

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

  @UseGuards(AuthGuard)
  @Patch()
  @HttpCode(HttpStatus.OK)
  updateCurrentUserDetais(
    @Body() body: updateCurrentUserDetaisDto,
    @Request() req: IRequest,
  ): Promise<user> {
    return this.userService.updateOneById(req.user.sub, body);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles([Role.ADMIN])
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  updateUserDetaisById(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDetailsDto,
  ): Promise<user> {
    return this.userService.updateOneById(id, body);
  }
}

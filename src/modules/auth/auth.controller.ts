import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { ResponseMessage } from 'src/decorators/response_message.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import * as messages from '../../const/messages';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/response.dto';
import { IRequest } from 'src/types/request.type';
import { AuthGuard } from './auth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<AuthResponseDto> {
    return this.authService.login(body, response);
  }

  @ResponseMessage(messages.USER_CREATED)
  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  register(
    @Body() body: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<AuthResponseDto> {
    return this.authService.register(body, response);
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  logout(@Req() req: IRequest) {
    this.authService.logout(req.user.sub);
  }
}

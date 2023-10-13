import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { ResponseInterceptor } from 'src/interceptors/response.interceptor';
import { ResponseMessage } from 'src/decorators/response_message.decorator';
import { CreateUserDto } from './dto/create-user.dto';

@UseInterceptors(ResponseInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  login(@Body() body: any): any {
    return this.authService.login(body);
  }

  @ResponseMessage('User has been successfully created') // move to messages consts
  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  register(@Body() body: CreateUserDto): any {
    return this.authService.register(body);
  }
}
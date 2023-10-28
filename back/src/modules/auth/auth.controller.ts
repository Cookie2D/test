import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { ResponseMessage } from 'src/decorators/response_message.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import * as messages from '../../const/messages';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  login(@Body() body: LoginDto): Promise<{ token: string }> {
    return this.authService.login(body);
  }

  @ResponseMessage(messages.USER_CREATED)
  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  register(@Body() body: CreateUserDto): Promise<{ token: string }> {
    return this.authService.register(body);
  }
}

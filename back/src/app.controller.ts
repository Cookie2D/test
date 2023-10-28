import { Controller, Get, HttpCode, HttpStatus, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseMessage } from './decorators/response_message.decorator';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import * as messages from './const/messages'

@UseInterceptors(ResponseInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ResponseMessage(messages.SUCCESS)
  getHello(): string {
    return this.appService.getHello();
  }
}

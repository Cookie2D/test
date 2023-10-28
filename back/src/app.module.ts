import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { ResponseInterceptor } from './interceptors/response.interceptor';

const ResponseProvider = {
  provide: 'APP_INTERCEPTOR',
  useClass: ResponseInterceptor,
};

@Module({
  imports: [AuthModule, UserModule, RoleModule],
  controllers: [AppController],
  providers: [AppService, ResponseProvider],
})
export class AppModule {}

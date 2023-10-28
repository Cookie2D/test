import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';
import { PrismaService } from 'src/core/prisma.service';
import { UserController } from './user.controller';

@Module({
  providers: [UserService, UserRepository, PrismaService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}

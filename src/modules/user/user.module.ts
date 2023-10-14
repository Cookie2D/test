import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';
import { PrismaService } from 'src/core/prisma.service';

@Module({
  providers: [UserService, UserRepository, PrismaService],
  exports: [UserService],
})
export class UserModule {}

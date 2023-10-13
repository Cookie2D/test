import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './repositories/auth.repository';
import { PrismaService } from 'src/core/prisma.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, PrismaService],
})
export class AuthModule {}

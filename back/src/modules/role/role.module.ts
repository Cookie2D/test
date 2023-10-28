import { Module } from '@nestjs/common';
import { RoleService } from './services/role.service';
import { RoleRepository } from './repository/role.repository';
import { PrismaService } from 'src/core/prisma.service';

@Module({
  providers: [RoleService, RoleRepository, PrismaService],
  exports: [RoleService],
})
export class RoleModule {}

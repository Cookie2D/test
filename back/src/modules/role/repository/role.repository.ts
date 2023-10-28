import { Injectable } from '@nestjs/common';
import { role } from '@prisma/client';
import { PrismaService } from 'src/core/prisma.service';

@Injectable()
export class RoleRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getRole(id: number): Promise<role> {
    return await this.prismaService.role.findUnique({ where: { id } });
  }
}
